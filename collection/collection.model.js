var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    _items: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Media'
          }
        ],
        default: []
    },
    _owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    _followers: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        ],
        default: []
    },
    _likes: {
        type: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          }
        ],
        default: []
    },
    image: Buffer
});

var Collection = mongoose.model('Collection', CollectionSchema);

module.exports = Collection;