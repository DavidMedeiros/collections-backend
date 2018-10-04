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

exports.findByIdAndUpdate = async (id, data) => {
  return await Collection.findOneAndUpdate(id, {$set: data});
};

exports.deleteById = async (id) => {
  return await Collection.findOneAndDelete(id);
};

exports.findOne = async (data) => {
  return await Collection.findOne(data);
};

exports.addAlbum = async (collectionId, albumId) => {
  return await Collection.findOneAndUpdate(collectionId, {$addToSet: {_items: albumId}});
};

exports.removeAlbum = async (collectionId, albumId) => {
  return await Collection.findOneAndUpdate(collectionId, {$pull: {_items: albumId}});
};