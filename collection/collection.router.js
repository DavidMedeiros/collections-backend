

var express = require('express');
var router = express.Router();
var RequestStatus = require('../constants/requestStatus');
var collectionController = require('./collection.controller');

/**
 * @swagger
 * resourcePath: /api/collection
 * description: All about API
 */

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(RequestStatus.UNAUTHORIZED).send('User not logged.');
    }
}

/**
 * @swagger
 * path: /api/collection
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all collections
 *      notes: Returns all collections 
 *      responseClass: Collection
 *      nickname: collection
 *      consumes: 
 *        - application/json
 */
 
router.get('/', checkAuthentication, collectionController.index);

router.get('/:collection_id', collectionController.show);

router.post('/', collectionController.create);

router.put('/:collection_id', collectionController.update);

router.delete('/:collection_id', collectionController.delete);

router.post('/:collection_id/album', collectionController.addAlbum);

router.delete('/:collection_id/album/:album_id', collectionController.removeAlbum);

module.exports = router;