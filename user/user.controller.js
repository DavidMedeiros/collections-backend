var User = require('./user.model');
const userRepository = require("../user/user.repository");
const collectionRepository = require("../collection/collection.repository");

var RequestStatus = require('../constants/requestStatus');
var RequestMsgs = require('../constants/requestMsgs');

exports.index = async (req, res) => {
  try {
    const users = await userRepository.findAll();
    res.status(RequestStatus.OK).json(users);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.show = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const user = await userRepository.findById(userId);

    res.status(RequestStatus.OK).json(user);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.create = (req, res) => {
  var user = new User(req.body);
  user.name = req.body.username;

  user.generateHash(req.body.password)
  	.then((hash) => {
  		user.password = hash;
  		user.save((err, createdUser) => {
  			if (err && err.name === 'MongoError' && err.code === 11000) {
					res.status(RequestStatus.FORBIDDEN).json(RequestMsgs.DUPLICATED_ENTITY);
        } else if (err) {
          res.status(RequestStatus.BAD_REQUEST).json(err);
        } else {
          res.status(RequestStatus.CREATED_STATUS).json({ result: createdUser, msg: 'User created.' });
        }
  		});
  	})
  	.catch((error) => {
  		res.status(RequestStatus.BAD_REQUEST).json(err);
  	});
};

exports.update = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const updatedUser = await userRepository.findByIdAndUpdate(userId, req.body);

    if (updatedUser.n > 0) {
      if(updatedUser.nModified) {
        res.status(RequestStatus.OK).json({message: "User updated"});
      } else {
        res.status(RequestStatus.OK).json({message: "User not updated"});
      }
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "User not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const userId = req.params.user_id;

    const user = await userRepository.findById(userId);
    const userDeleted = await userRepository.deleteById(userId);

    if (userDeleted.n > 0) {
      // Delete all collections of user
      user._collections.forEach(async function (collectionId){
        const collection = await collectionRepository.findById(collectionId);
        const collectionDeleted = await collectionRepository.deleteById(collectionId);

        // For each user that follow this deleted collection, remove its from his following collections list
        if (collectionDeleted.n > 0) {
          collection._followers.forEach(async function (followerId) {
             await userRepository.removeFollowingCollection(followerId, collectionId);
          });
        }
      });

      // For each user that follow this deleted user, remove the deleted user from his following users lists
      user._followers.forEach(async function (followerId) {
        await userRepository.removeFollowingUser(followerId, userId);
      });

      // For each user that is followed by this deleted user, remove the deleted user from his followers list
      user._following_users.forEach(async function (followingUserId) {
        await userRepository.removeFollower(followingUserId, userId);
      });

      // For each collection that is followed by this deleted user, remove him from from this collection followers list
      user._following_collections.forEach(async function (followingCollectionId) {
        await collectionRepository.removeFollower(followingCollectionId, userId);
      });

      if (req.user._id === userId) {
        req.logout();
      }

      res.status(RequestStatus.OK).json({message: "User deleted"});
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "User not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.followCollection = async (req, res) => {
  try {
    const collectionId = req.body.collection_id;
    const userId = req.user._id;

    const collectionUpdated = await collectionRepository.addFollower(collectionId, userId);

    if (collectionUpdated.n > 0) {
      if (collectionUpdated.nModified) {
        await userRepository.addFollowingCollection(userId, collectionId);

        res.status(RequestStatus.OK).json({message: "Collection followed"});
      } else {
        res.status(RequestStatus.OK).json({message: "Already follow this collection"});
      }
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "Collection not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.unfollowCollection = async (req, res) => {
  try {
    const collectionId = req.params.collection_id;
    const userId = req.user._id;

    const collectionUpdated = await collectionRepository.removeFollower(collectionId, userId);

    if (collectionUpdated.n > 0) {
      if (collectionUpdated.nModified) {
        await userRepository.removeFollowingCollection(userId, collectionId);

        res.status(RequestStatus.OK).json({message: "Collection unfollowed"});
      } else {
        res.status(RequestStatus.OK).json({message: "Already follow this collection"});
      }
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "Collection not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.followUser = async (req, res) => {
  try {
    const loggedUser = req.user._id;
    const userToFollowId = req.body.user_id;

    const userToFollowUpdated = await userRepository.addFollower(userToFollowId, loggedUser);

    if (userToFollowUpdated.n > 0) {
      if (userToFollowUpdated.nModified) {
        await userRepository.addFollowingUser(loggedUser, userToFollowId);

        res.status(RequestStatus.OK).json({message: "User followed"});
      } else {
        res.status(RequestStatus.OK).json({message: "Already follow this user"});
      }
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "User not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const loggedUser = req.user._id;
    const userToUnfollowId = req.params.user_id;

    const userToUnfollowUpdated = await userRepository.removeFollower(userToUnfollowId, loggedUser);

    if (userToUnfollowUpdated.n > 0) {
      if (userToUnfollowUpdated.nModified) {
        await userRepository.removeFollowingUser(loggedUser, userToUnfollowId);

        res.status(RequestStatus.OK).json({message: "User unfollowed"});
      } else {
        res.status(RequestStatus.OK).json({message: "Already unfollowed this user"});
      }
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "User not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};