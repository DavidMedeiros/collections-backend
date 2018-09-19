var User = require('./user.model');
var RequestStatus = require('../constants/requestStatus');
var RequestMsgs = require('../constants/requestMsgs')

exports.index = (req, res) => {
  User.find({})
	  .catch((err) => {
	    res.status(RequestStatus.BAD_REQUEST).send(err);
	  })
	  .then((result) => {
	    res.status(RequestStatus.OK).json({ users: result });
	  });
};

exports.show = (req, res) => {
	User.findById(req.params.user_id)
		.then((user) => {
			res.status(RequestStatus.OK).json(user);
		})
		.catch((error) => {
			res.status(RequestStatus.BAD_REQUEST).json(error);
		});
};

exports.create = (req, res) => {
  var user = new User(req.body);
  user.profile_name = req.body.username;

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

exports.update = (req, res) => {
	User.updateOne({ _id: req.params.user_id }, { $set: req.body })
		.then((updatedUser) => {
			res.status(RequestStatus.OK).json({result: updatedUser, msg: 'User updated.'});
		})
		.catch((error) => {
			res.status(RequestStatus.BAD_REQUEST).json(error);
		});
};

exports.delete = (req, res) => {
	User.deleteOne({ _id: req.params.user_id })
		.then(() => {
			res.status(RequestStatus.OK).json({msg: 'User deleted.'});
		})
		.catch((error) => {
			res.status(RequestStatus.BAD_REQUEST).json(error);
		});
};
