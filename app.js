/**
 * Module dependencies.
 */

const logger = require('./utils/logger.js').getLogger();
const env = process.env.NODE_ENV || 'localhost';
const processName = 'key_store';
const util = require('util');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;


const app = express();

require('./routes')(app); //setting routes


//Express application

app.configure(function(){
  app.set('port', port || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


/** Process, etc: **/
process.on('uncaughtException', function (err) {
    logger.error("uncaughtException:" + util.inspect(err));
});

process.on('unhandledRejection', function (err) {
    logger.error("unhandledRejection:" + util.inspect(err));
});

/*Init*/
console.log("Setting up  express server!");
logger.info("Setting up "+processName+"express server on port "+ port+ " on env "+ env);
module.exports = app.listen(port , (err) => {
    if (err)
        logger.error("Error running the server"+ util.inspect(err));
   logger.info(processName + ' server is running.');
});

