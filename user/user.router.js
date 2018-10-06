var express = require('express');
var router = express.Router();

var userController = require('./user.controller');

router.get('/', userController.index);

router.get('/:user_id', userController.show);

router.post('/', userController.create);

router.put('/:user_id', userController.update);

router.delete('/:user_id', userController.delete);

router.post('/follow/collection', userController.followCollection);

// router.delete('/unfollow/collection/:collection_id', userController.unfollowCollection);
//
// router.post('/follow/user', userController.followUser);
//
// router.delete('/unfollow/user/:user_id', userController.unfollowUser);

module.exports = router;
