var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

keyProvider = function(host, port) {
  this.db= new Db('node-mongo-key', new Server(host, port, {safe: false}, {auto_reconnect: true}, {}));
  this.db.open(function(){});
};


keyProvider.prototype.getCollection= function(callback) {
  this.db.collection('keys', function(error, key_collection) {
    if( error ) callback(error);
    else callback(null, key_collection);
  });
};

//find all keys
keyProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, key_collection) {
      if( error ) callback(error)
      else {
        key_collection.find().toArray(function(error, results) {
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};

//find a key by ID
keyProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, key_collection) {
      if( error ) callback(error)
      else {
        key_collection.findOne({_id: id}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

//find a key by ID
keyProvider.prototype.GetByPartId = function(id, callback) {
    this.getCollection(function(error, key_collection) {
      if( error ) callback(error)
      else {
          key_collection.find({ "_id": { "$regex": "^" + id } }).toArray(function(error, results){
          if( error ) callback(error)
          else callback(null, results)
        });
      }
    });
};


//save new key
keyProvider.prototype.save = function(keys, callback) {
    this.getCollection(function(error, key_collection) {
      if( error ) callback(error)
      else {
        if( typeof(keys.length)=="undefined")
          keys = [keys];

        for( var i =0;i< keys.length;i++ ) {
          key = keys[i];
          key.created_at = new Date();
        }
        key_collection.insert(key, function() {
          callback(null, key);
        });
      }
    });
};

// update an key
keyProvider.prototype.update = function(keyId, keys, callback) {
    this.getCollection(function(error, key_collection) {
      if( error ) callback(error);
      else {
        key_collection.update(
					{_id: keyId},
					keys,
					function(error, keys) {
						if(error) callback(error);
						else callback(null, keys)       
					});
      }
    });
};

//delete key
keyProvider.prototype.delete = function(keyId, callback) {
	this.getCollection(function(error, key_collection) {
		if(error) callback(error);
		else {
			key_collection.remove(
				{_id: keyId},
				function(error, key){
					if(error) callback(error);
					else callback(null, key)
				});
			}
	});
};

exports.keyProvider = keyProvider;