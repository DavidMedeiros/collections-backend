var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  released_date: {
    type: Date,
    required: true
  },
  released_type: {
    type: String,
    required: true
  },
  _artist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  _artist_name: {
    type: String
  },
  genres: {
    type: [],
    required: true
  },
  copyright: {
    type: String
  },
  _tracks: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track'
      }
    ],
    default: []
  },
  cover_art: Buffer
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;