const Excel = require('exceljs');

class exportModel {
  static async generateFile ({ path, sheetName }) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(sheetName);

    worksheet.columns = [
      {header: 'Id', key: 'id', width: 10, style: { alignment: style.center, border: style.border }},
      {header: 'Nama', key: 'name', width: 32, style: { alignment: style.left, border: style.border }}, 
      {header: 'Deskripsi', key: 'desc', width: 64, style: { alignment: style.left, border: style.border }},
      {header: 'Kategori', key: 'cat', width: 16, style: { alignment: style.left, border: style.border }},
      {header: 'Lokasi', key: 'loc', width: 48, style: { alignment: style.left, border: style.border }},
      {header: 'Foto', key: 'photo', width: 32, style: { alignment: style.left, border: style.border }}, 
    ];

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

const style = {
  border: { 
    top: { style:'thin', color: { argb:'FF000000' } },
    right: { style:'thin', color: { argb:'FF000000' } },
    bottom: { style:'thin', color: { argb:'FF000000' } },
    left: { style:'thin', color: { argb:'FF000000' } }
  },
  left: { vertical: 'middle', horizontal: 'left' },
  center: { vertical: 'middle', horizontal: 'center' },
  fill: { type: 'pattern', pattern: 'solid', bgColor: { argb:'FFCCCCCC' }, fgColor: { argb:'FFCCCCCC' } },
  bold: { bold: true },
}

module.exports = exportModel;
