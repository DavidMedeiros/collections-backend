const artistRepository = require("./artist.repository");

var RequestStatus = require('../constants/requestStatus');

exports.index = async (req, res) => {
  try {
    const artists = await artistRepository.findAll();
    res.status(RequestStatus.OK).json(artists);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.show = async (req, res) => {
  try {
    const artistId = req.params.artist_id;
    const artist = await artistRepository.findById(artistId);

    res.status(RequestStatus.OK).json(artist);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.create = async (req, res) => {
  try {
    const createdArtist = await artistRepository.create(req.body);

    res.status(RequestStatus.CREATED_STATUS).json({message: "Artist created", data: createdArtist});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const artistId = req.params.artist_id;
    const updatedArtist = await artistRepository.findByIdAndUpdate(artistId, req.body);

    res.status(RequestStatus.OK).json({message: "Artist updated", data: updatedArtist});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const artistId = req.params.artist_id;
    await artistRepository.deleteById(artistId);

    res.status(RequestStatus.OK).json({message: "Artist deleted"});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};
