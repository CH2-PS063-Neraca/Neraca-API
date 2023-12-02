const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const firmLaw = sequelize.define('firm_law', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nama_firm: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    alamat: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    foto: {
        type: DataTypes.STRING,
    },
    deskripsi: {
        type: DataTypes.STRING,
    },
    website: {
        type: DataTypes.STRING,
    },
});

module.exports = firmLaw;