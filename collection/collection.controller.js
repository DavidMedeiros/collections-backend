const collectionRepository = require("./collection.repository");
const userRepository = require("../user/user.repository");

var RequestStatus = require('../constants/requestStatus');

exports.index = async (req, res) => {
  try {
    const collections = await collectionRepository.findAll();
    res.status(RequestStatus.OK).json(collections);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.show = async (req, res) => {
  try {
    const collectionId = req.params.collection_id;
    const collection = await collectionRepository.findById(collectionId);

    res.status(RequestStatus.OK).json(collection);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.create = async (req, res) => {
  try {
    const loggedUserId = req.user._id;
    req.body._owner = loggedUserId;

    const createdCollection = await collectionRepository.create(req.body);

    await userRepository.addCollection(loggedUserId, createdCollection._id);

    res.status(RequestStatus.CREATED_STATUS).json({message: "Collection created", data: createdCollection});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.update = async (req, res) => {
  // TODO Não permitir modificar o campo owner ?
  try {
    const collectionId = req.params.collection_id;
    const updatedCollection = await collectionRepository.findByIdAndUpdate(collectionId, req.body);

    res.status(RequestStatus.OK).json({message: "Collection updated", data: updatedCollection});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const collectionId = req.params.collection_id;
    const collectionDeleted = await collectionRepository.deleteById(collectionId);
    console.log('deletec collection', collectionDeleted);

    await userRepository.removeCollection(collectionDeleted._owner, collectionId);

    res.status(RequestStatus.OK).json({message: "Collection deleted"});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.addAlbum = async (req, res) => {
  try {
    const collectionId = req.params.collection_id;
    const albumId = req.body.album_id;

    await collectionRepository.addAlbum(collectionId, albumId);

    res.status(RequestStatus.OK).json({message: "Collection updated"});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.removeAlbum = async (req, res) => {
  try {
    const collectionId = req.params.collection_id;
    const albumId = req.params.album_id;

    await collectionRepository.removeAlbum(collectionId, albumId);

    res.status(RequestStatus.OK).json({message: "Collection updated"});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};