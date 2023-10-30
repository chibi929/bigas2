export class Const {
  static readonly TODAY = new Date()
  static readonly YYYY = Utilities.formatDate(Const.TODAY, 'JST', 'yyyy')
  static readonly M = Utilities.formatDate(Const.TODAY, 'JST', 'M')
  static readonly END_OF_MONTH_ROWS = [38, 37, 36]
}
