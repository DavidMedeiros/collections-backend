const trackRepository = require("../track/track.repository");
const albumRepository = require("../album/album.repository");

var RequestStatus = require('../constants/requestStatus');

exports.index = async (req, res) => {
  try {
    const tracks = await trackRepository.findAll();
    res.status(RequestStatus.OK).json(tracks);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.show = async (req, res) => {
  try {
    const trackId = req.params.track_id;
    const track = await trackRepository.findById(trackId);

    res.status(RequestStatus.OK).json(track);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.create = async (req, res) => {
  try {
    const albumId = req.body.album_id;
    const album = await albumRepository.findById(albumId);

    if (album) { // TODO test this if clause
      const createdTrack = await trackRepository.create(req.body);

      // add recent created track to album tracks list
      await albumRepository.addTrack(createdTrack._id);

      res.status(RequestStatus.CREATED_STATUS).json({message: "Track created", data: createdAlbum});
    } else {
      res.status(RequestStatus.BAD_REQUEST).send("Album not founded");
    }

    const createdTrack = await trackRepository.create(req.body);

    res.status(RequestStatus.CREATED_STATUS).json({message: "Track created", data: createdTrack});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const trackId = req.params.track_id;
    const updatedTrack = await trackRepository.findByIdAndUpdate(trackId, req.body);

    if (updatedTrack.n > 0) {
      if(updatedTrack.nModified) {
        res.status(RequestStatus.OK).json({message: "Track updated"});
      } else {
        res.status(RequestStatus.OK).json({message: "Track not updated"});
      }
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "Track not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const trackId = req.params.track_id;
    const track = await trackRepository.findById(trackId);
    const trackDeleted = await trackRepository.deleteById(trackId);

    if (trackDeleted.n > 0) {
      // delete album from artist albums list
      await albumRepository.removeTrack(track.album_id, trackId);

      res.status(RequestStatus.OK).json({message: "Track deleted"});
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "Track not founded"});
    }

  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};