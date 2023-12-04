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

    app.get('/api/user/get-users', controller.getUsers);
    app.post('/api/user/update-password', controller.updateUserPassword);
    app.post('/api/user/forgot-password', controller.forgotPassword);
    app.post('/api/user/update-profile', controller.updateProfile);
}
