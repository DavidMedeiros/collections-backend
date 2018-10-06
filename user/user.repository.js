var User = require('./user.model');

exports.create = async (data) => {
  const user = new User(data);
  return await user.save();
};

exports.findAll = async () => {
  return await User.find({});
};

exports.findById = async (id) => {
  return await User.findById(id);
};

exports.findByIdAndUpdate = async (userId, data) => {
  return await User.updateOne({ _id: userId }, {$set: data});
};

exports.deleteById = async (userId) => {
  await User.deleteOne({ _id: userId });
};

exports.findOne = async (data) => {
  return await User.findOne(data);
};

exports.addCollection = async (userId, collectionId) => {
  return await User.updateOne({ _id: userId }, {$addToSet: {_collections: collectionId}});
};

exports.removeCollection = async (userId, collectionId) => {
  return await User.updateOne({ _id: userId }, {$pull: {_collections: collectionId}});
};

exports.addFollowingCollection = async (userId, collectionId) => {
  return await User.updateOne({ _id: userId }, {$addToSet: {_following_collections: collectionId}});
};

exports.removeFollowingCollection = async (userId, collectionId) => {
  return await User.updateOne({ _id: userId }, {$pull: {_following_collections: collectionId}});
};

exports.addFollower = async (userId, follower) => {
  return await User.updateOne({ _id: userId }, {$addToSet: {_followers: follower}});
};

exports.removeFollower = async (userId, follower) => {
  return await User.updateOne({ _id: userId }, {$pull: {_followers: follower}});
};

exports.addFollowingUser = async (userId, following) => {
  return await User.updateOne({ _id: userId }, {$addToSet: {_following_users: following}});
};

exports.removeFollowingUser = async (userId, following) => {
  return await User.updateOne({ _id: userId }, {$pull: {_following_users: following}});
};