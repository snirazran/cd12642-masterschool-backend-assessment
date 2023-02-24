const express = require('express');
const router = express.Router();
const {
  setPhoto,
  getPhotos,
  updatePhoto,
  deletePhoto,
} = require('../controllers/favoritesController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getPhotos).post(protect, setPhoto);
router.route('/:id').delete(protect, deletePhoto).put(protect, updatePhoto);

module.exports = router;
