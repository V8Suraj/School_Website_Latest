import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import Admission from '../models/admission.model.js';
import ApiError from '../utils/ApiError.js';


const newAdmission = asyncHandler(async (req, res) => {
  const {
    parentName,
    childName,
    email,
    phon,
    additionalMessage
  } = req.body;

  const admissionData = {
    parentName,
    childName,
    email,
    phon
  };

  if (additionalMessage) {
    admissionData.additionalMessage = additionalMessage;
  }

  const admission = await Admission.create(admissionData);

  if (!admission) {
    throw new ApiError(400, 'Admission not created');
  }

  return res.status(201).json(new ApiResponse(201, admission, 'New Admission'));
});

const updateAdmissionStatus = asyncHandler(async (req, res) => {
  const { admissionId } = req.params;
  const { status } = req.body;

  if (!status) {
    throw new ApiError(400, 'Status is required');
  }

  const admission = await Admission.findById(admissionId);

  if (!admission) {
    throw new ApiError(404, 'Admission not found');
  }

  const updateAdmissionResult = await Admission.findByIdAndUpdate(
    admission._id,
    { $set: { status } },
    { new: true, runValidators: true }
  );

  if (!updateAdmissionResult) {
    throw new ApiError(400, "Admission didn't update");
  }

  return res.status(200).json(new ApiResponse(200, updateAdmissionResult, 'Admission updated successfully'));
});

const getAllAdmissions = asyncHandler(async (req, res) => {
  const allAdmissions = await Admission.find().lean();
  return res.status(200).json(new ApiResponse(200, allAdmissions, 'Fetch all admissions successfully'));
});

const deleteAdmission = asyncHandler(async (req, res) => {
  const { admissionId } = req.params;

  const admission = await Admission.findById(admissionId);

  if (!admission) {
    throw new ApiError(404, "Admission can't be found");
  }

  await Admission.findByIdAndDelete(admission._id);

  return res.status(200).json(new ApiResponse(200, {}, 'Admission deleted successfully'));
});


export {
  newAdmission,
  updateAdmissionStatus,
  deleteAdmission,
  getAllAdmissions
};
