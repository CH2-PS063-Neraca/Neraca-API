const firmLaw = require('../models/lawFirmModels');

exports.createFirm = async(req, res) => {
    try {
        const newFirm = await firmLaw.create({
            nama_firm: req.body.nama_firm,
            email: req.body.email,
            alamat: req.body.alamat,
            phone: req.body.phone,
            foto: req.body.foto,
            deskripsi: req.body.deskripsi,
            website: req.body.website
        });
        res.status(200).send({
            status: 'Success',
            message: 'Berhasil membuat data firma',
            data: newFirm
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'Failed',
            message: 'Gagal membuat data firma'
        });
    }
}

exports.editFirm = async(req, res) => {
    try {
        const id = req.params.id;
        const editFirm = await firmLaw.update({
            nama_firm: req.body.nama_firm,
            email: req.body.email,
            alamat: req.body.alamat,
            phone: req.body.phone,
            foto: req.body.foto,
            deskripsi: req.body.deskripsi,
            website: req.body.website
        }, {
            where: { id: id }
        });
        res.status(200).send({
            status: 'Success',
            message: 'Berhasil mengubah data firma',
            data: editFirm
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'Failed',
            message: 'Gagal mengubah data firma'
        });
    }
}

exports.deleteFirm = async(req, res) => {
    try {
        const id = req.params.id;
        const deleteFirm = await firmLaw.destroy({
            where: { id: id }
        });
        res.status(200).send({
            status: 'Success',
            message: 'Berhasil menghapus data firma',
            data: deleteFirm
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'Failed',
            message: 'Gagal menghapus data firma'
        });
    }
}

exports.getFirm = async(req, res) => {
    try {
        const getFirm = await firmLaw.findAll({});
        res.status(200).send({
            status: 'Success',
            message: 'Berhasil mendapatkan data firma',
            data: getFirm
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            status: 'Failed',
            message: 'Gagal mendapatkan data firma'
        });
    }
}   