import { BacklogService } from "./BacklogService";
import { SpreadSheetServiceImpl } from "./SpreadSheetService";

declare var global: any

global.BacklogService = BacklogService(new SpreadSheetServiceImpl)
global.onOpen = function() {
	SpreadsheetApp.getActiveSpreadsheet()
		.addMenu(
			"Backlog",
			[ 
				{ 
					name : this.BacklogService.getMessage("menu_step1"), 
					functionName: "init_d"
				},
				{ 
					name : this.BacklogService.getMessage("menu_step2"),
					functionName: "main_d"
				},
				{ 
					name : this.BacklogService.getMessage("menu_step3"),
					functionName: "main_getissues_d"
				}
			]
		)
}
global.init_d = function () {
  this.BacklogService.showInitDialog()
}
global.main_d = function () {
  this.BacklogService.showRunDialog()
}
global.main_getissues_d = function () {
  this.BacklogService.showGetDialog()
}
global.init = function (grid: any) {
  this.BacklogService.getDefinitions(grid)
}
global.main = function (grid: any) {
  this.BacklogService.run(grid)
}

global.getConfig = function() {
  return this.BacklogService.getConfig()
}
global.getIssuList = function(config: any) {
  this.BacklogService.getIssuList(config)
}
