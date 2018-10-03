const trackRepository = require("../track/track.repository");

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
    const createdTrack = await trackRepository.create(req.body);

    res.status(RequestStatus.OK).json({message: "Track created", data: createdTrack});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const trackId = req.params.track_id;
    const updatedTrack = await trackRepository.findByIdAndUpdate(trackId, req.body);

    res.status(RequestStatus.OK).json({message: "Track updated", data: updatedTrack});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const trackId = req.params.track_id;
    await trackRepository.deleteById(trackId);

    res.status(RequestStatus.OK).json({message: "Track deleted"});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};