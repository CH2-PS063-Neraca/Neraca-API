const express = require('express');
const controller = require('../controllers/advocatAuthController');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/advocat/register', controller.registerAdvocat);
    app.post('/api/advocat/login', controller.loginAdvocat);
    app.post('/api/advocat/logout', controller.logoutAdvocat);
}