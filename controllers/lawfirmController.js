const firmLaw = require('../models/lawFirmModels');


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