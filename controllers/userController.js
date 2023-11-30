const { User } = require('../models/userModels');
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
exports.updatePassword = async (req, res) => {
    try {
        const id = req.id;

        const { password, newPassword, confPassword } = req.body;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).send({
                status: 'Failed',
                message: 'User not found',
            });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(401).send({
                status: 'Failed',
                message: 'Incorrect current password, please check your password',
            });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const updateUser = await User.update(
            { password: hashedPassword },
            {
                where: {
                    id: id,
                },
            }
        );

        if (updateUser) {
            return res.status(200).send({
                status: 'Success',
                message: 'Update berhasil',
            });
        } else {
            return res.status(500).send({
                status: 'Failed',
                message: 'Update failed',
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            status: 'Failed',
            message: 'Internal server error',
        });
    }
};

/* -------- Update Profile -------- */
/* -------- Get User Profile -------- */