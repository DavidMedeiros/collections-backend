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

exports.findByIdAndUpdate = async (id, albumId) => {
  delete data.artist_id;
  delete data._tracks;

  return await Album.updateOne({ _id: albumId }, { $set: data });
};

exports.deleteById = async (albumId) => {
  return await Album.deleteOne({ _id: albumId });
};

exports.findOne = async (data) => {
  return await Album.findOne(data);
};

exports.addTrack = async (albumId, trackId) => {
  return await Album.updateOne({ _id: albumId }, { $addToSet: { _tracks: trackId } });
};

exports.removeTrack = async (albumId, trackId) => {
  return await Album.updateOne({ _id: albumId }, { $pull: { _tracks: trackId } });
};