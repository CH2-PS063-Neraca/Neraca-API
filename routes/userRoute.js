const express = require('express');
const controller = require('../controllers/userController');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/users', controller.getUsers);
    app.post('/api/updatePassword', controller.updateUserPassword);
}
