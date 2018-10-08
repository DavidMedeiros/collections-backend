var express         = require('express');
var router          = express.Router();
var RequestStatus   = require('../constants/requestStatus');
var trackController = require('./track.controller');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(RequestStatus.UNAUTHORIZED).send('User not logged.');
    }
}

router.get('/', checkAuthentication, trackController.index);

router.get('/:track_id', checkAuthentication, trackController.show);

router.post('/', checkAuthentication, trackController.create);

router.put('/:track_id', checkAuthentication, trackController.update);

router.delete('/:track_id', checkAuthentication, trackController.delete);

module.exports = router;