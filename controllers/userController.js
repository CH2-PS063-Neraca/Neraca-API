const User = require('../models/userModels');
const { updateFunction } = require('../middleware/updatePassword');
const bcrypt = require('bcryptjs');


/* ----------- Get User ------------- */
exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email'],
        });
        res.send(users);
    } catch (error) {
        res.status(401).send({
            status: 'Failed',
            message: 'Terjadi kesalahan mendapatkan user'
        });
    }
}
/* -------- Update Password ------- */
exports.updateUserPassword = async (req, res) => {
    const id = req.body.id;

    const { currentPassword, newPassword, confPassword } = req.body;
    if (!currentPassword || !newPassword || !confPassword) {
        return res.status(500).send({
            status: 'Failed',
            message: 'Semua field harus di isi'
        })
    }
    if (newPassword !== confPassword) {
        return res.status(500).send({
            status: 'Failed',
            message: 'Password tidak sesuai, silahkan periksa kembali password anda'
        })
    }

    const user = await User.findOne({
        id: id,
    });
    if (!user) {
        return res.status(404).send({
            status: 'Failed',
            message: 'User tidak ditemukan'
        })
    }

    const matchPassword = await bcrypt.compare(currentPassword, user.password);
    if (!matchPassword) {
        return res.status(500).send({
            status: 'Failed',
            message: 'Incorrect current password, please check your password'
        })
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updateUser = await User.update(
        { password: hashedPassword},
        {
            where: {
                id: id,
            },
        }
    );
    if (updateUser) {
        return res.status(200).send({
            status: 'Success',
            message: 'Update berhasil'
        })
    } else {
        return res.status(500).send({
            status: 'Failed',
            message: 'Update gagal'
        })
    }
};


/* -------- Forgot Password ------- */
/* -------- Update Profile -------- */
/* -------- Get User Profile -------- */