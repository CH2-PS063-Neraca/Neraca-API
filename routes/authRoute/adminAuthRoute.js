const express = require('express');
const controller = require('../../controllers/auth/adminAuth');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/admin/register', controller.registerAdmin);
    app.post('/api/admin/login', controller.loginAdmin);
    app.delete('/api/admin/delete/:id', controller.deleteAdmin);
    app.post('/api/admin/logout', controller.logoutAdmin);
}