import { Const } from './const'

/**
 * エントリーポイント
 */
function myFunction(): void {
  const copiedFrom = PropertiesService.getScriptProperties().getProperty('COPIED_FROM')
  const fileSuffix = PropertiesService.getScriptProperties().getProperty('FILE_SUFFIX') || ''
  const fileHeadSuffixes = PropertiesService.getScriptProperties().getProperty('FILE_HEAD_SUFFIXES') || ''

  const fileName = `${Const.YYYY}年${Const.M}月${fileSuffix}`

  // 入力用
  const copiedFileIdForInput = copyByFileId(copiedFrom!, '入力用', fileName)
  updateSpreadSheet(copiedFileIdForInput)

  // 参照用
  fileHeadSuffixes?.split(',').forEach((fileHeadSuffix, idx) => {
    const copiedFileId = copyByFileId(copiedFrom!, fileHeadSuffix, fileName)
    updateSpreadSheet(copiedFileId)
    updateRefSheet(copiedFileId, copiedFileIdForInput, idx === 0 ? 'I8:K' : 'O8:Q')
  })
}

function copyByFileId(id: string, fileHeadSuffix: string, newFileName: string): string {
  const file = DriveApp.getFileById(id)

  // プリフィックスを抽出
  const fileName = file.getName()
  const group = fileName.match(/^【(.*)】.*/)
  const fileHeadPrefix = (group && group[1]) ?? ''

  // 新しい名前でファイルのコピーを作成する
  const copiedFile = file.makeCopy(`【${fileHeadPrefix}_${fileHeadSuffix}】${newFileName}`)
  return copiedFile.getId()
}

function updateSpreadSheet(id: string): void {
  const ss = SpreadsheetApp.openById(id)
  const sheets = ss.getSheets()
  sheets.forEach((sheet) => {
    const oldSheetName = sheet.getSheetName()
    const forward = oldSheetName.slice(0, -1)
    const backward = oldSheetName.slice(-1)
    const newForward = Utilities.formatDate(Const.TODAY, 'JST', forward)
    sheet.setName(`${newForward}${backward}`)

    sheet.getRange('A3').setValue(Const.YYYY)
    sheet.getRange('C3').setValue(Const.M)

    // 特別チェックを実施する行たち
    Const.END_OF_MONTH_ROWS.forEach((rowNum) => {
      const date = sheet.getRange(`A${rowNum}`).getValue()
      const d = Utilities.formatDate(new Date(date), 'JST', 'd')
      if (d.length === 1) {
        sheet.deleteRow(rowNum)
      }
    })
  })
}

function updateRefSheet(id: string, refId: string, refRange): void {
  const ss = SpreadsheetApp.openById(id)
  const sheets = ss.getSheets()
  sheets.forEach((sheet) => {
    const endOfMonthRow = (() => {
      for (const endOfMonthRow of Const.END_OF_MONTH_ROWS) {
        if (sheet.getRange(`A${endOfMonthRow}`).getValue()) {
          return endOfMonthRow
        }
      }
    })()

    sheet.deleteColumns(9, 19)
    sheet.getRange(`C8:E${endOfMonthRow}`).clearContent()
    const sheetName = sheet.getSheetName()
    sheet.getRange('C8').setValue(`=IMPORTRANGE("${refId}", "${sheetName}!${refRange}${endOfMonthRow}")`)
  })
}
