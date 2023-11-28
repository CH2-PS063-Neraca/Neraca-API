const User = require('../models/userModels');

const checkDuplicateUsername = async function(username){
    try {
        let user = await User.findOne({
            where: {
                username,
            }
        });
        if (user) {
            return user;
        }
    } catch (error) {
        return error;
    }
}

const checkDuplicateEmail = async function(email) {
    try {
        let user = await User.findOne({
            where: {
                email
            }
        });
        if (user) {
            return user;
        }

    } catch (error) {
        return error;
    }
}

module.exports = { checkDuplicateUsername, checkDuplicateEmail };