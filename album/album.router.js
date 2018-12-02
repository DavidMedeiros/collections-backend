var express         = require('express');
var router          = express.Router();
var RequestStatus   = require('../constants/requestStatus');
var albumController = require('./album.controller');

function checkAuthentication(req,res,next){
  if(req.isAuthenticated()){
    next();
  } else{
    res.status(RequestStatus.UNAUTHORIZED).send('User not logged.');
  }
}

router.get('/', checkAuthentication, albumController.index);

router.get('/search', checkAuthentication, albumController.search);

router.get('/:album_id', checkAuthentication, albumController.show);

router.post('/', checkAuthentication, albumController.create);

router.put('/:album_id', checkAuthentication, albumController.update);

router.delete('/:album_id', checkAuthentication, albumController.delete);


module.exports = router;