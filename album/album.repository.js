var Album = require('./album.model');

exports.create = async (data) => {
  const album = new Album(data);
  return await album.save();
};

exports.findAll = async () => {
  return await Album.find({});
};

exports.findById = async (id) => {
  return await Album.findById(id);
};

exports.findByIdAndUpdate = async (id, data) => {
  return await Album.findOneAndUpdate(id, {$set: data});
};

exports.deleteById = async (id) => {
  await Album.findOneAndDelete(id);
};

exports.findOne = async (data) => {
  return await Album.findOne(data);
};
