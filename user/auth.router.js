var express        = require('express');
var router         = express.Router();
var authController = require('./auth.controller');

/**
 * @swagger
 * resourcePath: /api/auth
 * description: Auth API routes
 */

/**
 * @swagger
 * path: /api/auth/
 * operations:
 *   -  httpMethod: GET
 *      summary: User Logged
 *      notes: Returns a user logged
 *      responseClass: User
 *      nickname: user-logged
 *      consumes:
 *        - application/json
 */
router.get('/', authController.status);

/**
 * @swagger
 * path: /api/auth/
 * operations:
 *   -  httpMethod: POST
 *      summary: Login with username and password
 *      notes: Returns "{"msg":"Login successful"}" in a login successful case, or a error message.
 *      responseClass: null
 *      nickname: login
 *      consumes:
 *        - text/html
 *      parameters:
 *        - name: body
 *          description: Json with required credentials = username and password
 *          paramType: body
 *          dataType: Login
 *          required: true
 */
router.post('/', authController.login);

/**
 * @swagger
 * path: /api/auth/
 * operations:
 *   -  httpMethod: DELETE
 *      summary: Logout
 *      notes: Ends a user logged session and returns a confirmation message
 *      responseClass: null
 *      nickname: logout
 *      consumes:
 *        - text/html
 */
router.delete('/', authController.logout);

/**
 * @swagger
 * models:
 *   Login:
 *     id: Login
 *     properties:
 *       username:
 *         type: String
 *         required: true
 *       password:
 *         type: String
 *         required: true
 *
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
