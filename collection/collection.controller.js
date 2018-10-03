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
    const loggedUser = req.user;
    req.body._owner = loggedUser._id;

    const createdCollection = await collectionRepository.create(req.body);

    var user_collections = loggedUser._collections;
    user_collections.push(createdCollection._id);
    loggedUser._collections = user_collections;


    await userRepository.findByIdAndUpdate(loggedUser._id, loggedUser);

    res.status(RequestStatus.OK).json({message: "Collection created", data: createdCollection});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.update = async (req, res) => {
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
    await collectionRepository.deleteById(collectionId);

    res.status(RequestStatus.OK).json({message: "Collection deleted"});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};