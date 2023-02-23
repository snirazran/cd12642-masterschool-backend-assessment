//Require axios to make API calls
const axios = require('axios');
const API = `https://api.unsplash.com/`;
const API_KEY = `?client_id=` + process.env.UNSPLASH_ACCESS;

// @desc Get Photos
// @route GET /api/photos
// @access Public
const getRawPhotos = async (req, res) => {
  try {
    let { data: images } = await axios.get(`${API}photos${API_KEY}`);
    if (images) {
      res.status(200).send(images);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc Get Photo by id
// @route GET /api/photos:id
// @access Public
const getPhotoById = async (req, res) => {
  try {
    const id = req.params.id;
    let { data: images } = await axios.get(`${API}photos${API_KEY}:${id}`);
    if (images) {
      res.status(200).send(images);
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

module.exports = {
  getRawPhotos,
  getPhotoById,
};
