var DAY_OF_WEEK_STR = ['日', '月', '火', '水', '木', '金', '土'];

function myFunction() {
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
