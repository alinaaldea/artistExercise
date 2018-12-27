const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
  _id: Number,
  name: String,
  placeOfBirth: String,
  dateOfBirth: String,
  status: Boolean
});

module.exports = mongoose.model("Artist", artistSchema);
