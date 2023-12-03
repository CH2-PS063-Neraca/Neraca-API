const Advokat = require('../models/advokatModels');
const sequelize = require('../config/dbConfig');
const bcrypt = require('bcryptjs');
const User = require('../models/userModels');
const nodemailer = require('nodemailer');


require('dotenv').config();

exports.getAllAdvokat = async(req, res) => {
    try {
        const advokat = await Advokat.findAll();
        res.send({
            status: 'Success',
            message: 'Advokat berhasil di dapatkan',
            data: advokat
        });
    } catch (error) {
        console.log(error);
    }
}

exports.updatePassword = async(req, res) => {
    const id = req.body.id;
    const { currentPassword, newPassword, confPassword } = req.body;

    try {
        const advokat = await Advokat.findOne({
            where: { id: id }
        });
        if (!advokat) {
            return res.status(401).send({
                status: 'Failed',
                message: 'Advokat tidak ditemukan'
            });
        }
        const isMatch = await bcrypt.compare(currentPassword, advokat.password);
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

        await Advokat.update({
            password: hashedPassword,
            confPassword: hashedConfPassword
        }, {
            where: { id: id }
        });

        res.send({
            status: 'Success',
            message: 'Password berhasil diubah'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(401).send({
            status: 'Failed',
            message: 'Terjadi kesalahan saat mengubah password'
        });
    }
}

exports.forgotPassword = async(req, res) => {
    const email = req.body.email;

    try {
        const advokat = await Advokat.findOne({
            where: { email: email }
        });
        if (!advokat) {
            return res.status(401).send({
                status: 'Failed',
                message: 'Email tidak ditemukan'
            });
        }
        
        const token = jwt.sign({ id: advokat.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '24h'
        });

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        let info = await transporter.sendMail({
            from: "neracalawconsultant",
            to: email,
            subject: "Reset Password",
            text: "Klik link berikut untuk mereset password anda",
        });

        res.send({
            status: 'Success',
            message: 'Link reset password telah dikirim ke email anda'
        });
    } catch (error) {
        res.status(401).send({
            status: 'Failed',
            message: 'Terjadi kesalahan saat mengirim link reset password'
        });
    }
}