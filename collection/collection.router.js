/**
 * @swagger
 * resourcePath: /api/collection
 * description: All about API
 */

var express = require('express');
var router = express.Router();

var collectionController = require('./collection.controller');

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
 
router.get('/', collectionController.index);

router.get('/:collection_id', collectionController.show);

router.post('/', collectionController.create);

router.put('/:collection_id', collectionController.update);

router.delete('/:collection_id', collectionController.delete);

module.exports = router;