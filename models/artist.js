const mongoose = require("mongoose");

const artistSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  placeOfBirth: String,
  dateOfBirth: Date,
  status: Boolean
});

module.exports = mongoose.model("Artist", artistSchema);
