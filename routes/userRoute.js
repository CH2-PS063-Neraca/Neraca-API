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

    app.get('/api/user/users', controller.getUsers);
    app.get('/api/user/profile/:id', controller.getUserProfile);
    app.get('/api/user/profile-setting/:id', controller.getUserProfileSetting);
    

    app.post('/api/user/update-email/:id', controller.updateUserEmail);
    app.post('/api/user/update-phone/:id', controller.updateUserPhone);

    app.post('/api/user/update-password', controller.updateUserPassword);
    app.post('/api/user/forgot-password', controller.forgotPassword);
    app.post('/api/user/update-profile', controller.updateProfile);
}
