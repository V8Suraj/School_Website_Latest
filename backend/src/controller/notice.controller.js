import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import Notice from '../models/notice.mode.js';
import ApiError from '../utils/ApiError.js';


const newNotice = asyncHandler(async (req, res) => {
  const { title, category, content, date, attachmentUrl } = req.body;

  const noticeData = {
    title,
    category,
    content,
    date
  };

  if (attachmentUrl) {
    noticeData.attachmentUrl = attachmentUrl;
  }

  const notice = await Notice.create(noticeData);

  if (!notice) {
    throw new ApiError(404, "Notice can't be posted");
  }

  return res.status(201).json(new ApiResponse(201, notice, 'New Notice posted successfully'));
});

const updateNotice = asyncHandler(async (req, res) => {
  const { noticeId } = req.params;
  const updateData = { ...req.body };

  const notice = await Notice.findById(noticeId);

  if (!notice) {
    throw new ApiError(404, 'Notice not found');
  }

  if (!updateData || Object.keys(updateData).length === 0) {
    throw new ApiError(400, 'No data provided to update');
  }

  if (updateData.date) {
    const parsedDate = new Date(updateData.date);
    if (isNaN(parsedDate.getTime())) {
      throw new ApiError(400, 'Invalid date format. Use YYYY-MM-DD');
    }
    updateData.date = parsedDate;
  }

  const noticeUpdate = await Notice.findByIdAndUpdate(
    noticeId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!noticeUpdate) {
    throw new ApiError(404, 'Notice not found');
  }

  return res.status(200).json(new ApiResponse(200, noticeUpdate, 'Notice updated successfully'));
});

const getAllNotice = asyncHandler(async (req, res) => {
  const allNotice = await Notice.find().lean();
  return res.status(200).json(new ApiResponse(200, allNotice, 'Notice fetched successfully'));
});

const deleteNotice = asyncHandler(async (req, res) => {
  const { noticeId } = req.params;

  const notice = await Notice.findById(noticeId);

  if (!notice) {
    throw new ApiError(404, 'Notice not found');
  }

  await Notice.findByIdAndDelete(notice._id);

  return res.status(200).json(new ApiResponse(200, {}, 'Notice deleted successfully'));
});


export {
  newNotice,
  updateNotice,
  getAllNotice,
  deleteNotice
};
