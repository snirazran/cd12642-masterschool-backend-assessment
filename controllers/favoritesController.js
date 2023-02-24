//Import asyncHandler so that we can use it in our routes to trigger error handling middleware
const axios = require('axios');
const asyncHandler = require('express-async-handler');
const FavoritePhotos = require('../models/favoritePhotoModel');
const User = require('../models/userModel');

// @desc Set Photo
// @route POST /api/favoritephotos
// @access Private
const setPhoto = asyncHandler(async (req, res) => {
  if (!req.body.username) {
    res.status(400);
    throw new Error('Please add a username field');
  }
  if (!req.body.url) {
    res.status(400);
    throw new Error('Please add a photo url');
  }
  if (!req.body.description) {
    res.status(400);
    throw new Error('Please add a description');
  }

  if (!req.body.explanation) {
    res.status(400);
    throw new Error('Please add an explanation field');
  }

  const photo = await FavoritePhotos.create({
    user: req.user.id,
    url: req.body.url,
    description: req.body.description,
    username: req.body.username,
    explanation: req.body.explanation,
  });

  res.status(200).json(photo);
});

// @desc Get all favoritePhotos
// @route GET /api/favoritephotos
// @access Private
const getPhotos = asyncHandler(async (req, res) => {
  const photos = await FavoritePhotos.find({ user: req.user.id });
  res.status(200).json(photos);
});

// @desc Update photo
// @route PUT /api/favoritephoto/:id
// @access Private
const updatePhoto = asyncHandler(async (req, res) => {
  const photo = await FavoritePhotos.findById(req.params.id);

  if (!photo) {
    res.status(400);
    throw new Error('photo not found');
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  //Make sure the logged in user matches the photo user
  if (photo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatePhoto = await FavoritePhotos.findByIdAndUpdate(
    req.params.id,
    { explanation: req.body.explanation },
    {
      new: true,
    }
  );

  res.status(200).json(updatePhoto);
});

// @desc Delete photo
// @route DELETE /api/favoritephotos/:id
// @access Private
const deletePhoto = asyncHandler(async (req, res) => {
  const photo = await FavoritePhotos.findById(req.params.id);

  if (!photo) {
    res.status(400);
    throw new Error('photo not found');
  }

  //Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  //Make sure the logged in user matches the photo user
  if (photo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await photo.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  setPhoto,
  getPhotos,
  updatePhoto,
  deletePhoto,
};
