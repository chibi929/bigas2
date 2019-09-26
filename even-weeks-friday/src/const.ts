export class Const {
  static readonly DAY_OF_WEEK_STR = ['日', '月', '火', '水', '木', '金', '土'];
  static readonly TEMPLATE_FILE_ID = '${ここにコピー元ファイルIDを入れる}';
  static readonly FILE_PREFIX = '${ここにファイル名のプレフィックスを入れる}';

  // === for send to slack ===
  static readonly POST_URL = '${ここに Slack 通知のための POST URL を入れる}';
  static readonly POST_MESSAGE = '${ここに Slack に通知するメッセージを入れる}';
  // === for send to slack ===
}
