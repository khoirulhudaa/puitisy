const checkDate = (dateString) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    
    // Menambahkan satu tahun ke tanggal awal
    const oneYearLater = new Date(givenDate);
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    
    // Membandingkan tanggal saat ini dengan tanggal satu tahun kemudian
    return currentDate >= oneYearLater;
};

export default checkDate