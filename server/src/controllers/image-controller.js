const cloudinary = require('../config/cloudinary');
const { uploadImage } = require('../helper/cloudinary-helper');
const asyncHandler = require("../utils/asyncHandler");
const fs = require('fs');
const Image = require('../models/image');

const uploadImageController = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded", success: false });
  }
  const { url, public_id } = await uploadImage(req.file.path);
  const newImage = new Image({
    url,
    public_id,
    uploadedBy: req.user.id
  });
  await newImage.save();
  fs.unlink(req.file.path, (err) => {
    if (err) console.error('Error deleting temp file:', err);
  });
  res.status(200).json({ message: "Image uploaded successfully", success: true, data: newImage });
});

const fetchImagesController = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (page - 1) * limit;
  const totalImages = await Image.countDocuments({ uploadedBy: req.user.id });
  const totalPages = Math.ceil(totalImages / limit);
  const images = await Image.find({ uploadedBy: req.user.id }).sort({ createdAt: -1 }).skip(skip).limit(limit);
  res.status(200).json({
    message: "Images fetched successfully",
    success: true,
    data: images,
    pagination: { page, limit, totalImages, totalPages }
  });
});

const deleteImageController = asyncHandler(async (req, res) => {
  const imageId = req.params.id;
  const image = await Image.findById(imageId);
  if (!image) {
    return res.status(404).json({ message: "Image not found", success: false });
  }
  if (image.uploadedBy.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized", success: false });
  }
  await cloudinary.uploader.destroy(image.public_id);
  await Image.findByIdAndDelete(imageId);
  res.status(200).json({ message: "Image deleted successfully", success: true });
});

module.exports = { uploadImageController, deleteImageController, fetchImagesController };
