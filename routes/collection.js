/**
 * @swagger
 * resourcePath: /assss/collections
 * description: All about API
 */

var express = require('express');
var router = express.Router();

var collectionController = require('../controllers/collection');

/**
 * @swagger
 * path: /login
 * operations:
 *   -  httpMethod: POST
 *      summary: Login with username and password
 *      notes: Returns a user based on username
 *      responseClass: User
 *      nickname: login
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: username
 *          description: Your username
 *          paramType: query
 *          required: true
 *          dataType: string
 *        - name: password
 *          description: Your password
 *          paramType: query
 *          required: true
 *          dataType: string
 */

router.get('/', collectionController.index);

router.get('/:collection_id', collectionController.show);

router.post('/', collectionController.create);

router.put('/:collection_id', collectionController.update);

router.delete('/:collection_id', collectionController.delete);

module.exports = router;