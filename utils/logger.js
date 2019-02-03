const winston = require('../node_modules/winston');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    label({ label: 'keys service' }),
    timestamp(),
    myFormat
  ),
  transports: [
    //new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

exports.getLogger = () => {
    return logger;
};