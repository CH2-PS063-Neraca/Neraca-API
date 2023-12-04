const express = require('express');
const controller = require('../controllers/lawfirmController');

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    
    app.get('/api/firm-law/getFirm', controller.getFirm);
    app.post('/api/firm-law/create', controller.createFirm);
    app.put('/api/firm-law/edit-firm/:id', controller.editFirm);
    app.delete('/api/firm-law/delete-firm/:id', controller.deleteFirm);
    
    // app.get('/api/getFirm/:id', controller.getFirmById);
    // app.get('/api/getFirm/:nama_firm', controller.getFirmByNama);
    // app.get('/api/getFirm/:email', controller.getFirmByEmail);
    // app.get('/api/getFirm/:alamat', controller.getFirmByAlamat);
    // app.get('/api/getFirm/:phone', controller.getFirmByPhone);
    // app.get('/api/getFirm/:foto', controller.getFirmByFoto);
    // app.get('/api/getFirm/:deskripsi', controller.getFirmByDeskripsi);
    // app.get('/api/getFirm/:website', controller.getFirmByWebsite);
}