const mongoose = require('mongoose');

const favoritePhotosSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  url: {
    type: String,
  },
  description: {
    type: String,
  },
  username: {
    type: String,
  },
  explanation: {
    type: String,
  },
});

module.exports = mongoose.model('FavoritePhotos', favoritePhotosSchema);
