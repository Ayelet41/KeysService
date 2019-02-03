const helpers = require('./helpers.js');
const apis = require('./apis.js');

module.exports = (app) => {
    app.get('/health', helpers.health);
    app.get('/', apis.getIndex);
    app.post('/store_key', apis.storeKey);
    app.get('/retrieve_key', apis.retrieveKey);
    app.post('/key/delete', apis.deleteKey);

};
