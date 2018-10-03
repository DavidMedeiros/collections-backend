var User = require('./user.model');
const userRepository = require("../user/user.repository");

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
          res.status(RequestStatus.OK).json({ result: createdUser, msg: 'User created.' });
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

    res.status(RequestStatus.OK).json({message: "User updated", data: updatedUser});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const userId = req.params.user_id;
    await userRepository.deleteById(userId);

    res.status(RequestStatus.OK).json({message: "User deleted"});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

