var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    name: String
});

var Collection = mongoose.model('Collection', CollectionSchema);

module.exports = Collection;