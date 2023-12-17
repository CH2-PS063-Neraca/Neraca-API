const Advocat = require('../../models/advokatModels');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

require('dotenv').config();


/* --------- Register Advocat ---------- */
exports.registerAdvocat = async(req, res) => {
    const { nama, email, password, pengalaman, biografi, pendidikan, lokasi, harga_konsultasi_chat, harga_konsultasi_video, harga_konsultasi_tatap_muka } = req.body;

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

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        if (!nama || !email || !password ) {
            return res.status(500).send({
                status: 'Failed',
                message: 'Semua data harus di isi'
            })
        }

        const newAdvocat = await Advocat.create({
            nama: nama,
            email: email,
            password: hashedPassword,
            pengalaman: pengalaman,
            biografi: biografi,
            pendidikan: pendidikan,
            lokasi: lokasi,
            harga_konsultasi_chat: harga_konsultasi_chat,
            harga_konsultasi_video: harga_konsultasi_video,
            harga_konsultasi_tatap_muka: harga_konsultasi_tatap_muka
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

/* ---------- Logout Advocat ---------- */
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