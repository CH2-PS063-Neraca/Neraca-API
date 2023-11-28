const db = require('../models/userModels');
const User = require('../models/userModels');
const bcrypt = require('bcryptjs')

const { checkDuplicateUsername, checkDuplicateEmail } = require('../middleware/verifyRegister');

/* ------------ Register User ------------ */
exports.register = async (req, res) =>{
    try {
        const { username, email, password, confPassword } = req.body;

        const checkUsername = await checkDuplicateUsername(username);
        const checkEmail = await checkDuplicateEmail(email);

        if (password !== confPassword) {
            return res.status(500).send({
                status: 'Failed',
                message: 'Password tidak sesuai, silahkan cek kembali password yang anda masukkan'
            });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const hashedConfPassword = await bcrypt.hash(confPassword, salt);

        if (username === checkUsername) {
            return res.status(500).send({
                status: 'Failed',
                message: 'Username telah tersedia',
            });
        }
        if (email === checkEmail) {
            return res.status(500).send({
                status: 'Failed',
                message: 'Email telah tersedia'
            })
        }
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
            confPassword: hashedConfPassword
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