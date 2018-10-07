var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrackSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  length: {
    type: String,
    required: true
  },
  album_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true
  }
});

var Track = mongoose.model('Track', TrackSchema);

module.exports = Track;