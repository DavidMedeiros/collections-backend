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
  artist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  },
  artist_name: {
    type: String,
    required: true
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
  cover_art: {
    type: String
  }
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;