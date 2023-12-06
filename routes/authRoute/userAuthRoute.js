const express = require('express');
const controller = require('../../controllers/auth/userAuth');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/auth/register', controller.register);
    app.post('/api/auth/login', controller.signIn);
    app.post('/api/auth/logout', controller.signOut);

}