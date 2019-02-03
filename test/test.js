const server   = require('../app');
const logger   = require('../utils/logger.js').getLogger();
const chai     = require('chai');
const chaiHttp = require('chai-http');
const mytestid ='mytestid';
const password ='password';
const wrongpass='wrongpass';
const mystring    ='mystring';
chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();

describe('Store and retrieve key func', () => {
    context('Health check', function() {
        it('should respond 200', (done) => {
          chai.request(server)
            .get('/health')
            .end((err, res) => {
                res.status.should.equal(200);
                done();
            });
    })});
    context('Store key', function() {
        it('Store key and  respond 200', (done) => {
            chai.request(server)
                .post('/store_key?id='+mytestid+'&password='+password+'&value='+mystring)
                .end((err, res) => {
                    res.status.should.equal(200);
                    done();
                });
        });
        it('Store key with diff pass and respond 200', (done) => {
            chai.request(server)
                .post('/store_key?id='+mytestid+'1&password='+wrongpass+'&value='+mystring)
                .end((err, res) => {
                    res.status.should.equal(200);
                    done();
                });
        });
    });
        it('should get value', (done) => {
            chai.request(server)
                .get('/retrieve_key?id='+mytestid+'1&password='+password)
                .end((err, res) => {
                    res.status.should.equal(200);
                    try {
                        res.body.should.be.eql(['mystring']);
                    }
                    catch (e) {
                        done(e);
                    }});
        });
        it('should get value and an error(null)', (done) => {
            chai.request(server)
                .get('/retrieve_key?id='+mytestid+'&password='+password)
                .end((err, res) => {
                    try{
                        res.status.should.equal(200);
                        res.body.should.be.eql([null, 'mystring']);
                        }
                    catch (e) {
                        done(e);
                    }});
        });

    context('Delete keys', function() {
        it('Delete key and  respond 200', (done) => {
            chai.request(server)
                .post('/key/delete/?id='+mytestid)
                .end((err, res) => {
                    res.status.should.equal(200);
                    done();
                });
        });
        it('Delete key2 respond 200', (done) => {
            chai.request(server)
                .post('/key/delete/?id=' + mytestid + '1')
                .end((err, res) => {
                    //console.log(err,res)
                    res.status.should.equal(200);
                    done();
                });
        });
    });

    after(() => {
            // runs after all tests in this block
            server.close();
            process.exit(0);
        });

});


