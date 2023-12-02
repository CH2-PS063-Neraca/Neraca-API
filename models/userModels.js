const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confPassword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
    },
    tanggal_lahir: {
        type: DataTypes.DATEONLY,
    },
    alamat: {
        type: DataTypes.STRING,
    },
    foto: {
        type: DataTypes.STRING,
    },
    jenis_kelamin: {
        type: DataTypes.STRING,
    },
});


module.exports = User;