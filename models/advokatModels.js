const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Advokat = sequelize.define('advokat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pengalaman: {
        type: DataTypes.STRING,
    },
    biografi: {
        type: DataTypes.STRING,
    },
    pendidikan: {
        type: DataTypes.STRING,
    },
    lokasi: {
        type: DataTypes.STRING,
    },
    harga_konsultasi_chat: {
        type: DataTypes.INTEGER,
    },
    harga_konsultasi_video: {
        type: DataTypes.INTEGER,
    },
    harga_konsultasi_tatap_muka: {
        type: DataTypes.INTEGER,
    },
});

module.exports = Advokat;