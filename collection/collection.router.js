var express              = require('express');
var router               = express.Router();
var RequestStatus        = require('../constants/requestStatus');
var collectionController = require('./collection.controller');

 

router.get('/',  collectionController.index);

router.get('/:collection_id', collectionController.show);

router.post('/', /*checkAuthentication,*/ collectionController.create);

router.put('/:collection_id', collectionController.update);

router.delete('/:collection_id', collectionController.delete);

router.put('/:collection_id/album', collectionController.addAlbum);

router.delete('/:collection_id/album/:album_id', collectionController.removeAlbum);

module.exports = router;
