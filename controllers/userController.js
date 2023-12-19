const User = require('../models/userModels.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/dbConfig');
const nodemailer = require('nodemailer');

require('dotenv').config();

/* ----------- Get User ------------- */
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'foto', 'phone'],
        });
        res.send(users);
    } catch (error) {
        res.status(401).send({
            status: 'Failed',
            message: 'Terjadi kesalahan mendapatkan user'
        });
    }
}

/* ----------- Get User Profile ----------- */
exports.getUserProfile = async (req, res) => {
   const id = req.params.id;

   try {
    const user = await User.findOne({
        where: { id: id },
        attributes: ['email', 'phone', 'foto']
    });
    if (!user) {
        return res.status(401).send({
            status: 'Failed',
            message: 'User tidak ditemukan'
        });
    }
    res.send(user);
   } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'Failed',
            message: 'Terjadi kesalahan mendapatkan profile user'
        });
   }
}

/* --------- Get user profile setting --------- */
exports.getUserProfileSetting = async (req, res) => {
    const id = req.params.id;

   try {
    const user = await User.findOne({
        where: { id: id },
        attributes: ['email', 'phone', 'password']
    });
    if (!user) {
        return res.status(401).send({
            status: 'Failed',
            message: 'User tidak ditemukan'
        });
    }
    res.send(user);

   } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'Failed',
            message: 'Terjadi kesalahan mendapatkan profile user'
        });
   }
}

/* ------------ Update email user -------------  */
exports.updateUserEmail = async (req, res) => {
    const id = req.params.id;
    const { email } = req.body;

    try {
        const user = await User.findOne({
            where: { id: id }
        });
        if (!user) {
            return res.status(401).send({
                status: 'Failed',
                message: 'User tidak ditemukan'
            });
        }

        await User.update({
            email: email
        }, {
            where: { id: id }
        });

        res.send({
            status: 'Success',
            message: 'Email berhasil diubah'
        });
    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'Failed',
            message: 'Terjadi kesalahan saat mengubah email'
        });
    }
}

/* --------- Update phone number ---------- */
exports.updateUserPhone = async (req, res) => {
    const id = req.params.id;
    const { phone } = req.body;

    try {
        const user = await User.findOne({
            where: { id: id }
        });
        if (!user) {
            return res.status(401).send({
                status: 'Failed',
                message: 'User tidak ditemukan'
            });
        }

        await User.update({
            phone: phone
        }, {
            where: { id: id }
        });

        res.send({
            status: 'Success',
            message: 'Phone berhasil diubah'
        });

    } catch (error) {
        console.log(error);
        res.status(401).send({
            status: 'Failed',
            message: 'Terjadi kesalahan saat mengubah nomor hp'
        });
    }
}

/* -------- Update Password ------- */
exports.updateUserPassword = async (req, res) => {
    const id = req.body.id;
    const { currentPassword, newPassword, confPassword } = req.body;

    try {
        const user = await User.findOne({
            where: { id: id }
        });
        if (!user) {
            return res.status(401).send({
                status: 'Failed',
                message: 'User tidak ditemukan'
            });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).send({
                status: 'Failed',
                message: 'Password tidak sesuai'
            });
        }
        if (newPassword !== confPassword) {
            return res.status(401).send({
                status: 'Failed',
                message: 'Konfirmasi password tidak sesuai'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        const hashedConfPassword = await bcrypt.hash(confPassword, salt);
        
        await User.update({
            password: hashedPassword,
            confPassword: hashedConfPassword
        }, {
            where: { id: id }
        });

        res.send({
            status: 'Success',
            message: 'Password berhasil diubah'
        });
        
    } catch (error) {
        res.status(401).send({
            status: 'Failed',
            message: 'Terjadi kesalahan saat mengubah password'
        });
    }
}

/* --------- Forget Password ---------- */
exports.forgotPassword = async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOne({
            where: { email: email }
        });
        if (!user) {
            return res.status(401).send({
                status: 'Failed',
                message: 'Email tidak ditemukan'
            });
        }
        const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        // Create a transport object
        let transporter = nodemailer.createTransport({
            service: 'gmail', // replace with your email provider
            auth: {
                user: process.env.EMAIL_USERNAME, // replace with your email username
                pass: process.env.EMAIL_PASSWORD // replace with your email password
            }
        });

        // Send an email
        let info = await transporter.sendMail({
            from: 'necaralawconsultant@gmail.com', // sender address
            to: email, // list of receivers
            subject: 'Password Reset', // Subject line
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n${link}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n` // plain text body
        });

        res.send({
            status: 'Success',
            message: 'Link reset password berhasil dikirim',
        });
    } catch (error) {
        res.status(401).send({
            status: 'Failed',
            message: 'Terjadi kesalahan saat mengirim link reset password'
        });
    }
}

/* --------- Update Profile ----------- */
exports.updateProfile = async (req, res) => {
    const id = req.body.id;
    const { phone, tanggal_lahir, alamat, jenis_kelamin } = req.body;

    try {
        const user = await User.findOne({
            where: { id: id }
        });

        if (!user) {
            return res.status(401).send({
                status: 'Failed',
                message: 'User tidak ditemukan'
            });
        }
        await User.update({
            phone: phone,
            tanggal_lahir: tanggal_lahir,
            alamat: alamat,
            jenis_kelamin: jenis_kelamin
        }, {
            where: { id: id }
        });

        res.send({
            status: 'Success',
            message: 'Profile berhasil diubah'
        });
    } catch (error) {
        res.status(401).send({
            status: 'Failed',
            message: 'Terjadi kesalahan saat mengubah profile'
        });
    }
}

exports.deleteUser = async (req, res) => {
    const id = req.body.id;

    try {
        const user = await User.findOne({
            where: { id: id }
        });
        if (!user) {
            return res.status(401).send({
                status: 'Failed',
                message: 'User tidak ditemukan'
            });
        }
        await User.destroy({
            where: { id: id }
        });

        res.send({
            status: 'Success',
            message: 'User berhasil dihapus'
        });
    } catch (error) {
        res.status(401).send({
            status: 'Failed',
            message: 'Terjadi kesalahan saat menghapus user'
        });
    }
}