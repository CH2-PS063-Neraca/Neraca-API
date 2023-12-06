const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        res.status(403).send({
            status: 'Failed',
            message: 'Token tidak tersedia'
        });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            res.status(401).send({
                status: 'Failed',
                message: 'Unauthorized'
            });
        }
        req.userId = decoded.id;
        next();
    });
}

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].nama_role === 'admin') {
                    next();
                    return;
                }
            }
            res.status(403).send({
                status: 'Failed',
                message: 'Require Admin Role!'
            });
            return;
        });
    });
}

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
};

module.exports = authJwt;