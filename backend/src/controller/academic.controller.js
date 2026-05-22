import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import Academics from '../models/academic.model.js';
import ApiError from '../utils/ApiError.js';
import Department from '../models/department.model.js';


const newAcadimics = asyncHandler(async (req, res) => {
  const { curriculumOverview, teachingMethodology, deparment } = req.body;

  const academicsData = {
    curriculumOverview,
    teachingMethodology
  };

  if (deparment !== undefined) {
    const department = await Department.create({
      departments: deparment
    });

    academicsData.departmentId = department?._id;
  }

  const academics = await Academics.create(academicsData);

  if (!academics) {
    throw new ApiError(400, 'Bad request');
  }

  return res.status(201).json(new ApiResponse(201, academics, 'Create new academics'));
});

const updateDepartment = asyncHandler(async (req, res) => {
  const { departmentName, description } = req.body;
  const { departmentId } = req.params;

  const departmentUpdateData = {};

  if (departmentName) departmentUpdateData.departmentName = departmentName;
  if (description) departmentUpdateData.description = description;

  if (Object.keys(departmentUpdateData).length === 0) {
    throw new ApiError(400, 'No data provided to update');
  }

  const department = await Department.findByIdAndUpdate(
    departmentId,
    { $set: departmentUpdateData },
    { new: true, runValidators: true }
  );

  if (!department) {
    throw new ApiError(404, "Department can't be found");
  }

  return res.status(200).json(new ApiResponse(200, department, 'Department updated successfully'));
});


export {
  newAcadimics,
  updateDepartment
};
