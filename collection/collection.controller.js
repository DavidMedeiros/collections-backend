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
  try {
    const collectionId = req.params.collection_id;
    const updatedCollection = await collectionRepository.findByIdAndUpdate(collectionId, req.body);

    if (updatedCollection.n > 0) {
      if(updatedCollection.nModified) {
        res.status(RequestStatus.OK).json({message: "Collection updated"});
      } else {
        res.status(RequestStatus.OK).json({message: "Collection not updated"});
      }
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "Collection not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).json(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const collectionId = req.params.collection_id;
    const collection = await collectionRepository.findById(collectionId);

    const collectionDeleted = await collectionRepository.deleteById(collectionId);

    if (collectionDeleted.n > 0) {
      // Delete collection from owner collections list
      await userRepository.removeCollection(collectionDeleted._owner, collectionId);

      // Remove collection from users that follow its
      collection._followers.forEach(async function (followerId) {
        await userRepository.removeFollowingCollection(followerId);
      });

      res.status(RequestStatus.OK).json({message: "Collection deleted"});
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "Collection not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.addAlbum = async (req, res) => {
  try {
    const collectionId = req.params.collection_id;
    const albumId = req.body.album_id;

    const updatedCollection = await collectionRepository.addAlbum(collectionId, albumId);

    if (updatedCollection.n > 0) {
      if(updatedCollection.nModified) {
        res.status(RequestStatus.OK).json({message: "Collection updated"});
      } else {
        res.status(RequestStatus.OK).json({message: "Collection not updated"});
      }
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "Collection not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};

exports.removeAlbum = async (req, res) => {
  try {
    const collectionId = req.params.collection_id;
    const albumId = req.params.album_id;

    const updatedCollection = await collectionRepository.removeAlbum(collectionId, albumId);

    if (updatedCollection.n > 0) {
      if(updatedCollection.nModified) {
        res.status(RequestStatus.OK).json({message: "Collection updated"});
      } else {
        res.status(RequestStatus.OK).json({message: "Collection not updated"});
      }
    } else {
      res.status(RequestStatus.BAD_REQUEST).json({message: "Collection not founded"});
    }
  } catch (error) {
    res.status(RequestStatus.BAD_REQUEST).send(error);
  }
};