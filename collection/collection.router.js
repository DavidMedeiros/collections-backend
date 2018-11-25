var express              = require('express');
var router               = express.Router();
var RequestStatus        = require('../constants/requestStatus');
var collectionController = require('./collection.controller');

function checkAuthentication(req,res,next){
  console.log(req.session);
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(RequestStatus.UNAUTHORIZED).send('User not logged.');
    }
}

router.get('/', checkAuthentication, collectionController.index);

router.get('/:collection_id', checkAuthentication, collectionController.show);

router.post('/', /*checkAuthentication,*/ collectionController.create);

router.put('/:collection_id', checkAuthentication, collectionController.update);

router.delete('/:collection_id', checkAuthentication, collectionController.delete);

router.put('/:collection_id/album', checkAuthentication, collectionController.addAlbum);

router.delete('/:collection_id/album/:album_id', checkAuthentication, collectionController.removeAlbum);

module.exports = router;