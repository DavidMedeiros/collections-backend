var Track = require('./track.model');
var RequestStatus = require('../constants/requestStatus');

exports.index = (req, res) => {
  Track.find({})
    .then((result) => {
      res.status(RequestStatus.OK).json(result);
    })
    .catch((err) => {
      res.status(RequestStatus.BAD_REQUEST).send(err);
    });
};

exports.show = (req, res) => {
  Track.findById(req.params.track_id)
    .then((user) => {
      res.status(RequestStatus.OK).json(user);
    })
    .catch((err) => {
      res.status(RequestStatus.BAD_REQUEST).json(err);
    });
};

exports.create = (req, res) => {
  var track = new Track(req.body);

  track.save()
    .catch((err) => {
      res.status(RequestStatus.BAD_REQUEST).send(err);
    })
    .then((createdTrack) => {
      var res_json = {
        "message": "Track created",
        "data": {
          "track": createdTrack
        }
      };
      res.status(RequestStatus.OK).json(res_json);
    });
};

exports.update = (req, res) => {
  Track.updateOne({ _id: req.params.track_id }, { $set: req.body })
    .then((updatedTrack) => {
      res.status(RequestStatus.OK).json({result: updatedTrack, msg: 'Track updated.'});
    })
    .catch((error) => {
      res.status(RequestStatus.BAD_REQUEST).json(error);
    });
};

exports.delete = (req, res) => {
  Track.deleteOne({ _id: req.params.track_id })
    .then(() => {
      res.status(RequestStatus.OK).json({msg: 'Track deleted.'});
    })
    .catch((error) => {
      res.status(RequestStatus.BAD_REQUEST).send(error);
    });
};