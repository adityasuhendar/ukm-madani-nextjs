// Convert from PHP formatTanggalIndonesia function
export function formatTanggalIndonesia(date: string | Date): string {
  if (!date || date === '0000-00-00') {
    return 'Tanggal tidak tersedia';
  }
  
  const bulan = [
    '', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
    'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
  ];
  
  let dateObj: Date;
  
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else {
    dateObj = date;
  }
  
  if (isNaN(dateObj.getTime())) {
    return 'Format tanggal tidak valid';
  }
  
  const hari = dateObj.getDate();
  const bulanNum = dateObj.getMonth() + 1;
  const tahun = dateObj.getFullYear();
  
  return `${hari} ${bulan[bulanNum]} ${tahun}`;
}