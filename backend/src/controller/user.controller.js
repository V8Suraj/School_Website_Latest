import User from '../models/user.model.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { userRoles } from '../utils/constant.js';
import { fieldNotFound } from '../utils/helper.js';


const options = {
  httpOnly: true,
  secure: true
};

const generateAccessRefreshToken = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return {
    accessToken,
    refreshToken
  };
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, secretKey, email } = req.body;

  if (secretKey === undefined || secretKey === '') {
    throw new ApiError(400, 'Secret key is required for admin sign-up');
  }

  const userAlreadyExists = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (userAlreadyExists) {
    throw new ApiError(208, 'User already exists');
  }

  const userData = {
    username,
    password,
    role: userRoles.ADMIN,
    email
  };

  const user = await User.create(userData);

  if (!user) {
    throw new ApiError(500, 'Internal server error, try again later');
  }

  /*
    TODO: when user registers, send a log or email
    for verifying user is not logging in with dummy credentials
  */

  return res.status(201).json(new ApiResponse(201, { user }, 'User created successfully'));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  fieldNotFound(user);

  const isPasswordCorrect = await user.isValidPassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, 'Credentials failed');
  }

  const { accessToken, refreshToken } = await generateAccessRefreshToken(user._id);

  return res.status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(new ApiResponse(200, {}, 'Admin login successfully'));
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  fieldNotFound(user);

  await User.findByIdAndUpdate(user._id, { refreshToken: '' });

  return res.status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(new ApiResponse(200, {}, 'User logout successfully'));
});

const getUser = asyncHandler(async (req, res) => {
  const user = req.user;

  fieldNotFound(user);

  const fetchedUser = await User.findById(user._id).select('-password -refreshToken');

  return res.status(200).json(new ApiResponse(200, { user: fetchedUser }, 'User fetched successfully'));
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = req.user;

  fieldNotFound(user);

  // Only allow safe fields to be updated
  const { username, email } = req.body;
  const updateData = {};
  if (username) updateData.username = username;
  if (email) updateData.email = email;

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, 'No data provided to update');
  }

  await User.findByIdAndUpdate(
    user._id,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  return res.status(200).json(new ApiResponse(200, {}, 'User fields updated successfully'));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = req.user;

  fieldNotFound(user);

  const userPasswordCheck = await User.findById(user._id);

  const isPasswordCorrect = await userPasswordCheck.isValidPassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, 'Old password is incorrect');
  }

  userPasswordCheck.password = newPassword;

  await userPasswordCheck.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, {}, 'Password changed successfully'));
});


export {
  changeCurrentPassword,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile
};
