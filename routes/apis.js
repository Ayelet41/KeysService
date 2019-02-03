const logger = require('../utils/logger.js').getLogger();
const crypt  = require('./crypto.js');
const db     = 'localhost';
const dbport = 27017;

//Connection to DB
var keyProvider = require('../mongodb_keys').keyProvider;
var keyProvider = new keyProvider(db , dbport );

//index
exports.getIndex = (req, res) => {
  keyProvider.findAll(function(error, emps){
      if( error ) logger.error(error);
      else {
          res.render('index', {
              title: 'Welcome to the world of keys',
              keys:emps
          });
      }
  });
};


//save new key
exports.storeKey = (req, res) => {
    if (keyProvider.findById(req.param('id'))) logger.info("key exist skip");
    else {
        keyProvider.save({
            _id: req.param('id'),
            value: crypt.encrypt(req.param('value'), req.param('password'))
        }, function (error, docs) {
            if (docs) {
                logger.debug("Stored key" + req.param('id'));
                res.send(docs);
            }
            if (error) logger.error(error);
        });
    }
};

//Decrypt key
exports.retrieveKey = (req, res) => {
	keyProvider.GetByPartId(req.param('id'), function(error, keys) {
        if (!error) {
            let response = [];
            for (let i = 0; i < keys.length; i++) {
                response.push(crypt.decrypt(keys[i].value, req.param('password')));
            }
            if (response) res.send(response);
            else logger.error("Retrieve key Error");
        }
        else {
            logger.error(error);
        }
    });
};

//delete a key
exports.deleteKey = (req, res) => {
	keyProvider.delete(req.param('id'), function(error, docs) {
	    if( error ) logger.error(error);
        else {
            logger.debug("Deleted key"+req.param('id'));
            res.send(200);
        }
	});
};


