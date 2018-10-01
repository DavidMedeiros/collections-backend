var Collection = require('./collection.model');

exports.create = async (data) => {
  const collection = new Collection(data);
  await collection.save();
};

exports.findAll = async () => {
  return await Collection.find({});
};

exports.findById = async (id) => {
  return await Collection.findById(id);
};

exports.findByIdAndUpdate = async (id, data) => {
  await Collection.findOneAndUpdate(id, {$set: data});
};

exports.deleteById = async (id) => {
  await Collection.findOneAndDelete(id);
};

exports.findOne = async (data) => {
  return await Collection.findOne(data);
};
