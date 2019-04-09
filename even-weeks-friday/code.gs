const DAY_OF_WEEK_STR = ['日', '月', '火', '水', '木', '金', '土'];
const TEMPLATE_FILE_ID = '${ここにコピー元ファイルIDを入れる}';
const FILE_PREFIX = '${ここにファイル名のプレフィックスを入れる}';

function myFunction() {}

function createNextReport() {
  var date = new Date();
  if (!isEvenWeeksFriday(date)) {
    return;
  }

  do {
    date.setDate(date.getDate() + 7);
  } while (!isEvenWeeksFriday(date));
  const fileName = FILE_PREFIX + '_' + formatDate(date, 'YYYYMMDD');
  copyByFileId(TEMPLATE_FILE_ID, fileName);
}

function copyByFileId(id, copyName) {
  const file = DriveApp.getFileById(id);
  file.makeCopy(copyName);
}

function isEvenWeeksFriday(date) {
  const day = date.getDate();
  const weekNumber = Math.floor((day - 1) / 7) + 1;
  const dayOfWeek = date.getDay();
  return dayOfWeek === 5 && weekNumber % 2 === 0;
}

function formatDate(date, format) {
  format = format || 'YYYY/MM/DD';
  format = format.replace(/YYYY/g, date.getFullYear());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
  return format;
}
