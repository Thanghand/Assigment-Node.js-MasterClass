const crypto = require('crypto');


const HashUtil = {};

HashUtil.hash = function (password) {
    if (typeof (password) == 'string' && password.length > 0) {
        const hash = crypto.createHmac('sha256', config.hashingSecret).update(password).digest('hex');
        return hash;
    } else {
        return '';
    }
};

HashUtil.createRandomString = function (strLength) {
    strLength = typeof (strLength) == 'number' && strLength > 0 ? strLength : false;
    if (strLength) {
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';

        // Start the final string
        let  str = '';
        for (let i = 1; i <= strLength; i++) {
            const randomCharacter = possibleCharacters.
                                        charAt(Math.floor(Math.random() * possibleCharacters.length));
            str += randomCharacter;
        }
        return str;
    } else {
        return '';
    }
};

module.exports = HashUtil;