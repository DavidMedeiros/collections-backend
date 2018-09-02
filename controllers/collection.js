var Collection = require('../models/Collection');
var RequestStatus = require('../constants/requestStatus');

exports.index = (req, res) => {
    Collection.find({})
        .then((result) => {
            res.status(RequestStatus.OK).json(result);
        })
        .catch((err) => {
            res.status(RequestStatus.BAD_REQUEST).send(err);
        });
};

exports.show = (req, res) => {
    Collection.findById(req.params.collection_id)
        .then((user) => {
            res.status(RequestStatus.OK).json(user);
        })
        .catch((err) => {
            res.status(RequestStatus.BAD_REQUEST).json(err);
        });
};

exports.create = (req, res) => {
    var collection = new Collection(req.body);

    collection.save()
    .catch((err) => {
        res.status(RequestStatus.BAD_REQUEST).send(err);
    })
    .then((createdCollection) => {
        var res_json = {
            "message": "Collection created", 
            "data": {
                "collection": createdCollection
            }
        };
        res.status(RequestStatus.OK).json(res_json);
    });
};

exports.update = (req, res) => {
	Collection.updateOne({ _id: req.params.collection_id }, { $set: req.body })
		.then(() => {
			res.status(RequestStatus.OK).send('Collection updated!');
		})
		.catch((error) => {
			res.status(RequestStatus.BAD_REQUEST).json(error);
		});
};

exports.delete = (req, res) => {
	Collection.deleteOne({ _id: req.params.collection_id })
		.then(() => {
			res.status(RequestStatus.OK).send('Collection deleted.');
		})
		.catch((error) => {
			res.status(RequestStatus.BAD_REQUEST).send(error);
		});
};