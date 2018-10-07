const albumRepository = require("./album.repository");
const trackRepository = require("../track/track.repository");
const artistRepository = require("../artist/artist.repository");

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

exports.create = async (req, res) => {
  try {
    const artistId = req.body.artist_id;
    const artist = await artistRepository.findById(artistId);

    if (artist) { // TODO test this if clause
      const createdAlbum = await albumRepository.create(req.body);

      // add recent created album to artist albums
      await artistRepository.addAlbum(createdAlbum._id);

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
      await artistRepository.removeAlbum(album._owner, albumId);

      res.status(RequestStatus.OK).json({message: "Album deleted"});
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "Album not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};
