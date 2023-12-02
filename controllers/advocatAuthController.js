const Advocat = require('../models/advokatModels');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

require('dotenv').config();


/* --------- Register Advocat ---------- */
exports.registerAdvocat = async(req, res) => {
    const { nama, email, password, confPassword, firma, pengalaman, keahlian, biografy, foto, riwayat_kasus, pendidikan, lokasi } = req.body;

    try {
        const checkEmail = await Advocat.findOne({
            where: {
                email,
            }
        });
        if (checkEmail) {
            return res.status(500).send({
                status: 'Failed',
                message: 'Email sudah digunakan'
            })
        }
        
        if (password !== confPassword) {
            return res.status(500).send({
                status: 'Failed',
                message: 'Password tidak sesuai, silahkan cek kembali password yang anda masukkan'
            });
            
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const hashedConfPassword = await bcrypt.hash(confPassword, salt);

        if (!nama || !email || !password || !confPassword) {
            return res.status(500).send({
                status: 'Failed',
                message: 'Semua data harus di isi'
            })
        }

        const newAdvocat = await Advocat.create({
            nama: nama,
            email: email,
            password: hashedPassword,
            confPassword: hashedConfPassword,
            firma: firma,
            pengalaman: pengalaman,
            keahlian: keahlian,
            biografy: biografy,
            foto: foto,
            riwayat_kasus: riwayat_kasus,
            pendidiikan: pendidikan,
            lokasi: lokasi
        });

        const token = jwt.sign({ id: newAdvocat.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '24h'
        });

        res.status(200).json({
            status: 'Success',
            message: 'Advocat berhasil di daftarkan',
            data: newAdvocat,
            token: token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'Failed',
            message: 'Registrasi gagal'
        })
    }
}

/* --------- Login Advocat ---------- */
exports.loginAdvocat = async(req, res) => {
    const { email, password } = req.body;

    try {
        const checkEmail = await Advocat.findOne({
            where: {
                email,
            }
        });
        if (!checkEmail) {
            return res.status(500).send({
                status: 'Failed',
                message: 'Email tidak terdaftar'
            })
        }

        const checkPassword = await bcrypt.compare(password, checkEmail.password);
        if (!checkPassword) {
            return res.status(500).send({
                status: 'Failed',
                message: 'Password salah'
            })
        }

        const token = jwt.sign({ id: checkEmail.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '24h'
        });

        res.status(200).json({
            status: 'Success',
            message: 'Login berhasil',
            data: checkEmail,
            token: token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'Failed',
            message: 'Internal server error'
        })
    }
}

/* --------- Logout Advocat ---------- */
exports.logoutAdvocat = async(req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).json({
            status: 'Success',
            message: 'Logout berhasil'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'Failed',
            message: 'Internal server error'
        })
    }
}