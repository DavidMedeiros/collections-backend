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

exports.findByIdAndUpdate = async (trackId, data) => {
  delete data.album_id;

  return await Track.updateOne({ _id: trackId }, { $set: data });
};

exports.deleteById = async (trackId) => {
  return await Track.deleteOne({ _id: trackId });
};

exports.findOne = async (data) => {
  return await Track.findOne(data);
};
