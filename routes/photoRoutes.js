const express = require('express');
const router = express.Router();
const {
  getRawPhotos,
  getPhotoById,
} = require('../controllers/photoController');

router.route('/').get(getRawPhotos);
router.route('/:id').get(getPhotoById);

module.exports = router;
