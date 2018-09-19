var express = require('express');
var router = express.Router();

var userController = require('./user.controller');

/**
 * @api {get} /user Get all Users
 * @apiName GetUsers
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object[]} users All users registred.
 * @apiSuccess {String} user.profile_name  Profile name of the User.
 * @apiSuccess {String} user.username  Username name of the User.
 * @apiSuccess {String} user.email  Email of the User.
 */
router.get('/', userController.index);

/**
 * @api {get} /user/:id Get User
 * @apiName GetUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam id Users unique ID.
 *
 * @apiSuccess {String} profile_name  Profile name of the User.
 * @apiSuccess {String} username  Username name of the User.
 * @apiSuccess {String} email  Email of the User.
 */
router.get('/:user_id', userController.show);

/**
 * @api {post} /user Create a User
 * @apiName PostUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam profile_name  Profile name of the User.
 * @apiParam username  Username name of the User.
 * @apiParam email  Email of the User.
 *
 * @apiSuccess {Object} result The operation result.
 * @apiSuccess {String} result.profile_name  Profile name of the User.
 * @apiSuccess {String} result.username  Username name of the User.
 * @apiSuccess {String} result.email  Email of the User.
 * @apiSuccess {String} msg Response message.
 */
router.post('/', userController.create);

/**
 * @api {put} /user/:id Update a User
 * @apiName PutUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam [profile_name]  Optional updated profile_name field to the User.
 * @apiParam [username]  Optional updated username name to the User.
 * @apiParam [email]  Optional updated email to the User.
 *
 * @apiSuccess {Object} result The operation result.
 * @apiSuccess {String} result.profile_name  Profile name of the User.
 * @apiSuccess {String} result.username  Username name of the User.
 * @apiSuccess {String} result.email  Email of the User.
 * @apiSuccess {String} msg Response message.
 */
router.put('/:user_id', userController.update);

/**
 * @api {delete} /user/:id Delete User
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiParam id Users unique ID.
 *
 * @apiSuccess msg Response message.
 */
router.delete('/:user_id', userController.delete);

module.exports = router;
