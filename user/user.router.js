var express = require('express');
var router = express.Router();

var userController = require('./user.controller');

router.get('/', userController.index);

router.get('/:user_id', userController.show);

router.post('/', userController.create);

router.put('/:user_id', userController.update);

router.delete('/:user_id', userController.delete);

router.post('/:user_id/follow/collection', userController.followCollection);

router.delete('/:user_id/unfollow/collection/:collection_id', userController.unfollowCollection);

router.post('/:user_id/follow/user', userController.followUser);

router.delete('/:user_id/unfollow/user/:user_id', userController.unfollowUser);

router.post('/:user_id/like/collection', userController.likeCollection);

router.delete('/:user_id/dislike/collection/:collection_id', userController.dislikeCollection);

module.exports = router;
