let SPREAD_SHEET_ID = '1VSsKnIk4kUsmJzMsC6Cw-YqPU6XpXhCpwPD8IqHPDX4';

function getJsonArray(): any {
  const spreadSheet = SpreadsheetApp.openById(SPREAD_SHEET_ID);
  const sheet = spreadSheet.getSheetByName('シート1');
  const dataRange = sheet.getDataRange().getValues();
  const keys = dataRange.splice(0, 1)[0];
  return dataRange.map(r => {
    let obj = {};
    obj[keys[0]] = r[0];
    obj[keys[1]] = r[1];
    return obj;
  });
}

function myFunction() {
  const jsonArray = getJsonArray();
  Logger.log(jsonArray.filter(j => j.grade == 1));
}

function doGet(e) {
  const grade = e.parameter.grade;
  const jsonArray = getJsonArray();

  let res = [];
  if (!grade) {
    res = jsonArray;
  } else {
    res = jsonArray.filter(j => j.grade <= grade);
  }
  return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
}
