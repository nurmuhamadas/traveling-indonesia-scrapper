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

const columnTemplate = [
  {header: 'Id', key: 'id', width: 10, style: { alignment: style.center, border: style.border }},
  {header: 'Nama', key: 'name', width: 32, style: { alignment: style.left, border: style.border }}, 
  {header: 'Deskripsi', key: 'desc', width: 64, style: { alignment: style.left, border: style.border }},
  {header: 'Kategori', key: 'cat', width: 24, style: { alignment: style.left, border: style.border }},
  {header: 'desa', key: 'loc', width: 20, style: { alignment: style.left, border: style.border }},
  {header: 'kecamatan', key: 'photo', width: 20, style: { alignment: style.left, border: style.border }}, 
  {header: 'kabupaten', key: 'cat', width: 20, style: { alignment: style.left, border: style.border }},
  {header: 'provinsi', key: 'loc', width: 24, style: { alignment: style.left, border: style.border }},
  {header: 'koordinat', key: 'cat', width: 32, style: { alignment: style.left, border: style.border }},
  {header: 'foto', key: 'photo', width: 32, style: { alignment: style.left, border: style.border }}, 
];

module.exports = { columnTemplate, style };
