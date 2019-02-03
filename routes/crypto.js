const logger = require('../utils/logger.js').getLogger();
//Basic encrypt and decrypt using crypto
const algorithm = 'aes-192-cbc';
const iv = Buffer.alloc(16, 0); // Initialization vector.

let crypto;

try {
  crypto = require('crypto');
} catch (err) {
  logger.error('crypto support is disabled!');
}
exports.encrypt = (text, password) => {
    var key = crypto.scryptSync(password, 'salt', 24);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    try {
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        logger.debug('Encrypted'+ text);
        return encrypted;
    }catch (err) {
        logger.error(err);
    }
};

exports.decrypt = (text, password) => {
    var key = crypto.scryptSync(password, 'salt', 24);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    try {
        let decrypted = decipher.update(text, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        logger.debug('Decrypted'+ text);
        return decrypted;
    } catch (err) {
        logger.error(err);
    }
};