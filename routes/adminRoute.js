const express = require('express');
const controller = require('../controllers/adminController');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/admin/get-admin', controller.getAllAdmin);
    app.post('/api/admin/update-password', controller.updatePassword)
    app.post('/api/admin/forgot-password', controller.forgotPassword);
    app.delete('/api/admin/delete', controller.deleteAdmin);

    // Firma Hukum Route
    app.post('/api/admin/create-firm', controller.createFirma);
    app.post('/api/admin/update-firm', controller.updateFirma);
    app.delete('/api/admin/delete-firm', controller.deleteFirma);

    // Categories Route
    app.post('/api/admin/create-category', controller.createCategories);
    app.post('/api/admin/update-category', controller.updateCategories);
    app.delete('/api/admin/delete-category', controller.deleteCategories);
    
}