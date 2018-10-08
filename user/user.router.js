var express        = require('express');
var router         = express.Router();
var RequestStatus  = require('../constants/requestStatus');
var userController = require('./user.controller');

function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else{
        res.status(RequestStatus.UNAUTHORIZED).send('User not logged.');
    }
}

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

//user/:user_id/is_following?collection_id=id
//user/:user_id/is_following?user_id=id
router.get('/:user_id/is_following', userController.isFollowing);

//user/:user_id/liked?collection_id=id
router.get('/:user_id/liked', userController.likedCollection);

module.exports = router;
