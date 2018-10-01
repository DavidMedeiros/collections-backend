var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String
  },
  birthday: {
    type: Date
  },
  _albums: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album'
      }
    ],
    default: []
  },
  image: Buffer
});

var Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;