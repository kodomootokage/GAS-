function BacklogService() {
}
function onOpen() {
}
function init_d() {
}
function main_d() {
}
function main_getissues_d() {
}
function init() {
}
function main() {
}
function getConfig() {
}
function getIssuList() {
}/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/BacklogClient.ts":
/*!******************************!*\
  !*** ./src/BacklogClient.ts ***!
  \******************************/
/*! exports provided: GoogleAppsScriptDateFormatter, issueToObject, objectToPayload, BacklogClientImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GoogleAppsScriptDateFormatter", function() { return GoogleAppsScriptDateFormatter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "issueToObject", function() { return issueToObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objectToPayload", function() { return objectToPayload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BacklogClientImpl", function() { return BacklogClientImpl; });
/* harmony import */ var _datas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./datas */ "./src/datas.ts");
/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Option */ "./src/Option.ts");
/* harmony import */ var _Either__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Either */ "./src/Either.ts");



var GoogleAppsScriptDateFormatter = /** @class */ (function () {
    function GoogleAppsScriptDateFormatter() {
        this.dateToString = function (date) {
            return Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd");
        };
    }
    return GoogleAppsScriptDateFormatter;
}());

var nullOrArray = function (items) {
    return items.length > 0 ? items : undefined;
};
var issueToObject = function (issue, dateFormatter) {
    var categoryIds = issue.categories.map(function (item) { return item.id; });
    var versionIds = issue.versions.map(function (item) { return item.id; });
    var milestoneIds = issue.milestones.map(function (item) { return item.id; });
    return {
        projectId: issue.projectId,
        summary: issue.summary,
        description: issue.description.getOrElse(function () { return undefined; }),
        startDate: issue.startDate.map(dateFormatter.dateToString).getOrElse(function () { return undefined; }),
        dueDate: issue.dueDate.map(dateFormatter.dateToString).getOrElse(function () { return undefined; }),
        estimatedHours: issue.estimatedHours.getOrElse(function () { return undefined; }),
        actualHours: issue.actualHours.getOrElse(function () { return undefined; }),
        issueTypeId: issue.issueType.id,
        categoryId: nullOrArray(categoryIds),
        versionId: nullOrArray(versionIds),
        milestoneId: nullOrArray(milestoneIds),
        priorityId: issue.priority.id,
        assigneeId: issue.assignee.map(function (item) { return item.id; }).getOrElse(function () { return undefined; }),
        parentIssueId: issue.parentIssueId.getOrElse(function () { return undefined; }),
        customFields: nullOrArray(issue.customFields)
    };
};
var objectToPayload = function (obj) {
    var arr = Object.
        keys(obj)
        .filter(function (key) { return obj[key] !== undefined; })
        .map(function (key) {
        if (key === "customFields") {
            var items = obj[key];
            return items.map(function (item) { return "customField_" + item.id + "=" + encodeURIComponent(item.value); }).join("&");
        }
        if (obj[key] instanceof Array) {
            var items = obj[key];
            return items.map(function (item) { return encodeURIComponent(key) + "[]=" + encodeURIComponent(item); }).join("&");
        }
        return encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]);
    });
    return arr.join("&");
};
var BacklogClientImpl = /** @class */ (function () {
    function BacklogClientImpl(http, spaceName, domain, apiKey, dateFormatter) {
        this.jsonTo = function (json) {
            return ({ id: json["id"], name: json["name"] });
        };
        this.http = http;
        this.spaceName = spaceName;
        this.domain = domain;
        this.apiKey = apiKey;
        this.dateFormatter = dateFormatter;
    }
    BacklogClientImpl.prototype.getProjectV2 = function (key) {
        try {
            var json = this.http.get(this.buildUri("projects/" + key));
            return Object(_Either__WEBPACK_IMPORTED_MODULE_2__["Right"])(Object(_datas__WEBPACK_IMPORTED_MODULE_0__["Project"])(json["id"], json["projectKey"]));
        }
        catch (e) {
            return Object(_Either__WEBPACK_IMPORTED_MODULE_2__["Left"])(e);
        }
    };
    BacklogClientImpl.prototype.getIssueV2 = function (idOrKey) {
        try {
            var json = this.http.get(this.buildUri("issues/" + idOrKey));
            var issue = this.jsonToIssue(json);
            return Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(issue);
        }
        catch (e) {
            return Object(_Option__WEBPACK_IMPORTED_MODULE_1__["None"])();
        }
    };
    BacklogClientImpl.prototype.getIssueListV2 = function (key) {
        var records = new Array();
        var loopendflg = false;
        var count = 20;
        while (!loopendflg) {
            for (var offset = 0; offset < 100; offset += count) {
                var respdata = this.http.get(this.buildUri("issues") + ("&projectId[]=" + key) + ("&offset=" + offset));
                if (0 < Object.keys(respdata).length) {
                    for (var i = 0; i < Object.keys(respdata).length; i++) {
                        records.push(respdata[i]);
                    }
                }
                else {
                    loopendflg = true;
                }
            }
        }
        return records;
    };
    BacklogClientImpl.prototype.getCommentListV2 = function (key, issulist) {
        var records = new Array();
        var loopendflg = false;
        var count = 100; //★TODO 100個以上のコメントがあった場非対応合
        var issues = issulist;
        for (var cntissu = 0; cntissu < issues.length; cntissu++) {
            var idOrKey = issues[cntissu].issueKey;
            var respdata = this.http.get(this.buildUri("issues/" + idOrKey + "/comments") + ("&projectId[]=" + key) + ("&count=" + count) + '&order=asc');
            for (var cntcomment = 0; cntcomment < Object.keys(respdata).length; cntcomment++) {
                if (respdata[cntcomment].content == null) {
                }
                else {
                    respdata[cntcomment].issueKey = idOrKey;
                    records.push(respdata[cntcomment]);
                }
            }
        }
        return records;
    };
    BacklogClientImpl.prototype.createIssueV2 = function (issue) {
        try {
            var obj = issueToObject(issue, this.dateFormatter);
            var payload = objectToPayload(obj);
            var json = this.http.post(this.buildUri("issues"), payload);
            var createdIssue = this.jsonToIssue(json);
            return Object(_Either__WEBPACK_IMPORTED_MODULE_2__["Right"])(createdIssue);
        }
        catch (e) {
            return Object(_Either__WEBPACK_IMPORTED_MODULE_2__["Left"])(e);
        }
    };
    BacklogClientImpl.prototype.getIssueCommentsV2 = function (idOrKey, key) {
        return this.http.get(this.buildUri("issues/" + idOrKey + "/comments") + ("&projectId[]=" + key));
    };
    BacklogClientImpl.prototype.getUsersV2 = function (id) {
        var _this = this;
        var json = this.http.get(this.buildUri("projects/" + id + "/users"));
        return Object.keys(json).map(function (key) { return _this.jsonTo(json[key]); });
    };
    BacklogClientImpl.prototype.getIssueTypesV2 = function (id) {
        var _this = this;
        var json = this.http.get(this.buildUri("projects/" + id + "/issueTypes"));
        return Object.keys(json).map(function (key) { return _this.jsonTo(json[key]); });
    };
    BacklogClientImpl.prototype.getCategoriesV2 = function (id) {
        var _this = this;
        var json = this.http.get(this.buildUri("projects/" + id + "/categories"));
        return Object.keys(json).map(function (key) { return _this.jsonTo(json[key]); });
    };
    BacklogClientImpl.prototype.getVersionsV2 = function (id) {
        var _this = this;
        var json = this.http.get(this.buildUri("projects/" + id + "/versions"));
        return Object.keys(json).map(function (key) { return _this.jsonTo(json[key]); });
    };
    BacklogClientImpl.prototype.getPrioritiesV2 = function () {
        var _this = this;
        var json = this.http.get(this.buildUri("priorities"));
        return Object.keys(json).map(function (key) { return _this.jsonTo(json[key]); });
    };
    BacklogClientImpl.prototype.getCustomFieldsV2 = function (id) {
        var json = this.http.get(this.buildUri("projects/" + id + "/customFields"));
        return Object.keys(json).map(function (key) { return ({ id: json[key]["id"], typeId: json[key]["typeId"], name: json[key]["name"] }); });
    };
    BacklogClientImpl.prototype.buildUri = function (resource) {
        return "https://" + this.spaceName + ".backlog" + this.domain + "/api/v2/" + resource + "?apiKey=" + this.apiKey;
    };
    BacklogClientImpl.prototype.jsonToIssue = function (json) {
        var _this = this;
        return Object(_datas__WEBPACK_IMPORTED_MODULE_0__["Issue"])(json["id"], json["issueKey"], json["projectId"], json["summary"], Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(json["description"]), Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(json["startDate"]).map(function (d) { return new Date(d); }), Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(json["dueDate"]).map(function (d) { return new Date(d); }), Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(json["estimatedHours"]), Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(json["actualHours"]), this.jsonTo(json["issueType"]), json["category"].map(this.jsonTo), json["versions"].map(this.jsonTo), json["milestone"].map(this.jsonTo), this.jsonTo(json["priority"]), Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(json["assignee"]).map(function (a) { return _this.jsonTo(a); }), Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(json["parentIssueId"]), json["customFields"].map(this.jsonTo));
    };
    return BacklogClientImpl;
}());



/***/ }),

/***/ "./src/BacklogService.ts":
/*!*******************************!*\
  !*** ./src/BacklogService.ts ***!
  \*******************************/
/*! exports provided: BacklogService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BacklogService", function() { return BacklogService; });
/* harmony import */ var _BacklogClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BacklogClient */ "./src/BacklogClient.ts");
/* harmony import */ var _datas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./datas */ "./src/datas.ts");
/* harmony import */ var _Http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Http */ "./src/Http.ts");
/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Option */ "./src/Option.ts");
/* harmony import */ var _Either__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Either */ "./src/Either.ts");
/* harmony import */ var _IssueConverter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./IssueConverter */ "./src/IssueConverter.ts");
/* harmony import */ var _resources__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resources */ "./src/resources.ts");
/* harmony import */ var _UserPropertyService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./UserPropertyService */ "./src/UserPropertyService.ts");
/* harmony import */ var _FromBacklog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FromBacklog */ "./src/FromBacklog.ts");









var SCRIPT_VERSION = "v2.0.1";
var TEMPLATE_SHEET_NAME = "Template";
var ROW_HEADER_INDEX = 1;
var COLUMN_START_INDEX = 1; /** データ列の開始インデックス */
var ROW_START_INDEX = 2; /** データ行の開始インデックス */
var DEFAULT_COLUMN_LENGTH = 16;
var isEmpty = function (str, onError) {
    return str !== "" ? Object(_Either__WEBPACK_IMPORTED_MODULE_4__["Right"])(str) : Object(_Either__WEBPACK_IMPORTED_MODULE_4__["Left"])(onError);
};
var createBacklogClient = function (space, domain, apiKey, locale) {
    var spaceResult = isEmpty(space, Error(_resources__WEBPACK_IMPORTED_MODULE_6__["Message"].SPACE_URL_REQUIRED(locale)));
    var apiKeyResult = isEmpty(apiKey, Error(_resources__WEBPACK_IMPORTED_MODULE_6__["Message"].API_KEY_REQUIRED(locale)));
    return _Either__WEBPACK_IMPORTED_MODULE_4__["Either"].map2(spaceResult, apiKeyResult, function (s, a) {
        return Object(_Either__WEBPACK_IMPORTED_MODULE_4__["Right"])(new _BacklogClient__WEBPACK_IMPORTED_MODULE_0__["BacklogClientImpl"](new _Http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], s, domain, a, new _BacklogClient__WEBPACK_IMPORTED_MODULE_0__["GoogleAppsScriptDateFormatter"]));
    });
};
var getProject = function (client, key, locale) {
    var result = client.getProjectV2(key);
    return result.recover(function (error) {
        if (error.message.indexOf("returned code 404") !== -1)
            return Object(_Either__WEBPACK_IMPORTED_MODULE_4__["Left"])(Error(_resources__WEBPACK_IMPORTED_MODULE_6__["Message"].SPACE_OR_PROJECT_NOT_FOUND(locale)));
        if (error.message.indexOf("returned code 401") !== -1)
            return Object(_Either__WEBPACK_IMPORTED_MODULE_4__["Left"])(Error(_resources__WEBPACK_IMPORTED_MODULE_6__["Message"].AUTHENTICATE_FAILED(locale)));
        return Object(_Either__WEBPACK_IMPORTED_MODULE_4__["Left"])(Error(_resources__WEBPACK_IMPORTED_MODULE_6__["Message"].API_ACCESS_ERROR(error, locale)));
    });
};
var getIssuList = function (client, key, locale) {
    return client.getIssueListV2(key);
};
var getCommentList = function (client, key, issulist, locale) {
    return client.getCommentListV2(key, issulist);
};
var createIssueConverter = function (client, projectId) {
    return Object(_IssueConverter__WEBPACK_IMPORTED_MODULE_5__["IssueConverter"])(projectId, client.getIssueTypesV2(projectId), client.getCategoriesV2(projectId), client.getVersionsV2(projectId), client.getPrioritiesV2(), client.getUsersV2(projectId), client.getCustomFieldsV2(projectId));
};
var convertIssue = function (converter, issue) {
    return converter.convert(issue);
};
var validate = function (issues, client, locale) {
    for (var i = 0; i < issues.length; i++) {
        var issue = issues[i];
        var errorString = _resources__WEBPACK_IMPORTED_MODULE_6__["Message"].VALIDATE_ERROR_LINE(i + 2, locale);
        if (!Object(_Option__WEBPACK_IMPORTED_MODULE_3__["Option"])(issue.summary).isDefined)
            return Object(_Either__WEBPACK_IMPORTED_MODULE_4__["Left"])(Error(errorString + _resources__WEBPACK_IMPORTED_MODULE_6__["Message"].VALIDATE_SUMMARY_EMPTY(locale)));
        if (!Object(_Option__WEBPACK_IMPORTED_MODULE_3__["Option"])(issue.issueTypeName).isDefined)
            return Object(_Either__WEBPACK_IMPORTED_MODULE_4__["Left"])(Error(errorString + _resources__WEBPACK_IMPORTED_MODULE_6__["Message"].VALIDATE_ISSUE_TYPE_EMPTY(locale)));
        if (issue.parentIssueKey !== undefined && issue.parentIssueKey !== "*")
            if (!client.getIssueV2(issue.parentIssueKey).isDefined)
                return Object(_Either__WEBPACK_IMPORTED_MODULE_4__["Left"])(Error(errorString + _resources__WEBPACK_IMPORTED_MODULE_6__["Message"].VALIDATE_PARENT_ISSUE_KEY_NOT_FOUND(issue.parentIssueKey, locale)));
    }
    return Object(_Either__WEBPACK_IMPORTED_MODULE_4__["Right"])(true);
};
var getMessage = function (key, ispreadSheetService) {
    return _resources__WEBPACK_IMPORTED_MODULE_6__["Message"].findByKey(key, ispreadSheetService.getUserLocale());
};
var getUserProperties = function (ispreadSheetService) {
    var lastSpace = ispreadSheetService.getUserProperty("space") ? ispreadSheetService.getUserProperty("space") : "";
    var lastDomain = ispreadSheetService.getUserProperty("domain") ? ispreadSheetService.getUserProperty("domain") : ".com";
    var lastApiKey = ispreadSheetService.getUserProperty("apiKey") ? ispreadSheetService.getUserProperty("apiKey") : "";
    var lastProjectKey = ispreadSheetService.getUserProperty("projectKey") ? ispreadSheetService.getUserProperty("projectKey") : "";
    return Object(_datas__WEBPACK_IMPORTED_MODULE_1__["UserProperty"])(lastSpace, lastDomain, lastApiKey, lastProjectKey);
};
var storeUserProperties = function (grid, ispreadSheetService) {
    ispreadSheetService.setUserProperty("space", grid.parameter.space);
    ispreadSheetService.setUserProperty("domain", grid.parameter.domain);
    ispreadSheetService.setUserProperty("apiKey", grid.parameter.apiKey);
    ispreadSheetService.setUserProperty("projectKey", grid.parameter.projectKey);
};
var storeConfig = function (config, propertyService) {
    propertyService.set('url', config.url);
    propertyService.set('space', config.space);
    propertyService.set('domain', config.domain);
    propertyService.set('apiKey', config.apiKey);
    propertyService.set('projectKey', config.projectKey);
    propertyService.set('mailaddress', config.mailaddress);
    propertyService.set('cksendmail', config.cksendmail);
};
var showMessage = function (message, ispreadSheetService) {
    return ispreadSheetService.showMessage(getMessage("scriptName", ispreadSheetService), message);
};
var strLength = function (text) {
    var count = 0;
    for (var i = 0; i < text.length; i++) {
        var n = escape(text.charAt(i));
        if (n.length < 4)
            count += 1;
        else
            count += 2;
    }
    return count;
};
var createIssue = function (client, issue, optParentIssueId) {
    var createIssue = Object(_datas__WEBPACK_IMPORTED_MODULE_1__["Issue"])(0, "", issue.projectId, issue.summary, issue.description, issue.startDate, issue.dueDate, issue.estimatedHours, issue.actualHours, issue.issueType, issue.categories, issue.versions, issue.milestones, issue.priority, issue.assignee, optParentIssueId.map(function (id) { return id.toString(); }), issue.customFields);
    return client.createIssueV2(createIssue);
};
var getTemplateIssuesFromSpreadSheet = function (ispreadSheetService) {
    var issues = [];
    var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadSheet.getSheetByName(TEMPLATE_SHEET_NAME);
    var columnLength = sheet.getLastColumn();
    var values = sheet.getSheetValues(ROW_START_INDEX, COLUMN_START_INDEX, sheet.getLastRow() - 1, columnLength);
    for (var i = 0; i < values.length; i++) {
        var customFields = [];
        var customFieldIndex = 0;
        for (var j = 13; j < columnLength; j++) {
            if (values[i][j] !== "") {
                customFields[customFieldIndex] = {
                    header: ispreadSheetService.getRange(sheet, j + 1, ROW_HEADER_INDEX).getFormula(),
                    value: values[i][j]
                };
                customFieldIndex++;
            }
        }
        var issue = {
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
};
var calcWidth = function (length) {
    var DEFAULT_FONT_SIZE = 10; /** フォントのデフォルトサイズ */
    var ADJUST_WIDTH_FACTOR = 0.75; /** 列幅調整時の係数 */
    return length * DEFAULT_FONT_SIZE * ADJUST_WIDTH_FACTOR;
};
var BacklogService = function (ispreadSheetService) { return ({
    createApplication: function (title, width, height) {
        return UiApp
            .createApplication()
            .setTitle(title)
            .setWidth(width)
            .setHeight(height);
    },
    createGrid: function (ui, property) {
        var anotherDomain = (property.domain === ".com") ? ".jp" : ".com";
        return ui
            .createGrid(3, 4)
            .setWidget(0, 0, ui.createLabel(getMessage("label_spaceId", ispreadSheetService)))
            .setWidget(0, 1, ui.createTextBox().setName("space").setValue(property.space))
            .setWidget(0, 2, ui.createLabel('.backlog'))
            .setWidget(0, 3, ui.createListBox(false).setName("domain").addItem(property.domain).addItem(anotherDomain))
            .setWidget(1, 0, ui.createLabel(getMessage("label_apiKey", ispreadSheetService)))
            .setWidget(1, 1, ui.createTextBox().setName("apiKey").setValue(property.apiKey))
            .setWidget(2, 0, ui.createLabel(getMessage("label_projectKey", ispreadSheetService)))
            .setWidget(2, 1, ui.createTextBox().setName("projectKey").setValue(property.projectKey));
    },
    showDialog: function (ui, grid, handlerName) {
        var panel = ui.createVerticalPanel();
        var submitButton = ui.createButton(getMessage("button_execute", ispreadSheetService));
        var submitHandler = ui.createServerClickHandler(handlerName);
        submitHandler.addCallbackElement(grid);
        submitButton.addClickHandler(submitHandler);
        panel.add(grid).add(submitButton);
        ui.add(panel);
        SpreadsheetApp.getActiveSpreadsheet().show(ui);
    },
    showInitDialog: function () {
        var app = this.createApplication(getMessage("title_init", ispreadSheetService) + " " + SCRIPT_VERSION, 360, 160);
        var property = this.getUserProperties();
        var grid = this.createGrid(app, property);
        this.showDialog(app, grid, "init");
    },
    showRunDialog: function () {
        var app = this.createApplication(getMessage("title_run", ispreadSheetService) + " " + SCRIPT_VERSION, 360, 160);
        var property = this.getUserProperties();
        var grid = this.createGrid(app, property);
        this.showDialog(app, grid, "main");
    },
    showGetDialog: function () {
        var html = HtmlService
            .createTemplateFromFile('index')
            .evaluate();
        SpreadsheetApp
            .getUi()
            .showModalDialog(html, getMessage("title_getIssues", ispreadSheetService));
    },
    getUserProperties: function () {
        return getUserProperties(ispreadSheetService);
    },
    storeUserProperties: function (grid) {
        return storeUserProperties(grid, ispreadSheetService);
    },
    run: function (grid) {
        var app = UiApp.getActiveApplication();
        var property = getUserProperties(ispreadSheetService);
        var current = Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd HH:mm:ss");
        var sheetName = getMessage("scriptName", ispreadSheetService) + " : " + current;
        var LOG_KEY_NUMBER = 1;
        var LOG_SUMMARY_NUMBER = 2;
        var locale = ispreadSheetService.getUserLocale();
        // BacklogScript throws an exception on error
        showMessage(getMessage("progress_collect", ispreadSheetService), ispreadSheetService);
        var templateIssues = getTemplateIssuesFromSpreadSheet(ispreadSheetService);
        storeUserProperties(grid, ispreadSheetService);
        showMessage(_resources__WEBPACK_IMPORTED_MODULE_6__["Message"].PROGRESS_RUN_BEGIN(locale), ispreadSheetService);
        var client = createBacklogClient(property.space, property.domain, property.apiKey, locale).getOrError();
        var _ = validate(templateIssues, client, locale).getOrError();
        var project = getProject(client, property.projectKey, locale).getOrError();
        var converter = createIssueConverter(client, project.id);
        var convertResults = templateIssues.map(function (issue) { return convertIssue(converter, issue); });
        var issues = _Either__WEBPACK_IMPORTED_MODULE_4__["Either"].sequence(convertResults).getOrError();
        // Post issues
        var previousIssue = Object(_Option__WEBPACK_IMPORTED_MODULE_3__["Option"])(null);
        var keyLength = DEFAULT_COLUMN_LENGTH;
        var summaryLength = DEFAULT_COLUMN_LENGTH;
        var _loop_1 = function (i) {
            var isTakenOverParentIssueId = false;
            var optParentIssueId = issues[i].parentIssueId;
            optParentIssueId.map(function (parentIssueId) {
                if (parentIssueId === "*") {
                    if (previousIssue.flatMap(function (issue) { return issue.parentIssueId; }).isDefined) {
                        previousIssue.map(function (issue) { return showMessage(_resources__WEBPACK_IMPORTED_MODULE_6__["Message"].ALREADY_BEEN_CHILD_ISSUE(issue.issueKey, locale), ispreadSheetService); });
                        optParentIssueId = Object(_Option__WEBPACK_IMPORTED_MODULE_3__["None"])();
                    }
                    else {
                        optParentIssueId = previousIssue.map(function (issue) { return issue.id.toString(); });
                        isTakenOverParentIssueId = true;
                    }
                }
                else {
                    optParentIssueId = client.getIssueV2(parentIssueId).map(function (issue) { return issue.id; });
                }
            });
            createIssue(client, issues[i], optParentIssueId.map(function (id) { return id; })).map(function (issue) {
                if (!isTakenOverParentIssueId) {
                    previousIssue = Object(_Option__WEBPACK_IMPORTED_MODULE_3__["Some"])(issue);
                }
                var logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
                var issueKey = issue.issueKey;
                var summary = issue.summary;
                var fomula = '=hyperlink("' + property.space + ".backlog" + property.domain + "/" + "view/" + issueKey + '";"' + issueKey + '")';
                var currentRow = i + 1;
                if (logSheet == null)
                    logSheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName, 1);
                keyLength = Math.max(keyLength, strLength(issueKey));
                summaryLength = Math.max(summaryLength, strLength(summary));
                var keyWidth = calcWidth(keyLength);
                var summaryWidth = calcWidth(summaryLength);
                var keyCell = ispreadSheetService.getRange(logSheet, LOG_KEY_NUMBER, currentRow);
                var summaryCell = ispreadSheetService.getRange(logSheet, LOG_SUMMARY_NUMBER, currentRow);
                keyCell.setFormula(fomula).setFontColor("blue").setFontLine("underline");
                summaryCell.setValue(summary);
                ispreadSheetService.setColumnWidth(logSheet, LOG_KEY_NUMBER, keyWidth);
                ispreadSheetService.setColumnWidth(logSheet, LOG_SUMMARY_NUMBER, summaryWidth);
                SpreadsheetApp.flush();
            }).getOrError();
        };
        for (var i = 0; i < issues.length; i++) {
            _loop_1(i);
        }
        showMessage(getMessage("scriptName", ispreadSheetService) + getMessage("progress_end", ispreadSheetService), ispreadSheetService);
        return app.close();
    },
    getConfig: function () {
        var propertyService = Object(_UserPropertyService__WEBPACK_IMPORTED_MODULE_7__["UserPropertyServiceImpl"])();
        return propertyService.getConfigFromProperty(propertyService);
    },
    getIssuList: function (config) {
        var propertyService = Object(_UserPropertyService__WEBPACK_IMPORTED_MODULE_7__["UserPropertyServiceImpl"])();
        storeConfig(config, propertyService);
        var property = getUserProperties(ispreadSheetService);
        var locale = ispreadSheetService.getUserLocale();
        var client = createBacklogClient(config.space, config.domain, config.apiKey, locale).getOrError();
        var project = getProject(client, config.projectKey, locale).getOrError();
        var converter = createIssueConverter(client, project.id);
        var issulist = getIssuList(client, project.id, locale);
        var commentlist = getCommentList(client, project.id, issulist, locale);
        var frombacklog = Object(_FromBacklog__WEBPACK_IMPORTED_MODULE_8__["FromBacklog"])();
        frombacklog.toSpreadSheet(issulist, commentlist, config);
        return "success";
    },
    getCommentList: function (config) {
        var propertyService = Object(_UserPropertyService__WEBPACK_IMPORTED_MODULE_7__["UserPropertyServiceImpl"])();
        storeConfig(config, propertyService);
        var property = getUserProperties(ispreadSheetService);
        var locale = ispreadSheetService.getUserLocale();
        var client = createBacklogClient(config.space, config.domain, config.apiKey, locale).getOrError();
        var project = getProject(client, config.projectKey, locale).getOrError();
        var converter = createIssueConverter(client, project.id);
        var issulist = getIssuList(client, project.id, locale);
        var commentlist = getCommentList(client, project.id, issulist, locale);
        var frombacklog = Object(_FromBacklog__WEBPACK_IMPORTED_MODULE_8__["FromBacklog"])();
        frombacklog.toSpreadSheet(issulist, commentlist, config);
        return "success";
    },
    getDefinitions: function (grid) {
        storeUserProperties(grid, ispreadSheetService);
        var app = UiApp.getActiveApplication();
        var property = getUserProperties(ispreadSheetService);
        var locale = ispreadSheetService.getUserLocale();
        showMessage(_resources__WEBPACK_IMPORTED_MODULE_6__["Message"].PROGRESS_INIT_BEGIN(locale), ispreadSheetService);
        return createBacklogClient(property.space, property.domain, property.apiKey, locale)
            .flatMap(function (client) {
            return getProject(client, property.projectKey, locale).map(function (project) {
                return Object(_datas__WEBPACK_IMPORTED_MODULE_1__["BacklogDefinition"])(client.getIssueTypesV2(project.id), client.getCategoriesV2(project.id), client.getVersionsV2(project.id), client.getPrioritiesV2(), client.getUsersV2(project.id), client.getCustomFieldsV2(project.id));
            });
        })
            .map(function (definition) {
            var templateSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(TEMPLATE_SHEET_NAME);
            var issueTypeRule = SpreadsheetApp.newDataValidation().requireValueInList(definition.issueTypeNames(), true).build();
            var categoryRule = SpreadsheetApp.newDataValidation().requireValueInList(definition.categoryNames(), true).build();
            var versionRule = SpreadsheetApp.newDataValidation().requireValueInList(definition.versionNames(), true).build();
            var priorityRule = SpreadsheetApp.newDataValidation().requireValueInList(definition.priorityNames(), true).build();
            var userRule = SpreadsheetApp.newDataValidation().requireValueInList(definition.userNames(), true).build();
            var lastRowNumber = templateSheet.getLastRow() - 1;
            var customFieldStartColumnNumber = 14; // N ~
            var currentColumnNumber = customFieldStartColumnNumber;
            templateSheet.getRange(2, 7, lastRowNumber).setDataValidation(issueTypeRule); // 7 = G
            templateSheet.getRange(2, 8, lastRowNumber).setDataValidation(categoryRule); // 8 = H
            templateSheet.getRange(2, 9, lastRowNumber).setDataValidation(versionRule); // 9 = I
            templateSheet.getRange(2, 10, lastRowNumber).setDataValidation(versionRule); // 10 = J
            templateSheet.getRange(2, 11, lastRowNumber).setDataValidation(priorityRule); // 11 = K
            templateSheet.getRange(2, 12, lastRowNumber).setDataValidation(userRule); // 12 = L
            for (var i = 0; i < definition.customFields.length; i++) {
                var customField = definition.customFields[i];
                var headerCell = ispreadSheetService.getRange(templateSheet, currentColumnNumber, ROW_HEADER_INDEX);
                var columnName = headerCell.getValue();
                /**
                 * https://github.com/nulab/backlog4j/blob/master/src/main/java/com/nulabinc/backlog4j/CustomField.java#L10
                 * Text(1), TextArea(2), Numeric(3), Date(4), SingleList(5), MultipleList(6), CheckBox(7), Radio(8)
                 * We don't support the types MultipleList(6) and CheckBox(7), Radio(8)
                 */
                var customFieldName = "";
                if (customField.typeId >= 6)
                    continue;
                switch (customField.typeId) {
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
                var headerName = customField.name + '（' + customFieldName + '）';
                if (columnName === "") {
                    var headerStrLength = strLength(headerName);
                    var headerWidth = calcWidth(headerStrLength);
                    templateSheet.insertColumnAfter(currentColumnNumber - 1);
                    templateSheet
                        .getRange(1, currentColumnNumber, templateSheet.getLastRow(), 1)
                        .setBackground("#F8FFFF")
                        .setFontColor("black");
                    ispreadSheetService.setColumnWidth(templateSheet, currentColumnNumber, headerWidth);
                }
                headerCell.setFormula('=hyperlink("' + property.space + ".backlog" + property.domain + "/EditAttribute.action?attribute.id=" + customField.id + '";"' + headerName + '")');
                currentColumnNumber++;
            }
            showMessage(getMessage("complete_init", ispreadSheetService), ispreadSheetService);
            return app.close();
        })
            .getOrError();
    },
    getMessage: function (key) {
        return getMessage(key, ispreadSheetService);
    },
    showMessage: function (message) {
        return showMessage(message, ispreadSheetService);
    }
}); };


/***/ }),

/***/ "./src/CONST.ts":
/*!**********************!*\
  !*** ./src/CONST.ts ***!
  \**********************/
/*! exports provided: CONST */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONST", function() { return CONST; });
/** CONST */
var CONST;
(function (CONST) {
    CONST.STARTROW = 4;
    CONST.Field_id = 'id';
    CONST.Field_projectKey = 'projectKey';
    CONST.Field_projectId = 'projectId';
    CONST.Field_parentIssueId = 'parentIssueId';
    CONST.Field_issueKey = 'issueKey';
    CONST.Field_status = 'status';
    CONST.Field_createdUser = 'createdUser';
    CONST.Field_created = 'created';
    CONST.Field_summary = 'summary';
    CONST.Field_priority = 'priority';
    CONST.Field_startDate = 'startDate';
    CONST.Field_assignee = 'assignee';
    CONST.Field_description = 'description';
    CONST.Field_customFields = 'customFields';
    CONST.Field_content = 'content';
    CONST.ExcelField_課題番号 = '課題番号';
    CONST.ExcelField_課題キー = '課題キー';
    CONST.ExcelField_状態 = '状態';
    CONST.ExcelField_発生日 = '発生日';
    CONST.ExcelField_起票者 = '起票者';
    CONST.ExcelField_発生場所_機能 = '発生場所・機能';
    CONST.ExcelField_内容 = '内容';
    CONST.ExcelField_優先度 = '優先度';
    CONST.ExcelField_回答日 = '回答日';
    CONST.ExcelField_回答者 = '回答者';
    CONST.ExcelField_原因_回答_補足 = '原因・回答・補足';
    CONST.ExcelField_対策_補足 = '対策・補足';
    CONST.ExcelField_リリース = 'リリース';
    CONST.FORMAT_DATE = 1;
    CONST.FORMAT_NAME = 2;
    CONST.FORMAT_NOTARRAY = 0;
    CONST.FORMAT_ARRAY = 1;
    CONST.cField_発生日 = '発生日';
    CONST.cField_リリース日 = 'リリース日';
    CONST.cField_お客様起票者名 = 'お客様起票者名';
    CONST.cField_お客様担当者名 = 'お客様担当者名';
    CONST.cField_機能名 = '機能名';
    CONST.HEADERSTARTROW = 2;
    CONST.HEADERSTARTCOL = 1;
    CONST.HEADERTOTALROWCOUNT = 2;
    CONST.HEADERTOTALCOLCOUNT = 20;
    //undefined
})(CONST || (CONST = {}));


/***/ }),

/***/ "./src/Either.ts":
/*!***********************!*\
  !*** ./src/Either.ts ***!
  \***********************/
/*! exports provided: Right, Left, Either */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Right", function() { return Right; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Left", function() { return Left; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Either", function() { return Either; });
/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Option */ "./src/Option.ts");

var Right = function (value) {
    var self = {
        flatMap: function (f) { return f(value); },
        map: function (f) { return self.flatMap(function (x) { return Right(f(x)); }); },
        recover: function (f) { return self; },
        getOrElse: function (defaultVal) { return value; },
        forEach: function (f) { return f(value); },
        isLeft: false,
        isRight: true,
        right: function () { return Object(_Option__WEBPACK_IMPORTED_MODULE_0__["Some"])(value); },
        left: function () { return Object(_Option__WEBPACK_IMPORTED_MODULE_0__["None"])(); },
        getOrError: function () { return value; }
    };
    return self;
};
var Left = function (value) {
    var self = {
        flatMap: function (f) { return self; },
        map: function (f) { return self; },
        recover: function (f) { return f(value); },
        getOrElse: function (defaultVal) { return defaultVal(); },
        forEach: function (f) { },
        isLeft: true,
        isRight: false,
        right: function () { return Object(_Option__WEBPACK_IMPORTED_MODULE_0__["None"])(); },
        left: function () { return Object(_Option__WEBPACK_IMPORTED_MODULE_0__["Some"])(value); },
        getOrError: function () { throw value; }
    };
    return self;
};
var Either = {
    sequence: function (eithers) {
        var i = 0;
        var length = eithers.length;
        var items = [];
        while (i < length) {
            var item = eithers[i];
            if (item.isLeft)
                return item;
            item.forEach(function (v) { return items = items.concat([v]); });
            i++;
        }
        return Right(items);
    },
    run: function (gen) {
        var lastValue;
        while (true) {
            var result = gen.next(lastValue);
            if (result.done || result.value.isLeft) {
                return result.value;
            }
            lastValue = result.value.getOrError(); // If Left then throw an exception
        }
    },
    map4: function (a, b, c, d, f) {
        return Either.map3(a, b, c, function (va, vb, vc) {
            return d.flatMap(function (vd) { return f(va, vb, vc, vd); });
        });
    },
    map5: function (a, b, c, d, f, g) {
        return Either.map4(a, b, c, d, function (va, vb, vc, vd) {
            return f.flatMap(function (vf) { return g(va, vb, vc, vd, vf); });
        });
    },
    map2: function (a, b, f) {
        return a.flatMap(function (va) {
            return b.flatMap(function (vb) {
                return f(va, vb);
            });
        });
    },
    map3: function (a, b, c, f) {
        return Either.map2(a, b, function (va, vb) {
            return c.flatMap(function (vc) { return f(va, vb, vc); });
        });
    },
    map6: function (a, b, c, d, f, g, h) {
        return Either.map5(a, b, c, d, f, function (va, vb, vc, vd, vf) {
            return g.flatMap(function (vg) { return h(va, vb, vc, vd, vf, vg); });
        });
    },
    map7: function (a, b, c, d, f, g, h, j) {
        return Either.map6(a, b, c, d, f, g, function (va, vb, vc, vd, vf, vg) {
            return h.flatMap(function (vh) { return j(va, vb, vc, vd, vf, vg, vh); });
        });
    },
    sequenceOption: function (opt) {
        return opt.map(function (item) {
            return item.map(function (value) { return Object(_Option__WEBPACK_IMPORTED_MODULE_0__["Some"])(value); });
        }).getOrElse(function () { return Right(Object(_Option__WEBPACK_IMPORTED_MODULE_0__["None"])()); });
    }
};


/***/ }),

/***/ "./src/FromBacklog.ts":
/*!****************************!*\
  !*** ./src/FromBacklog.ts ***!
  \****************************/
/*! exports provided: FromBacklog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FromBacklog", function() { return FromBacklog; });
/* harmony import */ var _CONST__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CONST */ "./src/CONST.ts");
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./messages */ "./src/messages.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./グローバル変数 */ "./src/グローバル変数.ts");



var FromBacklog = function () { return ({
    toSpreadSheet: function (issue_list, comment_list, config) {
        CreateIssueFromComment(issue_list, comment_list);
        CreateParentArray(issue_list);
        issue_list.sort(compare);
        // 一旦、シートをクリアにする
        ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].target_sheet
            .getRange(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].STARTROW, _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].HEADERSTARTCOL, ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].spread_sheet.getLastRow(), _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].HEADERTOTALCOLCOUNT)
            .clearContent();
        var totalCount = issue_list.count;
        var row = _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].STARTROW;
        for (var cnt in issue_list) {
            if (issue_list[cnt][_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_parentIssueId] === null) {
                ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].flgChild = false;
            }
            else {
                ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].flgChild = true;
            }
            for (var itemName in issue_list[cnt]) {
                if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_customFields) {
                    var obj = issue_list[cnt][itemName];
                    for (var exCnt in obj)
                        if (obj[exCnt].name === '') {
                        }
                        else {
                            var value = getValuecustomFields(issue_list, cnt, exCnt, obj[exCnt].name);
                            var col = getColcustomFields(issue_list, cnt, obj[exCnt].name);
                            if (0 < col && value !== '' && value !== undefined) {
                                ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].target_sheet.getRange(row, col).setValue(value);
                            }
                        }
                }
                else {
                    var value = getValue(issue_list, cnt, itemName);
                    var col = getCol(itemName);
                }
                if (0 < col && value !== '') {
                    ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].target_sheet.getRange(row, col).setValue(value);
                }
            }
            row++;
        }
        Browser.msgBox(_messages__WEBPACK_IMPORTED_MODULE_1__["messages"].common.end);
        // if (config.cksendmail === ""){
        //   sendMail(config)
        // }
    }
}); };
function sendMail(config) {
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
    var fileName = ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].target_sheet_name;
    var xlsxName = fileName + "_" + nowDate + ".xlsx";
    var key = ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].spread_sheet.getId();
    fetchUrl = "https://docs.google.com/feeds/download/spreadsheets/Export?key=" +
        key + "&amp;exportFormat=xlsx";
    attachmentFiles.push(UrlFetchApp.fetch(fetchUrl, fetchOpt).getBlob().setName(xlsxName));
    // メール関係
    var mailto = config.mailaddress;
    var subject = "[GoogleDrive]定期バックアップ(" + Utilities.formatDate(new Date(), 'JST', 'yyyy/MM/dd') + ")";
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
    }
    else {
        return true;
    }
}
//itemNameによってColを指定する
function getCol(itemName) {
    switch (itemName) {
        case _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_parentIssueId:
            if (___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].flgChild === false) {
                return getColCommon(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_課題番号);
            }
            else {
                break;
            }
        case _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_issueKey:
            return getColCommon(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_課題キー);
        case _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_status:
            return getColCommon(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_状態);
        case _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_createdUser:
            return getColCommon(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_起票者);
        case _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_summary:
            return getColCommon(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_内容);
        case _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_priority:
            return getColCommon(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_優先度);
        case _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_startDate:
            return getColCommon(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_回答日);
        case _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_assignee:
            return getColCommon(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_回答者);
        case _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_description:
            if (___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].flgChild === false) {
                return getColCommon(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_原因_回答_補足);
            }
            else {
                return getColCommon(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_対策_補足);
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
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_priority) {
        if (obj.id === '2') {
            return '高';
        }
        else if (obj.id === '3') {
            return '中';
        }
        else {
            return '低';
        }
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_status) {
        return issue_list[cnt][itemName].name;
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_parentIssueId) {
        if (issue_list[cnt][itemName] === null) {
            return issue_list[cnt][_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_id];
        }
        else {
            return issue_list[cnt][itemName];
        }
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_assignee) {
        if (issue_list[cnt][itemName] === null) {
            return '';
        }
        else {
            return issue_list[cnt][itemName].name.split(' ')[0].split('　')[0];
        }
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_startDate) {
        if (issue_list[cnt][itemName] === null) {
            return '';
        }
        else {
            return dateFormat(issue_list[cnt][itemName]);
        }
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_createdUser) {
        return getValuecreatedUser(issue_list, cnt, itemName)
            .split(' ')[0]
            .split('　')[0];
    }
    else {
        return issue_list[cnt][itemName];
    }
}
//objによってColを指定する(customFields)
function getColcustomFields(issue_list, cnt, itemName) {
    if (itemName === '') {
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].cField_発生日) {
        return getCol(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_発生日);
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].cField_お客様起票者名) {
        return getCol(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_起票者);
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].cField_お客様担当者名) {
        return getCol(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_回答者);
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].cField_機能名) {
        return getCol(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_発生場所_機能);
    }
    else {
        return 0;
    }
}
//objによってvalueを指定する(customFields)
function getValuecustomFields(issue_list, cnt, exCnt, itemName) {
    var obj = issue_list[cnt][_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_customFields];
    if (itemName === '') {
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].cField_発生日) {
        ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].発生日Index = exCnt; //★TODO いまいち
        return getValuecustomFieldsEx(obj, exCnt, _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].FORMAT_DATE);
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].cField_リリース日) {
        return getValuecustomFieldsEx(obj, exCnt, _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].FORMAT_DATE);
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].cField_お客様起票者名) {
        return getValuecustomFieldsEx(obj, exCnt, _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].FORMAT_NAME);
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].cField_お客様担当者名) {
        return getValuecustomFieldsEx(obj, exCnt, _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].FORMAT_NAME);
    }
    else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].cField_機能名) {
        return getValuecustomFieldsEx(obj, exCnt, _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].FORMAT_NAME);
    }
    else {
        return '';
    }
}
//customFieldsの値取得が煩雑なので纏める
// var obj = issue_list[cnt][itemName]
function getValuecustomFieldsEx(obj, exCnt, type) {
    var custom;
    if (obj[exCnt].value === null) {
        return '';
    }
    if (obj[exCnt] instanceof Array === false) {
        custom = obj[exCnt].value;
    }
    else {
        custom = obj[exCnt].value[0];
    }
    if (custom === undefined) {
        return '';
    }
    else if (custom === '') {
    }
    else {
        if (type === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].FORMAT_DATE) {
            return dateFormat(custom);
        }
        else if (type === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].FORMAT_NAME) {
            if (custom instanceof Array === false) {
                return custom.name;
            }
            else {
                return custom[0].name;
            }
        }
        else {
        }
    }
}
//objによってvalueを指定する(createdUser)
function getValuecreatedUser(issue_list, cnt, itemName) {
    var createdUser = issue_list[cnt][itemName];
    var name = createdUser.name;
    if (name === '') {
    }
    else {
        return name;
    }
}
//
function dateFormat(strDate) {
    return Utilities.formatDate(new Date(strDate), 'JST', 'yyyy/M/dd');
}
// コメントをIssueとして追加する
function CreateIssueFromComment(issue_list, comment_list) {
    var IssueKeyValueList = {};
    for (var id in issue_list) {
        var issueidkey = setissuekeyvalue(id, issue_list);
        IssueKeyValueList[issueidkey.key] = issueidkey;
    }
    for (var cntcomment in comment_list) {
        var issue = issue_list[IssueKeyValueList[comment_list[cntcomment].issueKey].id];
        var copiedissue = JSON.parse(JSON.stringify(issue));
        copiedissue.issueKey = "";
        //      copiedissue.status.name = ""
        copiedissue.summary = "";
        copiedissue.content = "";
        copiedissue.startDate = comment_list[cntcomment][_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_created];
        copiedissue.description = comment_list[cntcomment][_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_content];
        issue_list.push(copiedissue);
    }
}
function setissuekeyvalue(id, issue_list) {
    return ({ id: id, key: issue_list[id].issueKey });
}
;
// parentID配列を作成する
function CreateParentArray(issue_list) {
    for (var cnt in issue_list) {
        if (issue_list[cnt][_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_parentIssueId] === null) {
            ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].parentArray[issue_list[cnt][_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_id]] = issue_list[cnt][_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].Field_customFields][___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].発生日Index].value;
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
        var p発生日A = a.customFields[___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].発生日Index].value;
    }
    else {
        var pIsdA = ('0000' + a.parentIssueId).slice(-10);
        var p発生日A = ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].parentArray[a.parentIssueId];
    }
    if (b.parentIssueId === null) {
        var pIsdB = pIdB;
        var p発生日B = b.customFields[___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].発生日Index].value;
    }
    else {
        var pIsdB = ('0000' + b.parentIssueId).slice(-10);
        var p発生日B = ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].parentArray[b.parentIssueId];
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
    }
    else if (p発生日B + pIsdB + pIdB < p発生日A + pIsdA + pIdA) {
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
    var LastCol = ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].target_sheet.getLastColumn();
    var dat = ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].target_sheet
        .getRange(_CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].HEADERSTARTROW, _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].HEADERSTARTCOL, _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].HEADERTOTALROWCOUNT, LastCol - 1)
        .getValues();
    for (var cnt = 0; cnt < dat.length; cnt++) {
        for (var col = _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].HEADERSTARTCOL; col < dat[cnt].length; col++) {
            var itemName = dat[cnt][col - 1];
            if (itemName === '') {
            }
            else if (itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_課題番号 ||
                itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_課題キー ||
                itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_状態 ||
                itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_発生日 ||
                itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_起票者 ||
                itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_発生場所_機能 ||
                itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_内容 ||
                itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_優先度 ||
                itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_回答日 ||
                itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_回答者 ||
                itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_原因_回答_補足 ||
                itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_対策_補足 ||
                itemName === _CONST__WEBPACK_IMPORTED_MODULE_0__["CONST"].ExcelField_リリース) {
                colArray.splice(dat[cnt].indexOf(itemName) + 1, 1); // 一つ削除
                colArray.splice(dat[cnt].indexOf(itemName) + 1, 0, itemName); // 挿入
            }
        }
    }
}
// 項目に対応するColを取得・返還する
function getColCommon(itemName) {
    if (___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].colArray.length === 0) {
        setCol(___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].colArray);
    }
    if (0 < ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].colArray.indexOf(itemName)) {
        return ___WEBPACK_IMPORTED_MODULE_2__["グローバル変数"].colArray.indexOf(itemName);
    }
}


/***/ }),

/***/ "./src/Http.ts":
/*!*********************!*\
  !*** ./src/Http.ts ***!
  \*********************/
/*! exports provided: HttpClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HttpClient", function() { return HttpClient; });
var HttpClient = /** @class */ (function () {
    function HttpClient() {
    }
    HttpClient.prototype.get = function (uri) {
        var httpResponse = this.doRequest(uri);
        return this.toJson(httpResponse);
    };
    HttpClient.prototype.post = function (uri, data) {
        var options = {
            method: "post",
            payload: data
        };
        var httpResponse = this.doRequest(uri, options);
        return this.toJson(httpResponse);
    };
    HttpClient.prototype.doRequest = function (uri, options) {
        if (options == null)
            return UrlFetchApp.fetch(uri);
        else
            return UrlFetchApp.fetch(uri, options);
    };
    HttpClient.prototype.toJson = function (response) {
        return JSON.parse(response.getContentText());
    };
    return HttpClient;
}());



/***/ }),

/***/ "./src/IssueConverter.ts":
/*!*******************************!*\
  !*** ./src/IssueConverter.ts ***!
  \*******************************/
/*! exports provided: extractFromString, IssueConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractFromString", function() { return extractFromString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IssueConverter", function() { return IssueConverter; });
/* harmony import */ var _Either__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Either */ "./src/Either.ts");
/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Option */ "./src/Option.ts");
/* harmony import */ var _datas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./datas */ "./src/datas.ts");
/* harmony import */ var _List__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./List */ "./src/List.ts");




var isEmpty = function (str) {
    return str === "" ? true : false;
};
// "itemA\n\nitemB" => ["itemA", "itemB"]
var lines = function (str) {
    return str.split("\n").filter(function (item) { return !isEmpty(item); }).map(function (s) { return s.trim(); });
};
var withId = function (id) {
    return function (item) { return item.id === id; };
};
var withName = function (name) {
    return function (item) { return item.name === name; };
};
var findWithId = function (id, items) {
    return Object(_List__WEBPACK_IMPORTED_MODULE_3__["find"])(withId(id), items);
};
var findWithName = function (name, items) {
    return Object(_List__WEBPACK_IMPORTED_MODULE_3__["find"])(withName(name), items);
};
var extractFromString = function (str) {
    var match = str.match(/.*?attribute.id=(\d+?)"/);
    var result = Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(match);
    return result.map(function (results) { return +results[1]; });
};
var IssueConverter = function (projectId, issueTypes, categories, versions, priorities, users, customFieldDefinitions) { return ({
    convert: function (issue) {
        var foundCategories = _Either__WEBPACK_IMPORTED_MODULE_0__["Either"].sequence(lines(issue["categoryNames"]).map(function (item) { return findWithName(item, categories).orError(Error("Cateogry not found. name: " + item)); }));
        var foundVersions = _Either__WEBPACK_IMPORTED_MODULE_0__["Either"].sequence(lines(issue["versionNames"]).map(function (item) { return findWithName(item, versions).orError(Error("Version not found. name: " + item)); }));
        var foundMilestones = _Either__WEBPACK_IMPORTED_MODULE_0__["Either"].sequence(lines(issue["milestoneNames"]).map(function (item) { return findWithName(item, versions).orError(Error("Milestone not found. name: " + item)); }));
        var foundIssueType = findWithName(issue["issueTypeName"], issueTypes)
            .orError(Error("IssueType not found. name: " + issue["issueTypeName"]));
        var foundPriority = Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(issue["priorityName"])
            .map(function (name) { return findWithName(name, priorities)
            .orError(Error("Priority not found. name: " + issue["priorityName"])); })
            .getOrElse(function () { return Object(_Either__WEBPACK_IMPORTED_MODULE_0__["Right"])(Object(_datas__WEBPACK_IMPORTED_MODULE_2__["Priority"])(3, "default")); });
        var foundOptUser = _Either__WEBPACK_IMPORTED_MODULE_0__["Either"].sequenceOption(Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(issue["assigneeName"])
            .map(function (item) { return findWithName(item, users).orError(new Error("Assignee not found. name: " + item)); }));
        var foundCustomFields = _Either__WEBPACK_IMPORTED_MODULE_0__["Either"].sequence(issue["customFields"].map(function (item) {
            return extractFromString(item.header)
                .orError(Error("Invalid custom field header. Raw input: " + item))
                .flatMap(function (customFieldId) {
                return findWithId(customFieldId, customFieldDefinitions)
                    .orError(Error("Custom field definition not found. id: " + customFieldId))
                    .map(function (definition) { return Object(_datas__WEBPACK_IMPORTED_MODULE_2__["CustomField"])(customFieldId, definition.typeId, item.value); });
            });
        }));
        return _Either__WEBPACK_IMPORTED_MODULE_0__["Either"].map7(foundCategories, foundVersions, foundMilestones, foundIssueType, foundPriority, foundOptUser, foundCustomFields, function (categories, versions, milestones, issueType, priority, optUser, customFields) {
            return Object(_Either__WEBPACK_IMPORTED_MODULE_0__["Right"])(Object(_datas__WEBPACK_IMPORTED_MODULE_2__["Issue"])(undefined, "", projectId, issue["summary"], Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(issue["description"]), Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(issue["startDate"]).map(function (item) { return new Date(item); }), Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(issue["dueDate"]).map(function (item) { return new Date(item); }), Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(issue["estimatedHours"]).map(function (item) { return +item; }), Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(issue["actualHours"]).map(function (item) { return +item; }), issueType, categories, versions, milestones, priority, optUser, Object(_Option__WEBPACK_IMPORTED_MODULE_1__["Option"])(issue["parentIssueKey"]), customFields));
        });
    }
}); };


/***/ }),

/***/ "./src/List.ts":
/*!*********************!*\
  !*** ./src/List.ts ***!
  \*********************/
/*! exports provided: find */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "find", function() { return find; });
/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Option */ "./src/Option.ts");

var find = function (predicate, list) {
    var i = 0;
    var length = list.length;
    var found = null;
    while (i < length) {
        if (predicate(list[i]))
            return Object(_Option__WEBPACK_IMPORTED_MODULE_0__["Some"])(list[i]);
        i++;
    }
    return Object(_Option__WEBPACK_IMPORTED_MODULE_0__["None"])();
};


/***/ }),

/***/ "./src/Option.ts":
/*!***********************!*\
  !*** ./src/Option.ts ***!
  \***********************/
/*! exports provided: Some, None, Option */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Some", function() { return Some; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "None", function() { return None; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Option", function() { return Option; });
/* harmony import */ var _Either__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Either */ "./src/Either.ts");

var Some = function (value) {
    var self = {
        flatMap: function (f) {
            return f(value);
        },
        map: function (f) {
            return Some(f(value));
        },
        getOrElse: function (defaultVal) {
            return value;
        },
        isDefined: true,
        orError: function (_) { return Object(_Either__WEBPACK_IMPORTED_MODULE_0__["Right"])(value); },
        equals: function (a) { return a.isDefined && a.getOrElse(function () { throw Error("It never happens"); }) === value; }
    };
    return self;
};
var None = function () {
    var self = {
        flatMap: function (f) {
            return None();
        },
        map: function (f) {
            return None();
        },
        getOrElse: function (defaultVal) {
            return defaultVal();
        },
        isDefined: false,
        orError: function (error) { return Object(_Either__WEBPACK_IMPORTED_MODULE_0__["Left"])(error); },
        equals: function (a) { return !a.isDefined; }
    };
    return self;
};
var Option = function (val) {
    if (val != null)
        return Some(val);
    return None();
};


/***/ }),

/***/ "./src/SpreadSheetService.ts":
/*!***********************************!*\
  !*** ./src/SpreadSheetService.ts ***!
  \***********************************/
/*! exports provided: SpreadSheetServiceImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpreadSheetServiceImpl", function() { return SpreadSheetServiceImpl; });
var SpreadSheetServiceImpl = /** @class */ (function () {
    function SpreadSheetServiceImpl() {
    }
    SpreadSheetServiceImpl.prototype.getUserLocale = function () {
        switch (Session.getActiveUserLocale()) {
            case "ja":
                return "ja";
            default:
                return "en";
        }
    };
    SpreadSheetServiceImpl.prototype.getUserProperty = function (key) {
        return PropertiesService.getUserProperties().getProperty("bti." + key);
    };
    SpreadSheetServiceImpl.prototype.setUserProperty = function (key, value) {
        PropertiesService.getUserProperties().setProperty("bti." + key, value);
    };
    SpreadSheetServiceImpl.prototype.getRange = function (sheet, column, row) {
        return sheet.getRange(row, column);
    };
    SpreadSheetServiceImpl.prototype.setColumnWidth = function (sheet, column, width) {
        sheet.setColumnWidth(column, width);
    };
    SpreadSheetServiceImpl.prototype.showMessage = function (title, message) {
        SpreadsheetApp.getActiveSpreadsheet().toast(message, title);
    };
    return SpreadSheetServiceImpl;
}());



/***/ }),

/***/ "./src/UserPropertyService.ts":
/*!************************************!*\
  !*** ./src/UserPropertyService.ts ***!
  \************************************/
/*! exports provided: UserPropertyServiceImpl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserPropertyServiceImpl", function() { return UserPropertyServiceImpl; });
var UserPropertyServiceImpl = function () { return ({
    get: function (key) {
        return PropertiesService.getUserProperties().getProperty(key);
    },
    set: function (key, value) {
        return PropertiesService.getUserProperties().setProperty(key, value);
    },
    getConfigFromProperty: function (propertyService) {
        return Config(propertyService.get('url'), propertyService.get('space'), propertyService.get('domain'), propertyService.get('apiKey'), propertyService.get('projectKey'), propertyService.get('mailaddress'), propertyService.get('cksendmail'));
    },
    storeConfig: function (config, propertyService) {
        return void (propertyService.set('url', config.url),
            propertyService.set('space', config.space),
            propertyService.set('domain', config.domain),
            propertyService.set('apiKey', config.apiKey),
            propertyService.set('projectKey', config.projectKey),
            propertyService.set('mailaddress', config.mailaddress),
            propertyService.set('cksendmail', config.cksendmail));
    }
}); };
var Config = function (url, space, domain, apiKey, projectKey, mailaddress, cksendmail) {
    return ({ url: url, space: space, domain: domain, apiKey: apiKey, projectKey: projectKey, mailaddress: mailaddress, cksendmail: cksendmail });
};


/***/ }),

/***/ "./src/datas.ts":
/*!**********************!*\
  !*** ./src/datas.ts ***!
  \**********************/
/*! exports provided: Project, Issue, User, IssueType, Category, Version, Priority, CustomFieldDefinition, CustomField, BacklogDefinition, UserProperty, notNull, isEmpty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Project", function() { return Project; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Issue", function() { return Issue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "User", function() { return User; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IssueType", function() { return IssueType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Category", function() { return Category; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Version", function() { return Version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Priority", function() { return Priority; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomFieldDefinition", function() { return CustomFieldDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomField", function() { return CustomField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BacklogDefinition", function() { return BacklogDefinition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserProperty", function() { return UserProperty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notNull", function() { return notNull; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
var Project = function (id, projectKey) { return ({ id: id, projectKey: projectKey }); };
var Issue = function (id, issueKey, projectId, summary, description, startDate, dueDate, estimatedHours, actualHours, issueType, categories, versions, milestones, priority, assignee, parentIssueId, customFields) { return ({
    id: id, issueKey: issueKey, projectId: projectId, summary: summary, description: description,
    startDate: startDate, dueDate: dueDate, estimatedHours: estimatedHours, actualHours: actualHours,
    issueType: issueType, categories: categories, versions: versions, milestones: milestones,
    priority: priority, assignee: assignee, parentIssueId: parentIssueId, customFields: customFields
}); };
var User = function (id, name) { return ({ id: id, name: name }); };
var IssueType = function (id, name) { return ({ id: id, name: name }); };
var Category = function (id, name) { return ({ id: id, name: name }); };
var Version = function (id, name) { return ({ id: id, name: name }); };
var Priority = function (id, name) { return ({ id: id, name: name }); };
var CustomFieldDefinition = function (id, typeId, name) { return ({ id: id, typeId: typeId, name: name }); };
var CustomField = function (id, fieldTypeId, value) { return ({ id: id, fieldTypeId: fieldTypeId, value: value }); };
var BacklogDefinition = function (issueTypes, categories, versions, priorities, users, customFields) { return ({
    issueTypes: issueTypes, categories: categories, versions: versions, priorities: priorities, users: users, customFields: customFields,
    issueTypeNames: function () { return issueTypes.map(function (item) { return item.name; }); },
    categoryNames: function () { return categories.map(function (item) { return item.name; }); },
    versionNames: function () { return versions.map(function (item) { return item.name; }); },
    priorityNames: function () { return priorities.map(function (item) { return item.name; }); },
    userNames: function () { return users.map(function (item) { return item.name; }); }
}); };
var UserProperty = function (space, domain, apiKey, projectKey) { return ({ space: space, domain: domain, apiKey: apiKey, projectKey: projectKey }); };
var notNull = function (t) { return t != null; };
var isEmpty = function (str) { return str === ""; };


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _BacklogService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BacklogService */ "./src/BacklogService.ts");
/* harmony import */ var _SpreadSheetService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SpreadSheetService */ "./src/SpreadSheetService.ts");


global.BacklogService = Object(_BacklogService__WEBPACK_IMPORTED_MODULE_0__["BacklogService"])(new _SpreadSheetService__WEBPACK_IMPORTED_MODULE_1__["SpreadSheetServiceImpl"]);
global.onOpen = function () {
    SpreadsheetApp.getActiveSpreadsheet()
        .addMenu("Backlog", [
        {
            name: this.BacklogService.getMessage("menu_step1"),
            functionName: "init_d"
        },
        {
            name: this.BacklogService.getMessage("menu_step2"),
            functionName: "main_d"
        },
        {
            name: this.BacklogService.getMessage("menu_step3"),
            functionName: "main_getissues_d"
        }
    ]);
};
global.init_d = function () {
    this.BacklogService.showInitDialog();
};
global.main_d = function () {
    this.BacklogService.showRunDialog();
};
global.main_getissues_d = function () {
    this.BacklogService.showGetDialog();
};
global.init = function (grid) {
    this.BacklogService.getDefinitions(grid);
};
global.main = function (grid) {
    this.BacklogService.run(grid);
};
global.getConfig = function () {
    return this.BacklogService.getConfig();
};
global.getIssuList = function (config) {
    this.BacklogService.getIssuList(config);
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/messages.ts":
/*!*************************!*\
  !*** ./src/messages.ts ***!
  \*************************/
/*! exports provided: messages, Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "messages", function() { return messages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
var messages;
(function (messages) {
    var error;
    (function (error) {
        error.project_key = 'プロジェクトキーが正しくありません。';
    })(error = messages.error || (messages.error = {}));
    var common;
    (function (common) {
        common.end = '終了しました。';
    })(common = messages.common || (messages.common = {}));
})(messages || (messages = {}));
var Message = {
    findByKey: function (key, locale) { return messages[key][locale]; }
};


/***/ }),

/***/ "./src/resources.ts":
/*!**************************!*\
  !*** ./src/resources.ts ***!
  \**************************/
/*! exports provided: Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
var messages = {
    "scriptName": {
        "en": "Bulk issue registration",
        "ja": "課題一括登録"
    },
    "title_init": {
        "en": "Backlog Acquire definitions from Backlog",
        "ja": "Backlog 定義一覧取得"
    },
    "title_run": {
        "en": "Backlog Execute bulk issue registration",
        "ja": "Backlog 課題一括登録"
    },
    "title_getIssues": {
        "en": "Backlog Execute bulk issue registration",
        "ja": "Backlog 課題一覧取得"
    },
    "menu_step1": {
        "en": "STEP1: Acquire data from Backlog",
        "ja": "STEP1: Backlogからデータを取得する"
    },
    "menu_step2": {
        "en": "STEP2: Execute bulk issue registration",
        "ja": "STEP2: 課題一括登録を実行"
    },
    "menu_step3": {
        "en": "STEP3: Acquire issue from Backlog",
        "ja": "STEP3: Backlogから課題一覧を取得する"
    },
    "complete_init": {
        "en": "Acquired definitions from Backlog",
        "ja": "Backlogの定義を取得完了しました"
    },
    "label_spaceId": {
        "en": "Space ID",
        "ja": "スペースID"
    },
    "label_apiKey": {
        "en": "API key",
        "ja": "APIキー"
    },
    "label_projectKey": {
        "en": "Project key",
        "ja": "プロジェクトキー"
    },
    "button_execute": {
        "en": "Execute",
        "ja": "実行"
    },
    "progress_collect": {
        "en": "Collecting data...",
        "ja": "データを収集しています..."
    },
    "progress_end": {
        "en": " has finished",
        "ja": " が正常に行われました"
    }
};
var Message = {
    findByKey: function (key, locale) { return messages[key][locale]; },
    PROGRESS_INIT_BEGIN: function (locale) {
        var msg = {
            "en": "Started acquiring definitions from Backlog",
            "ja": "Backlog\u306E\u5B9A\u7FA9\u53D6\u5F97\u3092\u958B\u59CB\u3057\u307E\u3057\u305F..."
        };
        return msg[locale];
    },
    PROGRESS_RUN_BEGIN: function (locale) {
        var msg = {
            "en": "Started bulk issue registration",
            "ja": "\u4E00\u62EC\u767B\u9332\u3092\u958B\u59CB\u3057\u307E\u3057\u305F..."
        };
        return msg[locale];
    },
    SPACE_URL_REQUIRED: function (locale) {
        var msg = {
            "en": "Space URL is required",
            "ja": "\u30B9\u30DA\u30FC\u30B9URL\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"
        };
        return msg[locale];
    },
    API_KEY_REQUIRED: function (locale) {
        var msg = {
            "en": "API key is required",
            "ja": "API\u30AD\u30FC\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"
        };
        return msg[locale];
    },
    SPACE_OR_PROJECT_NOT_FOUND: function (locale) {
        var msg = {
            "en": "No space or project found",
            "ja": "\u30B9\u30DA\u30FC\u30B9\u307E\u305F\u306F\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093"
        };
        return msg[locale];
    },
    AUTHENTICATE_FAILED: function (locale) {
        var msg = {
            "en": "Authentication failed",
            "ja": "\u8A8D\u8A3C\u306B\u5931\u6557\u3057\u307E\u3057\u305F"
        };
        return msg[locale];
    },
    API_ACCESS_ERROR: function (error, locale) {
        var msg = {
            "en": "API access error " + error.message,
            "ja": "API\u30A2\u30AF\u30BB\u30B9\u30A8\u30E9\u30FC " + error.message
        };
        return msg[locale];
    },
    VALIDATE_ERROR_LINE: function (lineNumber, locale) {
        var msg = {
            "en": "Error occured at row " + lineNumber + ": ",
            "ja": "\u30A8\u30E9\u30FC " + lineNumber + " \u884C\u76EE: "
        };
        return msg[locale];
    },
    VALIDATE_SUMMARY_EMPTY: function (locale) {
        var msg = {
            "en": "'Summary' is required",
            "ja": "'\u4EF6\u540D' \u304C\u5165\u529B\u3055\u308C\u3066\u3044\u307E\u305B\u3093"
        };
        return msg[locale];
    },
    VALIDATE_ISSUE_TYPE_EMPTY: function (locale) {
        var msg = {
            "en": "'Issue type' is required",
            "ja": "'\u7A2E\u5225\u540D' \u304C\u5165\u529B\u3055\u308C\u3066\u3044\u307E\u305B\u3093"
        };
        return msg[locale];
    },
    VALIDATE_PARENT_ISSUE_KEY_NOT_FOUND: function (parentIssueKey, locale) {
        var msg = {
            "en": "The specified 'parent issue' key [" + parentIssueKey + "] was not found",
            "ja": "'\u89AA\u8AB2\u984C' \u306B\u6307\u5B9A\u3055\u308C\u305F\u8AB2\u984C\u30AD\u30FC [" + parentIssueKey + "] \u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093"
        };
        return msg[locale];
    },
    ALREADY_BEEN_CHILD_ISSUE: function (issueKey, locale) {
        var msg = {
            "en": "The issue key '" + issueKey + "' is a child issue and can therefor not be set as a parent issue",
            "ja": "\u8AB2\u984C '" + issueKey + "' \u306F\u3059\u3067\u306B\u5B50\u8AB2\u984C\u3068\u306A\u3063\u3066\u3044\u308B\u305F\u3081\u3001\u89AA\u8AB2\u984C\u3068\u3057\u3066\u8A2D\u5B9A\u3067\u304D\u307E\u305B\u3093"
        };
        return msg[locale];
    }
};


/***/ }),

/***/ "./src/グローバル変数.ts":
/*!************************!*\
  !*** ./src/グローバル変数.ts ***!
  \************************/
/*! exports provided: グローバル変数 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "グローバル変数", function() { return グローバル変数; });
var グローバル変数;
(function (グローバル変数) {
    // spread sheetのシート設定
    グローバル変数.spread_sheet = SpreadsheetApp.getActiveSpreadsheet();
    グローバル変数.target_sheet_name = '課題管理表';
    グローバル変数.target_sheet = グローバル変数.spread_sheet.getSheetByName(グローバル変数.target_sheet_name);
    グローバル変数.colArray = new Array();
    グローバル変数.parentArray = {};
    グローバル変数.flgChild = false; // 子課題フラグ
    グローバル変数.発生日Index = 0; // Sort用発生日Index
})(グローバル変数 || (グローバル変数 = {}));


/***/ })

/******/ });