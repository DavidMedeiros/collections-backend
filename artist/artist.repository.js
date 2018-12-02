var Artist = require('./artist.model');

exports.create = async (data) => {
  const artist = new Artist(data);
  return await artist.save();
};

exports.findAll = async () => {
  return await Artist.find({});
};

exports.findById = async (id) => {
  return await Artist.findById(id);
};

exports.findByIdAndUpdate = async (artistId, data) => {
  delete data._albums;

  return await Artist.updateOne({ _id: artistId }, { $set: data });
};

exports.deleteById = async (artistId) => {
  return await Artist.deleteOne({ _id: artistId });
};

exports.findOne = async (data) => {
  return await Artist.findOne(data);
};

exports.addAlbum = async (artistId, albumId) => {
  return await Artist.updateOne({ _id: artistId }, { $addToSet: { _albums: albumId } });
};

exports.removeAlbum = async (artistId, albumId) => {
  return await Artist.updateOne({ _id: artistId }, { $pull: { _albums: albumId } });
};

exports.searchByName = async (artistName) => {
  return await Artist.find({name: new RegExp(artistName, "i")}).limit(5);
};