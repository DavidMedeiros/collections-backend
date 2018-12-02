const albumRepository = require("./album.repository");
const trackRepository = require("../track/track.repository");
const artistRepository = require("../artist/artist.repository");
const collectionRepository = require("../collection/collection.repository");

var RequestStatus = require('../constants/requestStatus');

exports.index = async (req, res) => {
  try {
    const albums = await albumRepository.findAll();
    res.status(RequestStatus.OK).json(albums);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.show = async (req, res) => {
  try {
    const albumId = req.params.album_id;
    const album = await albumRepository.findById(albumId);

    res.status(RequestStatus.OK).json(album);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.search = async (req, res) => {
  try {
    const albumName = req.query.name;
    const artistName = req.query.artist;
    let search = [];

    if (albumName) {
      search = await albumRepository.searchByName(albumName);
    } else {
      console.log('pesquisando por' + artistName);
      search = await albumRepository.searchByArtist(artistName);
    }

    res.status(RequestStatus.OK).json(search);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.create = async (req, res) => {
  try {
    const artistId = req.body.artist_id;
    const artist = await artistRepository.findById(artistId);

    if (artist) {
      const createdAlbum = await albumRepository.create(req.body);

      // add recent created album to artist albums
      await artistRepository.addAlbum(artistId, createdAlbum._id);

      res.status(RequestStatus.CREATED_STATUS).json({message: "Album created", data: createdAlbum});
    } else {
      res.status(RequestStatus.BAD_REQUEST).send("Artist not founded");
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const albumId = req.params.album_id;
    const updatedAlbum = await albumRepository.findByIdAndUpdate(albumId, req.body);

    if (updatedAlbum.n > 0) {
      if(updatedAlbum.nModified) {
        res.status(RequestStatus.OK).json({message: "Artist updated"});
      } else {
        res.status(RequestStatus.OK).json({message: "Artist not updated"});
      }
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "Artist not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const albumId = req.params.album_id;
    const album = await albumRepository.findById(albumId);
    const albumDeleted = await albumRepository.deleteById(albumId);

    if (albumDeleted.n > 0) {
      // delete tracks of album
      album._tracks.forEach(async function (trackId) {
        await trackRepository.deleteById(trackId);
      });

      // delete album from artist albums list
      await artistRepository.removeAlbum(album.artist_id, albumId);

      // delete album from collections
      const collections = await collectionRepository.findAll();

      collections.forEach(async function (collection) {
        await collectionRepository.removeAlbum(collection._id, albumId);
      });
      res.status(RequestStatus.OK).json({message: "Album deleted"});
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "Album not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};
