const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  _id: String,
  place_id: String,
  text: String,
  createdAt: Date,
  user: {
    _id: String,
    name: String,
    avatar: String
  }
});

mongoose.model('Message', messageSchema);
