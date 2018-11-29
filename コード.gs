function myFunction() {
  var prop = PropertiesService.getScriptProperties().getProperties();
  var space_id = "hands-lab";
  var domain = "backlog.jp"; // or backlog.com
  var backlog_url = "https://" + space_id +"."+ domain;
  var api_key = prop.backlog_api_key; 
  var project_ids = ["DEV_PORTAL"];

  for (var i in project_ids) {
    var wiki_json = getBacklogWiki(backlog_url, api_key, project_ids[i]);
    if (wiki_json) {
      var gsheet_url = prop.gsheet_url;
      writeGsheet(gsheet_url, wiki_json, project_ids[i], backlog_url);
    }
  }
}

function getBacklogWiki(backlog_url, api_key, project_id) {
  var api_url = backlog_url + "/api/v2/wikis?apiKey=" + api_key + "&projectIdOrKey=" + project_id;
  var res = UrlFetchApp.fetch(api_url);
  if (res.getResponseCode() != 200) {
    return false;
  }
  return JSON.parse(res.getContentText());
}

function createGsheetSheet(sheet_name){
  spreadsheet.insertSheet(sheet_name, 0);
}


function writeGsheet(gsheet_url, wiki_json, project_id, backlog_url) {
  var spreadsheet = SpreadsheetApp.openByUrl(gsheet_url);
  spreadsheet.insertSheet(project_id, 0);
  var sheet = spreadsheet.getSheetByName(project_id).activate();
  var cell = sheet.getActiveCell();
  
  cell.offset(0, 0).setValue('url').setBackground("#FFFFE0");// LightYellow
  cell.offset(0, 1).setValue('タイトル').setBackground("#FFFFE0");
  cell.offset(0, 2).setValue('最終更新日').setBackground("#FFFFE0");
  
  for (var i in wiki_json) {
    var i_ = Number(i) + 1;
    cell.offset(i_, 0).setValue(backlog_url + "/alias/wiki/" +wiki_json[i].id);
    cell.offset(i_, 1).setValue(wiki_json[i].name);
    cell.offset(i_, 2).setValue(wiki_json[i].updated);
  }
  
  // 1行目と1列目を固定
  sheet.setFrozenRows(1);
  
  // リサイズ
  sheet.autoResizeColumns(1, 3);
  
  // 更新日順にソート
  sheet.sort(3)
}