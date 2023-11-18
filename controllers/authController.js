const db = require('../models');
// const config = require('../config/dbConfig');
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// User Register
exports.signUp = async (req, res) => {
    // Save user ke database
    try {
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        });

        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles,
                    },
                },
            });
            const result = user.setRoles(roles);
            if(result) res.send({ message: 'Berhasil Mendaftar! '});

        } else {
            if(result) res.send({ message: 'Berhasil Mendaftar! '});
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// User Login
exports.signIn = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.body.username,
            },
        });
        if (!user) {
            return res.status(404).send({ message: 'User tidak ditemukan! ' });
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Password yang anda masukkan salah! ' });
        }

        const token = jwt.sign({
            id: user.id,
        }, config.secret, {
            algorithm: 'HS256',
            allowInsecureKeySizes: true,
            expiresIn: 86400, //24jam
        })

        let authorities = [];
        const roles = await user.getRoles();
        for (let i = 0; index < roles.length; i++) {
            authorities.push('ROLES_' + roles[i].name.toUpperCase());
        }
        req.session.token = token;

    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
};

// User Logout
exports.signOut = async (req, res) => {
    try {
        req.session = null;
        return res.status(200).send({ message: 'Anda telah keluar! ' });
    } catch (error) {
        this.next(error);
    }
}