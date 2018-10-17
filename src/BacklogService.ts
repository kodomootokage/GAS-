import UiInstance = GoogleAppsScript.UI.UiInstance
import {iBacklogClient, BacklogClientImpl, GoogleAppsScriptDateFormatter} from "./BacklogClient"
import {Key, Project, Issue, Id, BacklogDefinition, Locale, UserProperty, User} from "./datas"
import {HttpClient} from "./Http"
import {Option, Some, None} from "./Option"
import {Either, Right, Left} from "./Either"
import {IssueConverter} from "./IssueConverter"
import {List} from "./List"
import { Message } from "./resources";
import { iSpreadSheetService, SpreadSheetServiceImpl } from "./SpreadSheetService";

import { iUserPropertyService, UserPropertyServiceImpl , iConfig } from "./UserPropertyService";
import { FromBacklog } from "./FromBacklog";

const SCRIPT_VERSION = "v2.0.1"
const TEMPLATE_SHEET_NAME = "Template"
const ROW_HEADER_INDEX = 1
const COLUMN_START_INDEX = 1 /** データ列の開始インデックス */
const ROW_START_INDEX = 2    /** データ行の開始インデックス */
const DEFAULT_COLUMN_LENGTH = 16

type Validation<A> = (a: A, onError: Error) => Either<Error, A>

const isEmpty: Validation<string> = (str: string, onError: Error): Either<Error, string> =>
  str !== "" ? Right(str) : Left(onError)

const createBacklogClient = (space: string, domain: string, apiKey: string, locale: Locale): Either<Error, iBacklogClient> => {
  const spaceResult = isEmpty(space, Error(Message.SPACE_URL_REQUIRED(locale)))
  const apiKeyResult = isEmpty(apiKey, Error(Message.API_KEY_REQUIRED(locale)))
  return Either.map2(spaceResult, apiKeyResult, (s, a) => {
    return Right(new BacklogClientImpl(new HttpClient, s, domain, a, new GoogleAppsScriptDateFormatter))
  })
}

const getProject = (client: iBacklogClient, key: Key<Project>, locale: Locale): Either<Error, Project> => {
  const result = client.getProjectV2(key)
  return result.recover(error => {
    if (error.message.indexOf("returned code 404") !== -1)
      return Left(Error(Message.SPACE_OR_PROJECT_NOT_FOUND(locale)))
    if (error.message.indexOf("returned code 401") !== -1)
      return Left(Error(Message.AUTHENTICATE_FAILED(locale)))
    return Left(Error(Message.API_ACCESS_ERROR(error, locale)))
  })
}

const getIssuList = (client: iBacklogClient, key: Key<Project>, locale: Locale): Array<JSON> => {
  return client.getIssueListV2(key)
}

const getCommentList = (client: iBacklogClient, key: Key<Project>, issulist: List<any>, locale: Locale): Array<JSON> => {
  return client.getCommentListV2(key, issulist)
}

const createIssueConverter = (client: iBacklogClient, projectId: Id<Project>): IssueConverter =>
  IssueConverter(
    projectId,
    client.getIssueTypesV2(projectId),
    client.getCategoriesV2(projectId),
    client.getVersionsV2(projectId),
    client.getPrioritiesV2(),
    client.getUsersV2(projectId),
    client.getCustomFieldsV2(projectId)
  )

const convertIssue = (converter: IssueConverter, issue: any): Either<Error, Issue> =>
  converter.convert(issue)

const validate = (issues: List<any>, client: iBacklogClient, locale: Locale): Either<Error, boolean> => {
  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i]
    const errorString = Message.VALIDATE_ERROR_LINE(i + 2, locale)
    if (!Option(issue.summary).isDefined)
      return Left(Error(errorString + Message.VALIDATE_SUMMARY_EMPTY(locale)))
    if (!Option(issue.issueTypeName).isDefined)
      return Left(Error(errorString + Message.VALIDATE_ISSUE_TYPE_EMPTY(locale)))
    if (issue.parentIssueKey !== undefined && issue.parentIssueKey !== "*")
      if (!client.getIssueV2(issue.parentIssueKey).isDefined)
        return Left(Error(errorString + Message.VALIDATE_PARENT_ISSUE_KEY_NOT_FOUND(issue.parentIssueKey, locale)))
  }
  return Right(true)
}

const getMessage = (key: string, ispreadSheetService: iSpreadSheetService) =>
  Message.findByKey(key, ispreadSheetService.getUserLocale())

const getUserProperties = (ispreadSheetService: iSpreadSheetService): UserProperty => {
  const lastSpace = ispreadSheetService.getUserProperty("space") ? ispreadSheetService.getUserProperty("space") : ""
  const lastDomain = ispreadSheetService.getUserProperty("domain") ? ispreadSheetService.getUserProperty("domain") : ".com"
  const lastApiKey = ispreadSheetService.getUserProperty("apiKey") ? ispreadSheetService.getUserProperty("apiKey") : ""
  const lastProjectKey = ispreadSheetService.getUserProperty("projectKey") ? ispreadSheetService.getUserProperty("projectKey") : ""

  return UserProperty(lastSpace, lastDomain, lastApiKey, lastProjectKey)
}

const storeUserProperties = (grid: any, ispreadSheetService: iSpreadSheetService): void => {
  ispreadSheetService.setUserProperty("space", grid.parameter.space)
  ispreadSheetService.setUserProperty("domain", grid.parameter.domain)
  ispreadSheetService.setUserProperty("apiKey", grid.parameter.apiKey);
  ispreadSheetService.setUserProperty("projectKey", grid.parameter.projectKey);
}

const storeConfig = (config: iConfig, propertyService: iUserPropertyService): void => {
  propertyService.set('url', config.url)
  propertyService.set('space', config.space)
  propertyService.set('domain', config.domain)
  propertyService.set('apiKey', config.apiKey)
  propertyService.set('projectKey', config.projectKey)
  propertyService.set('mailaddress', config.mailaddress)
  propertyService.set('cksendmail', config.cksendmail)
}

const showMessage = (message: string, ispreadSheetService: iSpreadSheetService): void =>
ispreadSheetService.showMessage(getMessage("scriptName", ispreadSheetService), message)

const strLength = (text: string): number => {
  let count = 0

  for (let i = 0; i < text.length; i++) {
    const n = escape(text.charAt(i))
    if (n.length < 4)
      count += 1;
    else
      count += 2;
  }
  return count;
}

const createIssue = (client: iBacklogClient, issue: Issue, optParentIssueId: Option<string>): Either<Error, Issue> => {
  const createIssue = Issue(
    0,
    "",
    issue.projectId,
    issue.summary,
    issue.description,
    issue.startDate,
    issue.dueDate,
    issue.estimatedHours,
    issue.actualHours,
    issue.issueType,
    issue.categories,
    issue.versions,
    issue.milestones,
    issue.priority,
    issue.assignee,
    optParentIssueId.map(id => id.toString()),
    issue.customFields
  )

  return client.createIssueV2(createIssue)
}

const getTemplateIssuesFromSpreadSheet = (ispreadSheetService: iSpreadSheetService): any => {
  let issues = []
  const spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
	const sheet = spreadSheet.getSheetByName(TEMPLATE_SHEET_NAME)
	const columnLength = sheet.getLastColumn()
	const values = sheet.getSheetValues(
		ROW_START_INDEX, 
		COLUMN_START_INDEX,
		sheet.getLastRow() - 1, 
		columnLength
	)

	for (let i = 0; i < values.length; i++) {
		let customFields = [];
		let customFieldIndex = 0;
		for (let j = 13; j < columnLength; j++) {
			if (values[i][j] !== "") {
				customFields[customFieldIndex] = {
					header: ispreadSheetService.getRange(sheet, j + 1, ROW_HEADER_INDEX).getFormula(),
					value: values[i][j]
				};
				customFieldIndex++;
			}
		}
		const issue = {
			summary: values[i][0] === "" ? undefined : values[i][0],
			description: values[i][1] === "" ? undefined : values[i][1],
			startDate: values[i][2] === "" ? undefined : values[i][2],
			dueDate: values[i][3] === "" ? undefined : values[i][3],
			estimatedHours: values[i][4] === "" ? undefined : values[i][4],
			actualHours: values[i][5] === "" ? undefined : values[i][5],
			issueTypeName: values[i][6] === "" ? undefined : values[i][6],
			categoryNames: values[i][7],
			versionNames: values[i][8],
			milestoneNames: values[i][9],
			priorityName: values[i][10] === "" ? undefined : values[i][10],
			assigneeName: values[i][11] === "" ? undefined : values[i][11],
			parentIssueKey: values[i][12] === "" ? undefined : values[i][12],
			customFields: customFields
		};
		issues[i] = issue;
	}
	return issues;
}

const calcWidth = (length: number): number => {
	const DEFAULT_FONT_SIZE = 10; 	/** フォントのデフォルトサイズ */
	const ADJUST_WIDTH_FACTOR = 0.75; /** 列幅調整時の係数 */
	return length * DEFAULT_FONT_SIZE * ADJUST_WIDTH_FACTOR;
}

interface iBacklogService {

  createApplication: (title: string, width: number, height: number) => UiInstance

  createGrid: (ui: UiInstance, property: UserProperty) => any

  showDialog: (ui: UiInstance, grid: any, handlerName: string) => void

  showInitDialog: () => void

  showRunDialog: () => void

  showGetDialog: () => void

  getUserProperties: () => UserProperty

  storeUserProperties: (grid: any) => void

  run: (grid: any) => UiInstance

  getConfig: () => iConfig

  getIssuList: (config: iConfig) => string

  getCommentList: (config: iConfig) => string

  getDefinitions: (grid: any) => UiInstance

  getMessage: (key: string, locale: string) => string

  showMessage: (message: string) => void
}

export const BacklogService = (ispreadSheetService: iSpreadSheetService): iBacklogService => ({

  createApplication: (title: string, width: number, height: number): UiInstance =>
    UiApp
      .createApplication()
      .setTitle(title)
      .setWidth(width)
      .setHeight(height),

  createGrid: (ui: UiInstance, property: UserProperty): any => {
    const anotherDomain = (property.domain === ".com") ? ".jp" : ".com"
    return ui
      .createGrid(3, 4)
      .setWidget(0, 0, ui.createLabel(getMessage("label_spaceId", ispreadSheetService)))
      .setWidget(0, 1, ui.createTextBox().setName("space").setValue(property.space))
      .setWidget(0, 2, ui.createLabel('.backlog'))
      .setWidget(0, 3, ui.createListBox(false).setName("domain").addItem(property.domain).addItem(anotherDomain))
      .setWidget(1, 0, ui.createLabel(getMessage("label_apiKey", ispreadSheetService)))
      .setWidget(1, 1, ui.createTextBox().setName("apiKey").setValue(property.apiKey))
      .setWidget(2, 0, ui.createLabel(getMessage("label_projectKey", ispreadSheetService)))
      .setWidget(2, 1, ui.createTextBox().setName("projectKey").setValue(property.projectKey))
  },

  showDialog(ui: UiInstance, grid: any, handlerName: string): void {
    const panel = ui.createVerticalPanel()
    const submitButton = ui.createButton(getMessage("button_execute", ispreadSheetService))
    const submitHandler = ui.createServerClickHandler(handlerName)

    submitHandler.addCallbackElement(grid)
    submitButton.addClickHandler(submitHandler)
    panel.add(grid).add(submitButton)
    ui.add(panel)
    SpreadsheetApp.getActiveSpreadsheet().show(ui)
  },

  showInitDialog(): void {
    const app = this.createApplication(getMessage("title_init", ispreadSheetService) + " " + SCRIPT_VERSION, 360, 160)
    const property = this.getUserProperties()
    const grid = this.createGrid(app, property)
    
    this.showDialog(app, grid, "init")
  },

  showRunDialog(): void {
    const app = this.createApplication(getMessage("title_run", ispreadSheetService) + " " + SCRIPT_VERSION, 360, 160)
    const property = this.getUserProperties()
    const grid = this.createGrid(app, property)
    
    this.showDialog(app, grid, "main")
  },

  showGetDialog(): void {
    const html = HtmlService
    .createTemplateFromFile('index')
    .evaluate()	

  SpreadsheetApp
    .getUi()
    .showModalDialog(html, getMessage("title_getIssues", ispreadSheetService))
  },

  getUserProperties: (): UserProperty =>
    getUserProperties(ispreadSheetService),

  storeUserProperties: (grid: any): void =>
    storeUserProperties(grid, ispreadSheetService),

  run: (grid: any): UiInstance => {
    const app = UiApp.getActiveApplication()
    const property = getUserProperties(ispreadSheetService)
    const current = Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd HH:mm:ss")
    const sheetName = getMessage("scriptName", ispreadSheetService) + " : " + current
    const LOG_KEY_NUMBER = 1
    const LOG_SUMMARY_NUMBER = 2
    const locale = ispreadSheetService.getUserLocale()

    // BacklogScript throws an exception on error
    showMessage(getMessage("progress_collect", ispreadSheetService), ispreadSheetService);
    const templateIssues = getTemplateIssuesFromSpreadSheet(ispreadSheetService)
    storeUserProperties(grid, ispreadSheetService)
    showMessage(Message.PROGRESS_RUN_BEGIN(locale), ispreadSheetService)
  
    const client = createBacklogClient(property.space, property.domain, property.apiKey, locale).getOrError()
    const _ = validate(templateIssues, client, locale).getOrError()
    const project = getProject(client, property.projectKey, locale).getOrError()
    const converter = createIssueConverter(client, project.id)
    const convertResults = templateIssues.map(issue => convertIssue(converter, issue))
    const issues = Either.sequence(convertResults).getOrError()

    // Post issues
    let previousIssue = Option<Issue>(null)
    let keyLength = DEFAULT_COLUMN_LENGTH
    let summaryLength = DEFAULT_COLUMN_LENGTH

    for ( let i = 0; i < issues.length; i++) {
      let isTakenOverParentIssueId = false
      let optParentIssueId = issues[i].parentIssueId

      optParentIssueId.map(function(parentIssueId) {
        if (parentIssueId === "*") {
          if (previousIssue.flatMap(issue => issue.parentIssueId).isDefined) {
            previousIssue.map(issue => showMessage(Message.ALREADY_BEEN_CHILD_ISSUE(issue.issueKey, locale), ispreadSheetService))
            optParentIssueId = None<string>()
          } else {
            optParentIssueId = previousIssue.map(issue => issue.id.toString())
            isTakenOverParentIssueId = true
          }
        } else {
          optParentIssueId = client.getIssueV2(parentIssueId).map(issue => issue.id)
        }
      })
      createIssue(client, issues[i], optParentIssueId.map(id => id)).map(issue => {
        if (!isTakenOverParentIssueId) {
          previousIssue = Some(issue)
        }
        var logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
        const issueKey = issue.issueKey;
        const summary = issue.summary;
        const fomula = '=hyperlink("' + property.space + ".backlog" + property.domain + "/" + "view/" + issueKey + '";"' + issueKey + '")';
        const currentRow = i + 1;
    
        if (logSheet == null)
          logSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName, 1);
        keyLength = Math.max(keyLength, strLength(issueKey));
        summaryLength = Math.max(summaryLength, strLength(summary));
    
        const keyWidth = calcWidth(keyLength)
        const summaryWidth = calcWidth(summaryLength)
        const keyCell = ispreadSheetService.getRange(logSheet, LOG_KEY_NUMBER, currentRow)
        const summaryCell = ispreadSheetService.getRange(logSheet, LOG_SUMMARY_NUMBER, currentRow)
    
        keyCell.setFormula(fomula).setFontColor("blue").setFontLine("underline")
        summaryCell.setValue(summary)
        ispreadSheetService.setColumnWidth(logSheet, LOG_KEY_NUMBER, keyWidth)
        ispreadSheetService.setColumnWidth(logSheet, LOG_SUMMARY_NUMBER, summaryWidth)
        SpreadsheetApp.flush()
      }).getOrError()
    }
    showMessage(getMessage("scriptName", ispreadSheetService) + getMessage("progress_end", ispreadSheetService), ispreadSheetService)
    return app.close()
  },

  getConfig: (): iConfig => {
    const propertyService = UserPropertyServiceImpl()
    return propertyService.getConfigFromProperty(propertyService)
  },

  getIssuList: (config: iConfig): string => {
    const propertyService = UserPropertyServiceImpl()
    storeConfig(config, propertyService)
    const property = getUserProperties(ispreadSheetService)
    const locale = ispreadSheetService.getUserLocale()

    const client = createBacklogClient(config.space, config.domain, config.apiKey, locale).getOrError()
    const project = getProject(client, config.projectKey, locale).getOrError()
    const converter = createIssueConverter(client, project.id)

    const issulist = getIssuList(client, project.id, locale)
    const commentlist = getCommentList(client, project.id, issulist, locale)

    const frombacklog = FromBacklog()
    frombacklog.toSpreadSheet(issulist, commentlist, config)
    
  return "success"
  },

  getCommentList: (config: iConfig): string => {
    const propertyService = UserPropertyServiceImpl()
    storeConfig(config, propertyService)
    const property = getUserProperties(ispreadSheetService)
    const locale = ispreadSheetService.getUserLocale()

    const client = createBacklogClient(config.space, config.domain, config.apiKey, locale).getOrError()
    const project = getProject(client, config.projectKey, locale).getOrError()
    const converter = createIssueConverter(client, project.id)
  
    const issulist = getIssuList(client, project.id, locale)
    const commentlist = getCommentList(client, project.id, issulist, locale)
    const frombacklog = FromBacklog()
    frombacklog.toSpreadSheet(issulist, commentlist, config)
    
  return "success"
  },

  getDefinitions: (grid: any): UiInstance => {
    storeUserProperties(grid, ispreadSheetService)
    const app = UiApp.getActiveApplication()
    const property = getUserProperties(ispreadSheetService)
    const locale = ispreadSheetService.getUserLocale()
    
    showMessage(Message.PROGRESS_INIT_BEGIN(locale), ispreadSheetService)
    return createBacklogClient(property.space, property.domain, property.apiKey, locale)
      .flatMap(client =>
        getProject(client, property.projectKey, locale).map(project => 
          BacklogDefinition(
            client.getIssueTypesV2(project.id),
            client.getCategoriesV2(project.id),
            client.getVersionsV2(project.id),
            client.getPrioritiesV2(),
            client.getUsersV2(project.id),
            client.getCustomFieldsV2(project.id)
          )
        )
      )
      .map(definition => {
        const templateSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TEMPLATE_SHEET_NAME)
        const issueTypeRule = SpreadsheetApp.newDataValidation().requireValueInList(definition.issueTypeNames(), true).build()
        const categoryRule = SpreadsheetApp.newDataValidation().requireValueInList(definition.categoryNames(), true).build()
        const versionRule = SpreadsheetApp.newDataValidation().requireValueInList(definition.versionNames(), true).build()
        const priorityRule = SpreadsheetApp.newDataValidation().requireValueInList(definition.priorityNames(), true).build()
        const userRule = SpreadsheetApp.newDataValidation().requireValueInList(definition.userNames(), true).build()
        const lastRowNumber = templateSheet.getLastRow() - 1
        const customFieldStartColumnNumber = 14 // N ~
        let currentColumnNumber = customFieldStartColumnNumber

        templateSheet.getRange(2, 7, lastRowNumber).setDataValidation(issueTypeRule)  // 7 = G
        templateSheet.getRange(2, 8, lastRowNumber).setDataValidation(categoryRule) 	// 8 = H
        templateSheet.getRange(2, 9, lastRowNumber).setDataValidation(versionRule) 	  // 9 = I
        templateSheet.getRange(2, 10, lastRowNumber).setDataValidation(versionRule) 	// 10 = J
        templateSheet.getRange(2, 11, lastRowNumber).setDataValidation(priorityRule)  // 11 = K
        templateSheet.getRange(2, 12, lastRowNumber).setDataValidation(userRule) 	    // 12 = L
        for (let i = 0; i < definition.customFields.length; i++) {
          const customField = definition.customFields[i]
          const headerCell = ispreadSheetService.getRange(templateSheet, currentColumnNumber, ROW_HEADER_INDEX)
          const columnName = headerCell.getValue()
      
          /**
           * https://github.com/nulab/backlog4j/blob/master/src/main/java/com/nulabinc/backlog4j/CustomField.java#L10
           * Text(1), TextArea(2), Numeric(3), Date(4), SingleList(5), MultipleList(6), CheckBox(7), Radio(8)
           * We don't support the types MultipleList(6) and CheckBox(7), Radio(8)
           */
          let customFieldName = "";
      
          if (customField.typeId >= 6)
            continue;
          switch(customField.typeId) {
            case 1:
              customFieldName = "文字列";
              break;
            case 2:
              customFieldName = "文章";
              break;
            case 3:
              customFieldName = "数値";
              break;
            case 4:
              customFieldName = "日付";
              break;
            case 5:
              customFieldName = "選択リスト";
              break;
          }

          const headerName = customField.name + '（' + customFieldName + '）'

          if (columnName === "") {
            const headerStrLength = strLength(headerName)
            const headerWidth = calcWidth(headerStrLength)

            templateSheet.insertColumnAfter(currentColumnNumber - 1);
            templateSheet
              .getRange(1, currentColumnNumber, templateSheet.getLastRow(), 1)
              .setBackground("#F8FFFF")
              .setFontColor("black")
            ispreadSheetService.setColumnWidth(templateSheet, currentColumnNumber, headerWidth)
          }
          headerCell.setFormula(
            '=hyperlink("' + property.space + ".backlog" + property.domain + "/EditAttribute.action?attribute.id=" + customField.id + '";"' + headerName + '")'
          )
          currentColumnNumber++
        }
        showMessage(getMessage("complete_init", ispreadSheetService), ispreadSheetService)
        return app.close()
      })
      .getOrError()
  },

  getMessage: (key: string): string =>
    getMessage(key, ispreadSheetService),

  showMessage: (message: string): void =>
    showMessage(message, ispreadSheetService)
});