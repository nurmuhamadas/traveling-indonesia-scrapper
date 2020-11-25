const Excel = require('exceljs');
const { columnTemplate, style } = require('../utils/excelProp');

class exportModel {
  constructor ({ sheetName, path}) {
    this._path = path;
    this._workbook = new Excel.Workbook();
    this._worksheet = this._workbook.addWorksheet(sheetName);
  }

  async generateFile () {
    this._worksheet.columns = await columnTemplate;

    this._worksheet.getRow(1).fill = style.fill;
    this._worksheet.getRow(1).font = style.bold;
    this._worksheet.getRow(1).alignment = style.center;

    await this._workbook.xlsx.writeFile(this._path);

    return "File successfully generated";
  }

  async insertRow (data) {
    this._worksheet.addRow(data).commit();
    await this._workbook.xlsx.writeFile(this._path);

    return "Data successfully added";
  }
}

module.exports = exportModel;
