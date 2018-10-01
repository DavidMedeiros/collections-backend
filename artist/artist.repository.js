var Artist = require('./artist.model');

exports.create = async (data) => {
  const artist = new Artist(data);
  await artist.save();
};

exports.findAll = async () => {
  return await Artist.find({});
};

exports.findById = async (id) => {
  return await Artist.findById(id);
};

exports.findByIdAndUpdate = async (id, data) => {
  await Artist.findOneAndUpdate(id, {$set: data});
};

exports.deleteById = async (id) => {
  await Artist.findOneAndDelete(id);
};

exports.findOne = async (data) => {
  return await Artist.findOne(data);
};
