const Advokat = require('../models/advokatModels');
const sequelize = require('../config/dbConfig');
const bcrypt = require('bcryptjs');
const User = require('../models/userModels');


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