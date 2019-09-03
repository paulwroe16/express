const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  _id: String,
  placeId: String,
  text: String,
  createdAt: Date,
  user: {
    _id: String,
    name: String,
    avatar: String
  }
});

mongoose.model('Message', messageSchema);
