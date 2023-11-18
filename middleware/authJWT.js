const config = require('../config/authConfig');
const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.session.token;
    if (!token) {
        return res.status(403).send({ message: 'Tidak ada token!' });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized!' });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdvokat = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();

        for (let i = 0; index < roles.length; i++) {
            if (roles[i].name === 'advokat') {
                return next();
            }
        }
        return res.status(403).send({ message: 'Require advokat roles!' });

    } catch (error) {
        return res.status(500).send({ message: 'Unable to validate user role!' });
    }
};

isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        const roles = await user.getRoles();

        for (let i = 0; index < roles.length; i++) {
            if (roles[i].name === 'advokat') {
                return next();
            }
        }
        return res.status(403).send({ message: 'Require admin roles!' });
    } catch (error) {
        return res.status(500).send({ message: 'Unable to validate user role'})
    }
};