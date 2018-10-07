var Collection = require('./collection.model');

exports.create = async (data) => {
  const collection = new Collection(data);
  return await collection.save();
};

exports.findAll = async () => {
  return await Collection.find({});
};

exports.findById = async (id) => {
  return await Collection.findById(id);
};

exports.findByIdAndUpdate = async (collectionId, data) => {
  delete data._items;
  delete data._followers;
  delete data._likes;
  delete data._owner;

  return await Collection.updateOne({ _id: collectionId }, {$set: data});
};

exports.deleteById = async (id) => {
  return await Collection.deleteOne({ _id: id });
};

exports.findOne = async (data) => {
  return await Collection.findOne(data);
};

exports.addAlbum = async (collectionId, albumId) => {
  return await Collection.updateOne({ _id: collectionId }, {$addToSet: {_items: albumId}});
};

exports.removeAlbum = async (collectionId, albumId) => {
  return await Collection.updateOne({ _id: collectionId }, {$pull: {_items: albumId}});
};

exports.addFollower = async (collectionId, followerId) => {
  return await Collection.updateOne({ _id: collectionId }, {$addToSet: {_followers: followerId}});
};

exports.removeFollower = async (collectionId, followerId) => {
  return await Collection.updateOne({ _id: collectionId }, {$pull: {_followers: followerId}});
};