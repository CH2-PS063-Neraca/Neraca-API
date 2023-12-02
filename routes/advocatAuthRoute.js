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

    app.post('/api/registerAdvocat', controller.registerAdvocat);
    app.post('/api/loginAdvocat', controller.loginAdvocat);
    app.post('/api/logoutAdvocat', controller.logoutAdvocat);
}