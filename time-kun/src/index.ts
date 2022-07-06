import { Const } from './const'

/**
 * エントリーポイント
 */
function myFunction(): void {
  const copiedFrom = PropertiesService.getScriptProperties().getProperty('COPIED_FROM')
  const fileSuffix = PropertiesService.getScriptProperties().getProperty('FILE_SUFFIX')
  const fileName = `${Const.YYYY}年${Const.M}月`

  const copiedFileId = copyByFileId(copiedFrom, `${fileName}${fileSuffix}`)
  updateSpreadSheet(copiedFileId)
}

function copyByFileId(id: string, newFileName: string): string {
  const file = DriveApp.getFileById(id)

  // プリフィックスを抽出
  const fileName = file.getName()
  const group = fileName.match(/^(【.*】).*/)
  const filePrefix = (group && group[1]) ?? ''

  // 新しい名前でファイルのコピーを作成する
  const copiedFile = file.makeCopy(`${filePrefix}${newFileName}`)
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
    const checkRowNumbers = [38, 37, 36]
    checkRowNumbers.forEach((rowNum) => {
      const date = sheet.getRange(`A${rowNum}`).getValue()
      const d = Utilities.formatDate(new Date(date), 'JST', 'd')
      if (d.length === 1) {
        sheet.deleteRow(rowNum)
      }
    })
  })
}
