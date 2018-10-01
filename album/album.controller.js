const albumRepository = require("./album.repository");
const trackRepository = require("../track/track.repository");

var RequestStatus = require('../constants/requestStatus');

exports.index = async (req, res) => {
  try {
    const albums = await albumRepository.findAll();
    res.status(RequestStatus.OK).json(albums);
  } catch (err) {
    res.status(RequestStatus.BAD_REQUEST).send(err);
  }
};

exports.show = async (req, res) => {
  try {
    const albumId = req.params.album_id;
    const album = await albumRepository.findById(albumId);

    res.status(RequestStatus.OK).json(album);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(err);
  }
};

exports.create = async (req, res) => {
  try {
    const createdAlbum = await albumRepository.create(req.body);

    const res_json = {
      "message": "Album created",
      "data": {
        "album": createdAlbum
      }
    };

    res.status(RequestStatus.OK).json(res_json);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(err);
  }
};

exports.update = async (req, res) => {
  try {
    const albumId = req.params.album_id;
    const updatedAlbum = await albumRepository.findByIdAndUpdate(albumId, req.body);

    res.status(RequestStatus.OK).json({result: updatedAlbum, msg: 'Album updated.'});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const albumId = req.params.album_id;
    await albumRepository.deleteById(albumId);

    res.status(RequestStatus.OK).json({msg: 'Album deleted.'});
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
