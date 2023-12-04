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
    confPassword: {
        type: DataTypes.STRING,
    },
    firma: {
        type: DataTypes.STRING,
    },
    pengalaman: {
        type: DataTypes.STRING,
    },
    keahlian: {
        type: DataTypes.STRING,
    },
    biografy: {
        type: DataTypes.STRING,
    },
    foto: {
        type: DataTypes.STRING,
    },
    riwayat_kasus: {
        type: DataTypes.STRING,
    },
    pendidikan: {
        type: DataTypes.STRING,
    },
    lokasi: {
        type: DataTypes.STRING,
    },
});

module.exports = Advokat;