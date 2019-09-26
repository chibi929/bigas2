import { Const } from './const';

function myFunction(): void {
  const date = new Date();
  if (!isEvenWeeksFriday(date)) {
    return;
  }
  createNextReport(date);
}

function myNotify(): void {
  const date = new Date();
  if (!isEvenWeeksFriday(date)) {
    return;
  }
  sendToSlack();
}

function createNextReport(date: Date): void {
  do {
    date.setDate(date.getDate() + 7);
  } while (!isEvenWeeksFriday(date));
  const fileName = Const.FILE_PREFIX + '_' + formatDate(date, 'YYYYMMDD');
  copyByFileId(Const.TEMPLATE_FILE_ID, fileName);
}

function copyByFileId(id: string, copyName: string): void {
  const file = DriveApp.getFileById(id);
  file.makeCopy(copyName);
}

function isEvenWeeksFriday(date: Date): boolean {
  const day = date.getDate();
  const weekNumber = Math.floor((day - 1) / 7) + 1;
  const dayOfWeek = date.getDay();
  return dayOfWeek === 5 && weekNumber % 2 === 0;
}

function formatDate(date: Date, format: string): string {
  format = format || 'YYYY/MM/DD';
  format = format.replace(/YYYY/g, date.getFullYear().toString());
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
  return format;
}

function sendToSlack(): void {
  const username = 'slackbot';
  const icon = ':hatching_chick:';
  const jsonData = {
    username: username,
    icon_emoji: icon,
    text: Const.POST_MESSAGE
  };
  const payload = JSON.stringify(jsonData);

  const options: any = {
    method: 'post',
    contentType: 'application/json',
    payload: payload
  };

  UrlFetchApp.fetch(Const.POST_URL, options);
}
