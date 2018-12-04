var Album = require('./album.model');
var artistRepository = require('../artist/artist.repository');

exports.create = async (data, artistName) => {
  data['artist_name'] = artistName;
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

exports.searchByName = async (albumName) => {
  return await Album.find({name: new RegExp(albumName, "i")}).limit(5);
};

exports.searchByArtist = async (artistName) => {
  let albumsPromisse = [];
  let albums = [];

  artists = await artistRepository.searchByName(artistName);

  artists.forEach(async function(artist) {
    artist._albums.forEach(async function (albumId) {
      let album = Album.findById(albumId);

      albumsPromisse.push(album);
    })
  });

  await Promise.all(albumsPromisse).then(result => {
    albums.push(result);
  });

  return albums[0];
};