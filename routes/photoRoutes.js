const express = require('express');
const router = express.Router();
const {
  getRawPhotos,
  getPhotoById,
  getPhotoByUser,
} = require('../controllers/photoController');

router.route('/').get(getRawPhotos);
router.route('/:id').get(getPhotoById);
router.route('/user/:username').get(getPhotoByUser);

module.exports = router;
