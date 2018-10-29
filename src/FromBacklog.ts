import { CONST } from './CONST';
import { messages } from './messages';
import { グローバル変数 } from './グローバル変数';
import { iUserPropertyService, UserPropertyServiceImpl , iConfig } from "./UserPropertyService";

interface iFromBacklog {

  toSpreadSheet: (issue_list: any, comment_list: any, config: iConfig) => void

}

export const FromBacklog = (): iFromBacklog => ({

  toSpreadSheet(issue_list: any, comment_list: any, config: iConfig): any {

  CreateIssueFromComment(issue_list, comment_list);

  CreateParentArray(issue_list);

  issue_list.sort(compare);

  // 一旦、シートをクリアにする
  グローバル変数.target_sheet
    .getRange(
      CONST.STARTROW,
      CONST.HEADERSTARTCOL,
      グローバル変数.spread_sheet.getLastRow(),
      CONST.HEADERTOTALCOLCOUNT
    )
    .clearContent();

  var totalCount = issue_list.count;
  var row = CONST.STARTROW;
  for (var cnt in issue_list) {
    if (issue_list[cnt][CONST.Field_parentIssueId] === null) {
      グローバル変数.flgChild = false;
    } else {
      グローバル変数.flgChild = true;
    }

    for (var itemName in issue_list[cnt]) {
      if (itemName === CONST.Field_customFields) {
        var obj = issue_list[cnt][itemName];
        for (var exCnt in obj)
          if (obj[exCnt].name === '') {
          } else {
            var value = getValuecustomFields(issue_list, cnt, exCnt, obj[exCnt].name);
            var col = getColcustomFields(issue_list, cnt, obj[exCnt].name);
            if (0 < col && value !== '' && value !== undefined) {
              グローバル変数.target_sheet.getRange(row, col).setValue(value);
            }
          }
      } else {
        var value = getValue(issue_list, cnt, itemName);
        var col = getCol(itemName);
      }
      if (0 < col && value !== '') {
        グローバル変数.target_sheet.getRange(row, col).setValue(value);
      }
    }
    row++;
  }

  Browser.msgBox(messages.common.end);

  // if (config.cksendmail === ""){
  //   sendMail(config)
  // }
}
})

function sendMail(config: iConfig) {

	var attachmentFiles = new Array();

	// その他
	var nowDate = Utilities.formatDate(new Date(), 'JST', 'yyyyMMdd');
	var fetchUrl;
	var fetchOpt = {
		"headers": {
			Authorization: "Bearer " + ScriptApp.getOAuthToken()
		},
		"muteHttpExceptions": true
	};

	var fileName = グローバル変数.target_sheet_name
	var xlsxName = fileName + "_" + nowDate + ".xlsx";
	var key = グローバル変数.spread_sheet.getId()
	fetchUrl = "https://docs.google.com/feeds/download/spreadsheets/Export?key=" +
		key + "&amp;exportFormat=xlsx";
	attachmentFiles.push(UrlFetchApp.fetch(fetchUrl, fetchOpt).getBlob().setName(
		xlsxName));

	// メール関係
	var mailto = config.mailaddress
	var subject = "[GoogleDrive]定期バックアップ(" + Utilities.formatDate(new Date(),
		'JST', 'yyyy/MM/dd') + ")";
	var body = "";

	// メール送信
	MailApp.sendEmail(mailto, subject, body, {
		attachments: attachmentFiles
	});
}

function errorCheck() {
  var error = true;
  if (error === true) {
    return false;
  } else {
    return true;
  }
}

//itemNameによってColを指定する
function getCol(itemName) {
	switch (itemName) {
		case CONST.Field_parentIssueId:
			if (グローバル変数.flgChild === false) {
				return getColCommon(CONST.ExcelField_課題番号);
			} else {
        break;
      }
		case CONST.Field_issueKey:
			return getColCommon(CONST.ExcelField_課題キー);
		case CONST.Field_status:
			return getColCommon(CONST.ExcelField_状態);
		case CONST.Field_createdUser:
			return getColCommon(CONST.ExcelField_起票者);
		case CONST.Field_summary:
			return getColCommon(CONST.ExcelField_内容);
		case CONST.Field_priority:
			return getColCommon(CONST.ExcelField_優先度);
		case CONST.Field_startDate:
			return getColCommon(CONST.ExcelField_回答日);
		case CONST.Field_assignee:
			return getColCommon(CONST.ExcelField_回答者);
		case CONST.Field_description:
			if (グローバル変数.flgChild === false) {
				return getColCommon(CONST.ExcelField_原因_回答_補足);
			} else {
				return getColCommon(CONST.ExcelField_対策_補足);
			}
		default:
			return getColCommon(itemName);
	}
}

// //itemNameによってColを指定する
// function getCol(itemName){
//   if (itemName === '') {
//   } else if (itemName === CONST.Field_parentIssueId) {
//     if (グローバル変数.flgChild === false) {
//       return getColCommon(CONST.ExcelField_課題番号);
//     } else {
//     }
//   } else if (itemName === CONST.Field_issueKey) {
//     return getColCommon(CONST.ExcelField_課題キー);
//   } else if (itemName === CONST.Field_status) {
//     return getColCommon(CONST.ExcelField_状態);
//   } else if (itemName === CONST.Field_createdUser) {
//     return getColCommon(CONST.ExcelField_起票者);
//   } else if (itemName === CONST.Field_summary) {
//     return getColCommon(CONST.ExcelField_内容);
//   } else if (itemName === CONST.Field_priority) {
//     return getColCommon(CONST.ExcelField_優先度);
//   } else if (itemName === CONST.Field_startDate) {
//     return getColCommon(CONST.ExcelField_回答日);
//   } else if (itemName === CONST.Field_assignee) {
//     return getColCommon(CONST.ExcelField_回答者);
//   } else if (itemName === CONST.Field_description) {
//     if (グローバル変数.flgChild === false) {
//       return getColCommon(CONST.ExcelField_原因_回答_補足);
//     } else {
//       return getColCommon(CONST.ExcelField_対策_補足);
//     }
//   } else {
//     return getColCommon(itemName);
//   }
// }

//objによってvalueを指定する
function getValue(issue_list, cnt, itemName) {
  var obj = issue_list[cnt][itemName];
  if (itemName === '') {
  } else if (itemName === CONST.Field_priority) {
    if (obj.id === '2') {
      return '高';
    } else if (obj.id === '3') {
      return '中';
    } else {
      return '低';
    }
  } else if (itemName === CONST.Field_status) {
    return issue_list[cnt][itemName].name ;

  } else if (itemName === CONST.Field_parentIssueId) {
    if (issue_list[cnt][itemName] === null) {
      return issue_list[cnt][CONST.Field_id];
    } else {
      return issue_list[cnt][itemName];
    }
  } else if (itemName === CONST.Field_assignee) {
    if (issue_list[cnt][itemName] === null) {
      return '';
    } else {
      return issue_list[cnt][itemName].name.split(' ')[0].split('　')[0];
    }
  } else if (itemName === CONST.Field_startDate) {
    if (issue_list[cnt][itemName] === null) {
      return '';
    } else {
      return dateFormat(issue_list[cnt][itemName]);
    }
  } else if (itemName === CONST.Field_createdUser) {
    return getValuecreatedUser(issue_list, cnt, itemName)
      .split(' ')[0]
      .split('　')[0];
  } else {
    return issue_list[cnt][itemName];
  }
}

//objによってColを指定する(customFields)
function getColcustomFields(issue_list, cnt, itemName) {
  if (itemName === '') {
  } else if (itemName === CONST.cField_発生日) {
    return getCol(CONST.ExcelField_発生日);
  } else if (itemName === CONST.cField_お客様起票者名) {
    return getCol(CONST.ExcelField_起票者);
  } else if (itemName === CONST.cField_お客様担当者名) {
    return getCol(CONST.ExcelField_回答者);
  } else if (itemName === CONST.cField_機能名) {
    return getCol(CONST.ExcelField_発生場所_機能);
  } else {
    return 0;
  }
}

//objによってvalueを指定する(customFields)
function getValuecustomFields(issue_list, cnt, exCnt, itemName) {
  var obj = issue_list[cnt][CONST.Field_customFields];
  if (itemName === '') {
  } else if (itemName === CONST.cField_発生日) {
    グローバル変数.発生日Index = exCnt //★TODO いまいち
    return getValuecustomFieldsEx(obj, exCnt, CONST.FORMAT_DATE);
  } else if (itemName === CONST.cField_リリース日) {
    return getValuecustomFieldsEx(obj, exCnt, CONST.FORMAT_DATE);
  } else if (itemName === CONST.cField_お客様起票者名) {
    return getValuecustomFieldsEx(obj, exCnt, CONST.FORMAT_NAME);
  } else if (itemName === CONST.cField_お客様担当者名) {
    return getValuecustomFieldsEx(obj, exCnt, CONST.FORMAT_NAME);
  } else if (itemName === CONST.cField_機能名) {
    return getValuecustomFieldsEx(obj, exCnt, CONST.FORMAT_NAME);
  } else {
    return '';
  }
}

//customFieldsの値取得が煩雑なので纏める
// var obj = issue_list[cnt][itemName]
function getValuecustomFieldsEx(obj, exCnt, type) {
  var custom: any;

  if (obj[exCnt].value === null) {
    return '';
  }

  if (obj[exCnt] instanceof Array === false) {
    custom = obj[exCnt].value;
  } else {
    custom = obj[exCnt].value[0];
  }

  if (custom === undefined) {
    return '';
  } else if (custom === '') {
  } else {
    if (type === CONST.FORMAT_DATE) {
      return dateFormat(custom);
    } else if (type === CONST.FORMAT_NAME) {
      if (custom instanceof Array === false) {
        return custom.name;
      } else {
        return custom[0].name;
      }
    } else {
    }
  }
}
//objによってvalueを指定する(createdUser)
function getValuecreatedUser(issue_list, cnt, itemName) {
  var createdUser = issue_list[cnt][itemName];
  var name = createdUser.name;
  if (name === '') {
  } else {
    return name;
  }
}
//
function dateFormat(strDate) {
  return Utilities.formatDate(new Date(strDate), 'JST', 'yyyy/M/dd');
}

// コメントをIssueとして追加する
function CreateIssueFromComment(issue_list, comment_list) {
	let IssueKeyValueList = {}
	for (let id in issue_list) {
		let issueidkey = setissuekeyvalue(id,issue_list)
		IssueKeyValueList[issueidkey.key] = issueidkey
	}
	for (let cntcomment in comment_list) {
		let issue = issue_list[IssueKeyValueList[comment_list[cntcomment].issueKey].id]
		let copiedissue = JSON.parse(JSON.stringify(issue));
		copiedissue.issueKey = ""
			//      copiedissue.status.name = ""
		copiedissue.summary = ""
		copiedissue.content = ""
		copiedissue.startDate = comment_list[cntcomment][CONST.Field_created];
		copiedissue.description = comment_list[cntcomment][CONST.Field_content];
		issue_list.push(copiedissue);
	}
}

function setissuekeyvalue(id, issue_list)  { 
  return ({ id: id, key: issue_list[id].issueKey }); 
};

// parentID配列を作成する
function CreateParentArray(issue_list){

  for (var cnt in issue_list) {
    if (issue_list[cnt][CONST.Field_parentIssueId] === null) {
      グローバル変数.parentArray[issue_list[cnt][CONST.Field_id]] = issue_list[cnt][CONST.Field_customFields][グローバル変数.発生日Index].value
  }
  }
}

//. 比較関数
//. http://dotnsf.blog.jp/archives/1069693033.html
//. 親課題発生日 + parentIssueId + IssueId
function compare(a, b) {
  var pIdA = ('0000' + a.id).slice(-10);
  var pIdB = ('0000' + b.id).slice(-10);

  if (a.parentIssueId === null) {
    var pIsdA = pIdA;
    var p発生日A = a.customFields[グローバル変数.発生日Index].value;
  } else {
    var pIsdA = ('0000' + a.parentIssueId).slice(-10);
    var p発生日A = グローバル変数.parentArray[a.parentIssueId];
  }
  if (b.parentIssueId === null) {
    var pIsdB = pIdB;
    var p発生日B = b.customFields[グローバル変数.発生日Index].value;
  } else {
    var pIsdB = ('0000' + b.parentIssueId).slice(-10);
    var p発生日B = グローバル変数.parentArray[b.parentIssueId];
  }

  if (p発生日A === null) {
      p発生日A = '0000-00-00000:00:000';
  }
  if (p発生日B === null) {
      p発生日B = '0000-00-00000:00:000';
  } 

  var r = 0;
  if (p発生日A + pIsdA + pIdA < p発生日B + pIsdB + pIdB) {
    r = -1;
  } else if (p発生日B + pIsdB + pIdB < p発生日A + pIsdA + pIdA) {
    r = 1;
  }
  return r;
}

// ヘッダーより各項目に対応するColを取得する
function setCol(colArray) {
  // 配列を99まで埋める
  if (colArray.length === 0) {
    for (var i = 1; i < 100; i++) {
      colArray.push('' + i);
    }
  }

  var LastCol = グローバル変数.target_sheet.getLastColumn();
  var dat = グローバル変数.target_sheet
    .getRange(CONST.HEADERSTARTROW, CONST.HEADERSTARTCOL, CONST.HEADERTOTALROWCOUNT, LastCol - 1)
    .getValues();

  for (var cnt = 0; cnt < dat.length; cnt++) {
    for (var col = CONST.HEADERSTARTCOL; col < dat[cnt].length; col++) {
      var itemName = dat[cnt][col - 1];
      if (itemName === '') {
      } else if (
        itemName === CONST.ExcelField_課題番号 ||
        itemName === CONST.ExcelField_課題キー ||
        itemName === CONST.ExcelField_状態 ||
        itemName === CONST.ExcelField_発生日 ||
        itemName === CONST.ExcelField_起票者 ||
        itemName === CONST.ExcelField_発生場所_機能 ||
        itemName === CONST.ExcelField_内容 ||
        itemName === CONST.ExcelField_優先度 ||
        itemName === CONST.ExcelField_回答日 ||
        itemName === CONST.ExcelField_回答者 ||
        itemName === CONST.ExcelField_原因_回答_補足 ||
        itemName === CONST.ExcelField_対策_補足 ||
        itemName === CONST.ExcelField_リリース
      ) {
        colArray.splice(dat[cnt].indexOf(itemName) + 1, 1); // 一つ削除
        colArray.splice(dat[cnt].indexOf(itemName) + 1, 0, itemName); // 挿入
      }
    }
  }
}

// 項目に対応するColを取得・返還する
function getColCommon(itemName) {
  if (グローバル変数.colArray.length === 0) {
    setCol(グローバル変数.colArray);
  }

  if (0 < グローバル変数.colArray.indexOf(itemName)) {
    return グローバル変数.colArray.indexOf(itemName);
  }
}
