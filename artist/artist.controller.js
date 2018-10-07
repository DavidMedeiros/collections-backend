const artistRepository = require("./artist.repository");
const albumRepository = require("../album/album.repository");
const trackRepository = require("../track/track.repository");

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

    if (updatedArtist.n > 0) {
      if(updatedArtist.nModified) {
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
    const artistId = req.params.artist_id;
    const artist = await artistRepository.findById(artistId);

    const artistDeleted = await artistRepository.deleteById(artistId);

    if (artistDeleted.n > 0) {
      // delete artist albums and its tracks
      artist._albums.forEach(async function (albumId) {
        const album = await albumRepository.findById(albumId);
        await albumRepository.deleteById(albumId);

        album._tracks.forEach(async function (trackId) {
          await trackRepository.deleteById(trackId);
        });
      });

      res.status(RequestStatus.OK).json({message: "Artist deleted"});
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "Artist not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};