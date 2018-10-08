var express        = require('express');
var router         = express.Router();
var userController = require('./user.controller');

/**
 * @swagger
 * resourcePath: /api/user
 * description: User operations
 */

/**
 * @swagger
 * path: /api/user/
 * operations:
 *   -  httpMethod: GET
 *      summary: Get Users
 *      notes: Returns a list of all Users.
 *      responseClass: User
 *      nickname: index-users
 *      consumes:
 *        - application/json
 */
router.get('/', userController.index);

/**
 * @swagger
 * path: /api/user/{user_id}
 * operations:
 *   -  httpMethod: GET
 *      summary: Get User By ID
 *      notes: Display details for a specific User.
 *      responseClass: User
 *      nickname: get-user
 *      parameters:
 *        - name: user_id
 *          description: Id of user.
 *          paramType: path
 *          required: true
 *          dataType: string
 */
router.get('/:user_id', userController.show);

/**
 * @swagger
 * path: /api/user
 * operations:
 *   -  httpMethod: POST
 *      summary: Create a new user
 *      notes: Returns a new User
 *      responseClass: User
 *      nickname: post-user
 *      consumes:
 *        - application/json
 *      parameters:
 *        - name: body
 *          description: Json with fields to create an user
 *          paramType: body
 *          dataType: User
 *          required: true
 */
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

/**
 * @swagger
 * models:
 *   User:
 *     id: User
 *     properties:
 *       name:
 *         type: String
 *         required: false
 *       username:
 *         type: String
 *         required: true
 *       email:
 *         type: String
 *         required: true
 *       password:
 *         type: String
 *         required: true
 *       birthday:
 *         type: Date
 *         required: false
 *       gender:
 *          type: Enum
 *          items:
 *             type: String
 *       bio:
 *         type: String
 *         required: false
 *       _collections:
 *         type: Array
 *         items:
 *            type: Collection.ObjectId
 *         required: false
 *       _following_users:
 *         type: Array
 *         items:
 *            type: User.ObjectId
 *         required: false
 *       _following_collections:
 *         type: Array
 *         items:
 *            type: Collection.ObjectId
 *         required: false
 *       _followers:
 *         type: Array
 *         items:
 *            type: User.ObjectId
 *         required: false
 *       _liked_collections:
 *         type: Array
 *         items:
 *            type: Collection.ObjectId
 *         required: false
 */

module.exports = router;
