const collectionRepository = require("./collection.repository");

var RequestStatus = require('../constants/requestStatus');

exports.index = async (req, res) => {
  try {
    const collections = await collectionRepository.findAll();
    res.status(RequestStatus.OK).json(collections);
  } catch (err) {
    res.status(RequestStatus.BAD_REQUEST).send(err);
  }
};

exports.show = async (req, res) => {
  try {
    const collectionId = req.params.collection_id;
    const collection = await collectionRepository.findById(collectionId);

    res.status(RequestStatus.OK).json(collection);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(err);
  }
};


exports.create = async (req, res) => {
  try {
    const createdCollection = await collectionRepository.create(req.body);

    const res_json = {
      "message": "Collection created",
      "data": {
        "collection": createdCollection
      }
    };

    res.status(RequestStatus.OK).json(res_json);
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(err);
  }
};

exports.update = async (req, res) => {
  try {
    const collectionId = req.params.collection_id;
    const updatedCollection = await collectionRepository.findByIdAndUpdate(collectionId, req.body);

    res.status(RequestStatus.OK).json({result: updatedCollection, msg: 'Collection updated.'});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const collectionId = req.params.collection_id;
    await collectionRepository.deleteById(collectionId);

    res.status(RequestStatus.OK).json({msg: 'Collection deleted.'});
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};