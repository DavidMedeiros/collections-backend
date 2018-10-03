var Track = require('./track.model');

exports.create = async (data) => {
  const track = new Track(data);
  return await track.save();
};

exports.findAll = async () => {
  return await Track.find({});
};

exports.findById = async (id) => {
  return await Track.findById(id);
};

exports.findByIdAndUpdate = async (id, data) => {
  return await Track.findOneAndUpdate(id, {$set: data});
};

exports.deleteById = async (id) => {
  await Track.findOneAndDelete(id);
};

exports.findOne = async (data) => {
  return await Track.findOne(data);
};
