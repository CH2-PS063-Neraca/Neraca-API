const User = require('../models/userModels');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

require('dotenv').config();

/* ------------ Register User ------------ */
exports.register = async (req, res) =>{
    try {
        const { username, email, password, confPassword } = req.body;

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

        const checkUsername = await User.findOne({
            where: {
                username,
            }
        });
        if (checkUsername) {
            return res.status(500).send({
                status: 'Failed',
                message: 'Username sudah digunakan'
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

        if (!user || user.length === 0) {
            return res.status(401).json({
                status: 'Failed',
                message: 'User not found'
            });
        }

        const match = await bcrypt.compare(req.body.password, user[0].password);

        if (!match) {
            return res.status(401).json({
                status: 'Failed',
                message: 'Password yang anda masukkan salah'
            });
        }
        if (match) {
            return res.status(200).json({
                status: 'Success',
                message: 'Anda berhasil login'
            })
        }

        const id = user[0].id;
        const name = user[0].username;
        const mail = user[0].email;

        const accessToken = jwt.sign({ id, name, mail }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '24h',
        });
        const refreshToken = jwt.sign({ id, name, mail }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '24h',
        });

        const userUpdate = await User.update(
            { refresh_token: refreshToken },
            {
                where: {
                    id: id,
                }
            }
        );

        if (userUpdate) {
            return res.json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                id: id,
                name: name,
                mail: email,
            });
        } else {
            return res.status(500).json({
                status: 'Failed',
                message: 'Server internal error'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'Failed',
            message: 'Internal server error'
        });
    }
};

exports.signOut = async (req, res) => {
    const refreshToken = req.headers;

    if (!refreshToken) {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
    
    const userSignOut = await User.update(
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
