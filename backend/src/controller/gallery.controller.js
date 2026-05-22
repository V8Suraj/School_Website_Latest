import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import Gallery from '../models/gallery.model.js';
import { uploadCloudinary } from '../utils/cloudinary.js';


const addImage = asyncHandler(async (req, res) => {
  const { imageLable, category } = req.body;

  if (!imageLable || !category) {
    throw new ApiError(400, 'Image label and image category are required');
  }

  const imageLocalPath = req.file?.path;

  if (!imageLocalPath) {
    throw new ApiError(400, 'Image file is required');
  }

  const uploadedImage = await uploadCloudinary(imageLocalPath);

  if (!uploadedImage?.url) {
    throw new ApiError(500, 'Failed to upload image to Cloudinary');
  }

  const imageData = {
    imageLable,
    category,
    imageUrl: uploadedImage.url
  };

  const createImage = await Gallery.create(imageData);

  if (!createImage) {
    throw new ApiError(400, "Image can't be created");
  }

  return res.status(201).json(new ApiResponse(201, createImage, 'Add new image successfully'));
});

const deleteImage = asyncHandler(async (req, res) => {
  const { imageId } = req.params;

  const image = await Gallery.findById(imageId);

  if (!image) {
    throw new ApiError(404, "Image can't be found");
  }

  await Gallery.findByIdAndDelete(imageId);

  return res.status(200).json(new ApiResponse(200, {}, 'Image deleted successfully'));
});


export {
  addImage,
  deleteImage
};
