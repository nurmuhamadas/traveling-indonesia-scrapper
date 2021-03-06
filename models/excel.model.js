const Excel = require('exceljs');
const { objectToExcel, excelToObject } = require('../utils/dataConverter');
const { columnTemplate, style } = require('../utils/excelProp');

class ExcelModel {
  constructor ({ sheetName, path}) {
    this._path = path;
    this._sheetName = sheetName;
    this._workbook = new Excel.Workbook();
  }

  async generateFile () {
    const worksheet = await this._workbook.addWorksheet(this._sheetName);
    worksheet.columns = await columnTemplate;

    worksheet.getRow(1).fill = style.fill;
    worksheet.getRow(1).font = style.bold;
    worksheet.getRow(1).alignment = style.center;

    await this._workbook.xlsx.writeFile(this._path);

    console.log('File successfully generated');
  }

  async insertRows (data = []) {
    await this._workbook.xlsx.readFile(this._path);
    const worksheet = this._workbook.getWorksheet(this._sheetName);

    for (let i = 0; i < data.length; i += 1) {
      await worksheet.addRow(objectToExcel(data[i])).commit();
    }
    await this._workbook.xlsx.writeFile(this._path);

    console.log('Data successfully added');
  }

  async readRow (rowNumber) {
    await this._workbook.xlsx.readFile(this._path);
    const worksheet = this._workbook.getWorksheet(this._sheetName);
    const row =  await worksheet.getRow(rowNumber);
    let data = excelToObject(row);

    return data;
  }

  async readAllRows () {
    let data = [];
    await this._workbook.xlsx.readFile(this._path);
    const worksheet = this._workbook.getWorksheet(this._sheetName);
    
    await worksheet.eachRow(async (row, rowNumber) => {
      if (rowNumber !== 1) {
        let rowData = await worksheet.getRow(rowNumber);
        await data.push(excelToObject(rowData));
      }
    });

    return data;
  }
}

module.exports = ExcelModel;
