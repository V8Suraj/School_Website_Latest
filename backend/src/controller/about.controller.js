import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import About from '../models/about.model.js';
import ApiError from '../utils/ApiError.js';

const createAboutSection = asyncHandler(async (req, res) => {
  const {
    schoolHistory,
    missionVision,
    principleMessage,
    campusFacility
  } = req.body;

  const schoolData = {
    description: schoolHistory.description
  };

  if (typeof schoolHistory.coreValues === 'string') {
    const corevalueArray = schoolHistory.coreValues.split(',');
    schoolData.coreValues = corevalueArray.length > 0 ? corevalueArray : [];
  } else if (Array.isArray(schoolHistory.coreValues) && schoolHistory.coreValues.length > 0) {
    schoolData.coreValues = schoolHistory.coreValues;
  } else {
    schoolData.coreValues = [];
  }

  const missionVisionData = {
    mission: missionVision.mission,
    vision: missionVision.vision
  };

  const principleMessageData = {
    name: principleMessage.name,
    message: principleMessage.message
  };

  if (principleMessage.photoUrl) {
    principleMessageData.photoUrl = principleMessage.photoUrl;
  }

  let campusAndFacility = [];
  if (campusFacility && campusFacility.length > 0) {
    campusAndFacility = campusFacility;
  }

  const about = await About.create({
    schoolHistory: schoolData,
    missionVision: missionVisionData,
    principleMessage: principleMessageData,
    campusFacility: campusAndFacility
  });

  if (!about) {
    throw new ApiError(404, "About didn't create");
  }

  return res.status(201).json(new ApiResponse(201, about, 'Create About section successfully'));
});

const getAbout = asyncHandler(async (req, res) => {
  const about = await About.find().lean();
  return res.status(200).json(new ApiResponse(200, about, 'Fetch About'));
});

const updateSchoolHistory = asyncHandler(async (req, res) => {
  const { description, coreValues } = req.body;

  const updateData = {};

  if (description) {
    updateData.description = description;
  }

  if (coreValues) {
    if (typeof coreValues === 'string') {
      const corevalueArray = coreValues.split(',');
      updateData.coreValues = corevalueArray.length > 0 ? corevalueArray : [];
    } else if (Array.isArray(coreValues) && coreValues.length > 0) {
      updateData.coreValues = coreValues;
    }
  }

  if (Object.values(updateData).length === 0) {
    throw new ApiError(400, 'Cannot be empty, please insert a value');
  }

  const schoolHistory = await About.findOneAndUpdate(
    {},
    { $set: { 'schoolHistory': updateData } },
    { new: true, runValidators: true }
  );

  if (!schoolHistory) {
    throw new ApiError(404, "School history didn't update");
  }

  return res.status(200).json(new ApiResponse(200, schoolHistory, 'Update School History successfully'));
});

const updateMissionVision = asyncHandler(async (req, res) => {
  const { mission, vision } = req.body;

  const updateData = {};

  if (mission) updateData['missionVision.mission'] = mission;
  if (vision) updateData['missionVision.vision'] = vision;

  if (Object.values(updateData).length === 0) {
    throw new ApiError(400, 'Cannot be empty, please insert a value');
  }

  const missionVision = await About.findOneAndUpdate(
    {},
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!missionVision) {
    throw new ApiError(404, "Mission Vision didn't update");
  }

  return res.status(200).json(new ApiResponse(200, missionVision, 'Update Mission Vision successfully'));
});

const updatePrincipleMessage = asyncHandler(async (req, res) => {
  const { name, photoUrl, message } = req.body;

  const updateData = {};

  if (name) updateData['principleMessage.name'] = name;
  if (photoUrl) updateData['principleMessage.photoUrl'] = photoUrl;
  if (message) updateData['principleMessage.message'] = message;

  if (Object.values(updateData).length === 0) {
    throw new ApiError(400, 'Cannot be empty, please insert a value');
  }

  const principlemessage = await About.findOneAndUpdate(
    {},
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!principlemessage) {
    throw new ApiError(404, "Principle Message didn't update");
  }

  return res.status(200).json(new ApiResponse(200, principlemessage, 'Update Principle Message successfully'));
});

const addCampusFacility = asyncHandler(async (req, res) => {
  const { name, imageUrl, description } = req.body;

  if (!name || !description) {
    throw new ApiError(400, 'Name and description are required');
  }

  const campusFacility = { name, description };

  if (imageUrl) {
    campusFacility.imageUrl = imageUrl;
  }

  const campusAndFacility = await About.findOneAndUpdate(
    {},
    { $push: { campusFacility: campusFacility } },
    { new: true }
  );

  if (!campusAndFacility) {
    throw new ApiError(404, "Didn't add new campus facility");
  }

  return res.status(201).json(new ApiResponse(201, campusFacility, 'Add campus facility'));
});

const updateCampusFacility = asyncHandler(async (req, res) => {
  const { name, imageUrl, description } = req.body;
  const { facilityId } = req.params;

  if (!name && !description && !imageUrl) {
    throw new ApiError(400, 'At least one field is required to update');
  }

  const updateFields = {};
  if (name) updateFields['campusFacility.$.name'] = name;
  if (description) updateFields['campusFacility.$.description'] = description;
  if (imageUrl) updateFields['campusFacility.$.imageUrl'] = imageUrl;

  const updatecampusandfacility = await About.findOneAndUpdate(
    { 'campusFacility._id': facilityId },
    { $set: updateFields },
    { new: true }
  );

  if (!updatecampusandfacility) {
    throw new ApiError(404, "Didn't update campus facility");
  }

  return res.status(200).json(new ApiResponse(200, updatecampusandfacility, 'Update Campus Facility'));
});

const deleteCampusFacility = asyncHandler(async (req, res) => {
  const { facilityId } = req.params;

  const facility = await About.findOne({ 'campusFacility._id': facilityId });

  if (!facility) {
    throw new ApiError(404, 'Campus Facility not found');
  }

  await About.findOneAndUpdate(
    {},
    { $pull: { campusFacility: { _id: facilityId } } },
    { new: true }
  );

  return res.status(200).json(new ApiResponse(200, {}, 'Delete Campus Facility successfully'));
});


export {
  createAboutSection,
  updateSchoolHistory,
  updateMissionVision,
  updatePrincipleMessage,
  addCampusFacility,
  updateCampusFacility,
  deleteCampusFacility,
  getAbout
};
