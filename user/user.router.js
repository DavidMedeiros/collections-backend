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

router.get('/', checkAuthentication, userController.index);

router.get('/:user_id', checkAuthentication, userController.show);

router.post('/', userController.create);

router.put('/:user_id', checkAuthentication, userController.update);

router.delete('/:user_id', checkAuthentication, userController.delete);

router.put('/:user_id/follow/collection', checkAuthentication, userController.followCollection);

router.delete('/:user_id/unfollow/collection/:collection_id', checkAuthentication, userController.unfollowCollection);

router.put('/:user_id/follow/user', checkAuthentication, userController.followUser);

router.delete('/:user_id/unfollow/user/:another_user_id', checkAuthentication, userController.unfollowUser);

router.put('/:user_id/like/collection', checkAuthentication, userController.likeCollection);

router.delete('/:user_id/dislike/collection/:collection_id', checkAuthentication, userController.dislikeCollection);

//user/:user_id/is_following?collection_id=id
//user/:user_id/is_following?user_id=id
router.get('/:user_id/is_following', userController.isFollowing);

//user/:user_id/liked?collection_id=id
router.get('/:user_id/liked', userController.likedCollection);

module.exports = router;
