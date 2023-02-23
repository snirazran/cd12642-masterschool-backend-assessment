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

// @desc Get Photo by username
// @route GET /api/photos/user/:username
// @access Public
const getPhotoByUser = async (req, res) => {
  try {
    const username = req.params.username;
    let { data: images } = await axios.get(
      `${API}users/${username}/photos${API_KEY}`
    );
    if (images) {
      let newArray = images.map(({ id, user, description, urls }) => ({
        id,
        username: user.username,
        description: description ? description : 'No description provided.',
        url: urls.raw,
      }));
      console.log(newArray);
      res.status(200).send(newArray);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getRawPhotos,
  getPhotoById,
  getPhotoByUser,
};
