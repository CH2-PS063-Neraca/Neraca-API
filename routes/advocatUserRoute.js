const express = require('express');
const controller = require('../controllers/advocatUserController');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/advocat/get-advocat', controller.getAllAdvokat);
    app.post('/api/advocat/update-password', controller.updatePassword)
    app.post('/api/advocat/forgot-password', controller.forgotPassword);
    app.delete('/api/advocat/delete', controller.deleteAdvokat);
}