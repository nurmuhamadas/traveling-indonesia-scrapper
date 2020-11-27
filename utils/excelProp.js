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
  {header: 'Id Lokasi', key: 'id_loc', width: 20, style: { alignment: style.left, border: style.border }},
  {header: 'Alamat Lengkap', key: 'full_addr', width: 32, style: { alignment: style.left, border: style.border }}, 
  {header: 'desa', key: 'loc', width: 20, style: { alignment: style.left, border: style.border }},
  {header: 'kecamatan', key: 'district', width: 20, style: { alignment: style.left, border: style.border }}, 
  {header: 'kabupaten', key: 'city', width: 20, style: { alignment: style.left, border: style.border }},
  {header: 'provinsi', key: 'region', width: 24, style: { alignment: style.left, border: style.border }},
  {header: 'Kode Pos', key: 'post_code', width: 20, style: { alignment: style.right, border: style.border }},
  {header: 'koordinat', key: 'coor', width: 32, style: { alignment: style.left, border: style.border }},
  {header: 'foto', key: 'photo', width: 32, style: { alignment: style.left, border: style.border }}, 
];

module.exports = { columnTemplate, style };
