
export namespace グローバル変数 {

  // spread sheetのシート設定
  export var spread_sheet = SpreadsheetApp.getActiveSpreadsheet();
  export var target_sheet_name = '課題管理表';
  export var target_sheet = spread_sheet.getSheetByName(target_sheet_name);

  export var colArray = new Array();
  export var parentArray: { [key: number]: any; } = {};

  export var flgChild = false; // 子課題フラグ
  
  export var 発生日Index = 0; // Sort用発生日Index

}
