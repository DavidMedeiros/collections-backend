/**
 * @swagger
 * resourcePath: /api/album
 * description: All about API
 */

var express = require('express');
var router = express.Router();
var RequestStatus = require('../constants/requestStatus');
var albumController = require('./album.controller');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(RequestStatus.UNAUTHORIZED).send('User not logged.');
    }
}

/**
 * @swagger
 * path: /api/album
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all albums
 *      notes: Returns all albums
 *      responseClass: Album
 *      nickname: album
 *      consumes: 
 *        - application/json
 */
 
router.get('/', albumController.index);

router.get('/:album_id', albumController.show);

router.post('/', albumController.create);

router.put('/:album_id', albumController.update);

router.delete('/:album_id', albumController.delete);

module.exports = router;