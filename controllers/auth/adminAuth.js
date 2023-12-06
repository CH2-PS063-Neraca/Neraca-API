const admin = require('../../models/adminModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();

/* ------------- Register Admin --------------- */
exports.registerAdmin = async(req, res) => {
    const { nama, email, password, confPassword } = req.body;
    try {
        const checkEmail = await admin.findOne({
            where: {
                email,
            }
        });
        if (checkEmail) {
            return res.status(500).send({
                status: 'Failed',
                message: 'Email sudah terdaftar'
            })
        }
        if (password !== confPassword) {
            return res.status(500).send({
                status: 'Failed',
                message: 'Konfirmasi password tidak sesuai'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = await admin.create({
            nama,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: newAdmin.id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '24h'
        });

        res.status(200).json({
            status: 'Success',
            message: 'Admin berhasil di tambahkan',
            data: newAdmin,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }

}

/* ------------ Login Admin ------------ */
exports.loginAdmin = async(req, res) => {
    const { email, password } = req.body;
    try {
        const checkEmail = await admin.findOne({
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
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

/* -------------- Delete Admin ----------------- */
exports.deleteAdmin = async(req, res) => {
    const id = req.params.id;
    try {
        const deleteAdmin = await admin.destroy({
            where: { id: id }
        });
        if (!deleteAdmin) {
            return res.status(401).send({
                status: 'Failed',
                message: 'Admin tidak ditemukan'
            });
        }
        res.status(200).json({
            status: 'Success',
            message: 'Admin berhasil di hapus'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            status: 'Failed',
            message: 'Server Error'
        })
    }
}

/* ------------ Logout Admin ------------ */
exports.logoutAdmin = async(req, res) => {
    const refreshToken = req.headers;

    if (!refreshToken) {
        return res.status(401).json({
            status: 'Failed',
            message: 'Token tidak tersedia'
        });
    }

    const userSignOut = await admin.update(
        { refresh_token: null },
        {
            where: {
                refresh_token: refreshToken,
            },
        }
    );

    if(userSignOut) return res.status(200).json({
        status: 'Success',
        message: 'Anda berhasil logout'
    })
};