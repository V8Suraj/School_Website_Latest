import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import ApiError from '../utils/ApiError.js';
import FeeStructure from '../models/feeStructure.model.js';

const addClassFees = asyncHandler(async (req, res) => {
  const {
    classOrGrade,
    tutionFee,
    admissionFee,
    examFee,
    otherCharges
  } = req.body;

  if (!classOrGrade || !tutionFee || !admissionFee || !examFee || !otherCharges) {
    throw new ApiError(400, 'All fields are required');
  }

  const classFeeData = {
    classOrGrade,
    tutionFee: typeof tutionFee === 'string' ? Number(tutionFee) : tutionFee,
    admissionFee: typeof admissionFee === 'string' ? Number(admissionFee) : admissionFee,
    examFee: typeof examFee === 'string' ? Number(examFee) : examFee,
    otherCharges: typeof otherCharges === 'string' ? Number(otherCharges) : otherCharges
  };

  const createClassFee = await FeeStructure.create(classFeeData);

  if (!createClassFee) {
    throw new ApiError(404, "Class fee didn't create");
  }

  return res.status(201).json(new ApiResponse(201, createClassFee, 'Add New Class Fees Successfully'));
});

const updateClassFee = asyncHandler(async (req, res) => {
  const { classId } = req.params;
  const {
    classOrGrade,
    tutionFee,
    admissionFee,
    examFee,
    otherCharges
  } = req.body;

  const classFeesStructure = await FeeStructure.findById(classId);

  if (!classFeesStructure) {
    throw new ApiError(404, "Class fee structure not found");
  }

  const updateData = {};

  if (classOrGrade) updateData.classOrGrade = classOrGrade;
  if (tutionFee !== undefined) updateData.tutionFee = typeof tutionFee === 'string' ? Number(tutionFee) : tutionFee;
  if (admissionFee !== undefined) updateData.admissionFee = typeof admissionFee === 'string' ? Number(admissionFee) : admissionFee;
  if (examFee !== undefined) updateData.examFee = typeof examFee === 'string' ? Number(examFee) : examFee;
  if (otherCharges !== undefined) updateData.otherCharges = typeof otherCharges === 'string' ? Number(otherCharges) : otherCharges;

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(400, 'No data provided to update');
  }

  const updateFeeStructure = await FeeStructure.findByIdAndUpdate(
    classId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updateFeeStructure) {
    throw new ApiError(404, "Fee structure didn't update");
  }

  return res.status(200).json(new ApiResponse(200, updateFeeStructure, 'Update Fee Structure Successfully'));
});

const getFullOfFeeStructure = asyncHandler(async (req, res) => {
  const getfullstructure = await FeeStructure.find().lean();
  return res.status(200).json(new ApiResponse(200, getfullstructure, 'Fetch full fee structure successfully'));
});

const deleteFeeStructreClass = asyncHandler(async (req, res) => {
  const { classId } = req.params;

  const classFeeStructre = await FeeStructure.findById(classId);

  if (!classFeeStructre) {
    throw new ApiError(404, "Can't find Class Fee Structure");
  }

  await FeeStructure.findByIdAndDelete(classId);

  return res.status(200).json(new ApiResponse(200, {}, 'Fee Structure deleted successfully'));
});


export {
  addClassFees,
  updateClassFee,
  getFullOfFeeStructure,
  deleteFeeStructreClass
};
