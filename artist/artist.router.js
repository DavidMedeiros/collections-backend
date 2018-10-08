var express          = require('express');
var router           = express.Router();
var RequestStatus    = require('../constants/requestStatus');
var artistController = require('./artist.controller');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(RequestStatus.UNAUTHORIZED).send('User not logged.');
    }
}

router.get('/', checkAuthentication, artistController.index);

router.get('/:artist_id', checkAuthentication, artistController.show);

router.post('/', checkAuthentication, artistController.create);

router.put('/:artist_id', checkAuthentication, artistController.update);

router.delete('/:artist_id', checkAuthentication, artistController.delete);

module.exports = router;