const { default: mongoose} = require('mongoose');

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log('Database Berhasil Terkoneksi!');
    } catch (error) {
        console.log('Koneksi Database Gagal!');
    }
};

module.exports = dbConnect;