var express = require('express');
var router = express.Router();

var collectionController = require('../controllers/collection');

router.get('/', collectionController.index);

router.get('/:collection_id', collectionController.show);

router.post('/', collectionController.create);

router.put('/:collection_id', collectionController.update);

router.delete('/:collection_id', collectionController.delete);

module.exports = router;