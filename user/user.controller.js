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
  // TODO verificação de senhas iguais
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
    const userDeleted = await userRepository.deleteById(userId);

    if (userDeleted.n > 0) {
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
      await userRepository.addFollowingCollection(userId, collectionId);

      res.status(RequestStatus.OK).json({message: "Collection followed"});
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "Collection not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};