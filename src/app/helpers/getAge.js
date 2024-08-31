const calculateDifference = (yearString) => {
    const currentYear = new Date().getFullYear(); // Mendapatkan tahun saat ini
    const yearValue = parseInt(yearString); // Mengonversi nilai string ke integer
    return currentYear - yearValue;
}
  
export default calculateDifference