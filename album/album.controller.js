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

    if (artist) {
      const createdAlbum = await albumRepository.create(req.body);
      res.status(RequestStatus.CREATED_STATUS).json({message: "Album created", data: createdAlbum});
    } else {
      res.status(RequestStatus.BAD_REQUEST).send("Make sure that artist_id is correct");
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const albumId = req.params.album_id;
    const updatedAlbum = await albumRepository.findByIdAndUpdate(albumId, req.body);

    res.status(RequestStatus.OK).json({message: "Album updated", data: updatedAlbum});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const albumId = req.params.album_id;
    await albumRepository.deleteById(albumId);

    res.status(RequestStatus.OK).json({message: "Album deleted"});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.addTrack = async function(req, res) {
  try {
    const albumId = req.params.album_id;
    const album = await albumRepository.findById(albumId);

    const trackId = req.body.track_id;
    const track = await trackRepository.findById(trackId);

    album._tracks.push(trackId);
    await albumRepository.findByIdAndUpdate(albumId, album);

    track.album_id = album._id;
    await trackRepository.findByIdAndUpdate(trackId, track);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.removeTrack = async function(req, res) {
  try {
    const albumId = req.params.album_id;
    const trackId = req.params.track_id;

    const album = await albumRepository.findById(albumId);
    const track = await trackRepository.findById(trackId);

    const index = album._tracks.indexOf(trackId);
    if (index > -1) {
      album._tracks.splice(index, 1);
      track.album_id = null;

      await albumRepository.findByIdAndUpdate(albumId, album);
      await trackRepository.findByIdAndUpdate(trackId, track);
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};
