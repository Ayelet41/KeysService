Employee Database
=====================

**Basic keys service with encrypt and decrypt**
 
 Base was forked from and changed to suits requirements github.com/ijason/NodeJS-Sample-App/

## Requirements

* Node
* Express
* MongoDB
* Mocha
* Chai
* Winston

## Implementation Instructions

In current configuration mongo is running on same local host

##Usage
Browse to http://localhost:3000 to see current keys list
-GET /health
To store encrypted key:
- POST /store_key/?id=<id>&value=<val>&password=<pass>
 To Get decrypted value
- GET /retrieve_key?id=<id>&password=<pass>
To delete keys
- POST /key/delete/?id=<id>


