const Excel = require('exceljs');
const { columnTemplate, style } = require('../utils/excelProp');

class exportModel {
  static async generateFile ({ path, sheetName }) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    worksheet.columns = await columnTemplate;

    worksheet.getRow(1).fill = style.fill;
    worksheet.getRow(1).font = style.bold;
    worksheet.getRow(1).alignment = style.center;

    await workbook.xlsx.writeFile(path);

    return "File successfully generated";
  }

  static async insertRow ({ path, sheetName, data }) {
    const workbook = new Excel.Workbook();
    await workbook.xlsx.readFile(path)

    const worksheet = workbook.getWorksheet(sheetName);
    worksheet.addRow(data).commit();
    await workbook.xlsx.writeFile(path);

    return "Data successfully added";
  }
}

module.exports = exportModel;
