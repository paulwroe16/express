const mongoose = require('mongoose');

const savedPlaceSchema = new mongoose.Schema({
  place_id: String,
  saved: Date,
  user_id: String
});

mongoose.model('SavedPlace', savedPlaceSchema);
