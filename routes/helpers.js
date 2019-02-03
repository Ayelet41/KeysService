const logger = require('../utils/logger.js').getLogger();

exports.health = (req, res) => {
    logger.debug("I am healthy");
    res.status(200).send("Healthy at " + new Date());
};

