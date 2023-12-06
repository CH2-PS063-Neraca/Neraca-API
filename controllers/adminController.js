const firma = require('../models/lawFirmModels');
const admin = require('../models/adminModels');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


/* ------------ Get All Admin ------------ */
exports.getAllAdmin = async(req, res) => {
    try {
        const adminCheck = await admin.findAll();
        res.send({
            status: 'Success',
            message: 'Admin berhasil di dapatkan',
            data: adminCheck
        });
    } catch (error) {
        console.log(error);
    }
}

/* ------------ Update Pasword Admin ------------ */
exports.updatePassword = async(req, res) => {
    const id = req.params.id;
    const { currentPassword, newPassword, confPassword } = req.body;

    try {
        const adminCheck = await admin.findOne({
            where: { id: id }
        });
        if (!adminCheck) {
            return res.status(401).send({
                status: 'Failed',
                message: 'Admin tidak ditemukan'
            });
        }
        const isMatch = await bcrypt.compare(currentPassword, admin.password);
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

        await admin.update({
            password: hashedPassword,
        }, {
            where: { id: id }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'Failed',
            message: 'Internal server error'
        });
    }
}

/* ------------ Forgot Password Admin ------------ */
exports.forgotPassword = async(req, res) => {
    const email = req.body.email;
    
    try {
        const admin = await admin.findOne({
            where: { email: email }
        });
        if (!admin) {
            return res.status(401).send({
                status: 'Failed',
                message: 'Email tidak terdaftar'
            });
        }
        const token = jwt.sign({ id: admin.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h'
        });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        });
        const mailOptions = {
            from: '',
            to: email,
            subject: 'Reset Password',
            html: `<p>Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password</p>`
        };
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
            }
            console.log('Email sent: ' + info.response);
        });
        res.send({
            status: 'Success',
            message: 'Email berhasil dikirim'
        });
    }
    catch (error) {
        console.log(error);
        return res.status(401).send({
            status: 'Failed',
            message: 'Terjadi kesalahan saat mengirim email'
        });
    }
}

/* ------------ Delete Admin ------------ */
exports.deleteAdmin = async(req, res) => {
    const id = req.params.id;

    try {
        const admin = await admin.findOne({
            where: { id: id }
        });
        if (!admin) {
            return res.status(401).send({
                status: 'Failed',
                message: 'Admin tidak ditemukan'
            });
        }
        await admin.destroy({
            where: { id: id }
        });
        res.send({
            status: 'Success',
            message: 'Admin berhasil dihapus'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'Failed',
            message: 'Internal server error'
        });
    }
}

/* ------------------------- FIRMA ---------------------------  */

/* ------------ Create Firma ------------ */
exports.createFirma = async(req, res) => {
    const { nama_firma, email, alamat, phone, deskripsi, website } = req.body;
    const foto = req.file.filename;

    try {
        const newFirma = await firma.create({
            nama_firma,
            email,
            alamat,
            phone,
            foto,
            deskripsi,
            website
        });
        res.status(200).json({
            status: 'Success',
            message: 'Firma berhasil ditambahkan',
            data: {
                nama_firma: newFirma.nama_firma,
                email: newFirma.email,
                alamat: newFirma.alamat,
                phone: newFirma.phone,
                foto: newFirma.foto,
                deskripsi: newFirma.deskripsi,
                website: newFirma.website
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

/* ---------- Update Firma ------------ */
exports.updateFirma = async(req, res) => {
    const id = req.params.id;
    const { nama_firma, email, alamat, phone, deskripsi, website } = req.body;
    const foto = req.file.filename;

    try {
        const firma = await firma.findOne({
            where: { id: id }
        });
        if (!firma) {
            return res.status(401).send({
                status: 'Failed',
                message: 'Firma tidak ditemukan'
            });
        }
        await firma.update({
            nama_firma,
            email,
            alamat,
            phone,
            foto,
            deskripsi,
            website
        }, {
            where: { id: id }
        });
        res.send({
            status: 'Success',
            message: 'Firma berhasil diupdate'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'Failed',
            message: 'Internal server error'
        });
    }
}

/* ------------ Delete Firma ------------ */
exports.deleteFirma = async(req, res) => {
    const id = req.params.id;

    try {
        const firma = await firma.findOne({
            where: { id: id }
        });
        if (!firma) {
            return res.status(401).send({
                status: 'Failed',
                message: 'Firma tidak ditemukan'
            });
        }
        await firma.destroy({
            where: { id: id }
        });
        res.send({
            status: 'Success',
            message: 'Firma berhasil dihapus'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'Failed',
            message: 'Internal server error'
        });
    }
}

/* ------------ Categories ------------ */

// Create Categories 
exports.createCategories = async(req, res) => {
    const { nama_kategori, deskripsi } = req.body;
    const foto = req.file.filename;

    try {
        const newCategories = await categories.create({
            nama_kategori,
            deskripsi,
            foto
        });
        res.status(200).json({
            status: 'Success',
            message: 'Kategori berhasil ditambahkan',
            data: {
                nama_kategori: newCategories.nama_kategori,
                deskripsi: newCategories.deskripsi,
                foto: newCategories.foto
            }
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

// Update Categories
exports.updateCategories = async(req, res) => {
    const id = req.params.id;
    const { nama_kategori, deskripsi } = req.body;
    const foto = req.file.filename;

    try {
        const categories = await categories.findOne({
            where: { id: id }
        });
        if (!categories) {
            return res.status(401).send({
                status: 'Failed',
                message: 'Kategori tidak ditemukan'
            });
        }
        await categories.update({
            nama_kategori,
            deskripsi,
            foto
        }, {
            where: { id: id }
        });
        res.send({
            status: 'Success',
            message: 'Kategori berhasil diupdate'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'Failed',
            message: 'Internal server error'
        });
    }
}

// Delete Categories
exports.deleteCategories = async(req, res) => {
    const id = req.params.id;

    try {
        const categories = await categories.findOne({
            where: { id: id }
        });
        if (!categories) {
            return res.status(401).send({
                status: 'Failed',
                message: 'Kategori tidak ditemukan'
            });
        }
        await categories.destroy({
            where: { id: id }
        });
        res.send({
            status: 'Success',
            message: 'Kategori berhasil dihapus'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'Failed',
            message: 'Internal server error'
        });
    }
}