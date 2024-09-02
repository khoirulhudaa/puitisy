const checkDays = (dateString) => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    
    // Menghitung selisih waktu dalam milidetik
    const timeDiff = currentDate - givenDate;
    
    // Mengonversi selisih waktu dari milidetik ke hari
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    
    // Memeriksa apakah selisih hari lebih dari 1
    return daysDiff > 1;
};

export default checkDays