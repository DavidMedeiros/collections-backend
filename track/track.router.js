/**
 * @swagger
 * resourcePath: /api/track
 * description: All about API
 */

var express = require('express');
var router = express.Router();
var RequestStatus = require('../constants/requestStatus');
var trackController = require('./track.controller');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(RequestStatus.UNAUTHORIZED).send('User not logged.');
    }
}

/**
 * @swagger
 * path: /api/track
 * operations:
 *   -  httpMethod: GET
 *      summary: Get all tracks
 *      notes: Returns all tracks
 *      responseClass: Track
 *      nickname: track
 *      consumes: 
 *        - application/json
 */
 
router.get('/', checkAuthentication, trackController.index);

router.get('/:track_id', trackController.show);

router.post('/', trackController.create);

router.put('/:track_id', trackController.update);

router.delete('/:track_id', trackController.delete);

module.exports = router;