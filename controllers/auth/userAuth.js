const User = require('../../models/userModels');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

require('dotenv').config();

/* ------------ Register User ------------ */
exports.register = async (req, res) =>{
    try {
        const { username, email, password, confPassword, phone, foto } = req.body;

        const checkEmail = await User.findOne({
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

        if (!username || !email || !password || !confPassword) {
            return res.status(500).send({
                status: 'Failed',
                message: 'Semua data harus di isi'
            })
        }

        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword,
            confPassword: hashedConfPassword,
            phone: phone,
            foto: foto
        })

        if (newUser) {
            return res.status(202).send({
                status: 'Success',
                message: 'Anda berhasil registrasi'
            })
        } else {
            return res.status(500).send({
                status: 'Failed',
                message: 'Registrasi gagal'
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            status: 'Failed',
            message: 'Internal server error'
        })
    }
}

exports.signIn = async (req, res) => {
    try {
        const email = req.body.email;

        if (!email) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Username atau email tidak boleh kosong'
            });
        }

        const user = await User.findAll({
            where: {
                email: email,
            }
        });

        if (!user) {
            return res.status(400).json({
                status: 'Failed',
                message: 'User tidak ditemukan'
            });
        }

        const match = await bcrypt.compare(req.body.password, user[0].password);

        if (!match) {
            return res.status(400).json({
                status: 'Failed',
                message: 'Password tidak sesuai'
            });
        }

        const token = jwt.sign({ id: user[0].id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        });

        return res.cookie('token', token, {
            expires: new Date(Date.now() + 3600000),
            secure: false,
            httpOnly: true,
        })
        
        .status(200).json({
            message: 'Success',
            loginResult: {
                id: user[0].id,
                username: user[0].username,
                email: user[0].email,
                phone: user[0].phone,
                foto: user[0].foto,
                token: token
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Failed',
            message: 'Internal server error'
        });
    }
};

exports.signOut = async (req, res) => {
    try {
        res.clearCookie('token');
        return res.status(200).json({
            status: 'Success',
            message: 'Logout berhasil'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Failed',
            message: 'Internal server error'
        });
    }
};
