/**
 * @swagger
 * resourcePath: /api/artist
 * description: All about API
 */

var express = require('express');
var router = express.Router();
var RequestStatus = require('../constants/requestStatus');
var artistController = require('./artist.controller');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(RequestStatus.UNAUTHORIZED).send('User not logged.');
    }
}

/**
 * @swagger
 * path: /api/artist
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all artists
 *      notes: Returns all artists
 *      responseClass: Artist
 *      nickname: artist
 *      consumes: 
 *        - application/json
 */
 
router.get('/', checkAuthentication, artistController.index);

router.get('/:artist_id', artistController.show);

router.post('/', artistController.create);

router.put('/:artist_id', artistController.update);

router.delete('/:artist_id', artistController.delete);

module.exports = router;