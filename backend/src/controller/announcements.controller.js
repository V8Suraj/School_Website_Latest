import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import Announcement from '../models/announcements.model.js';
import ApiError from '../utils/ApiError.js';


const createNewAnnouncement = asyncHandler(async (req, res) => {
  const { title, category, date, content } = req.body;

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    throw new ApiError(400, 'Invalid date format. Use YYYY-MM-DD');
  }

  const announcementData = {
    title,
    category,
    date: parsedDate,
    content
  };

  const announcements = await Announcement.create(announcementData);

  if (!announcements) {
    throw new ApiError(501, 'Announcement could not be created');
  }

  return res.status(201).json(new ApiResponse(201, announcements, 'New Announcement created successfully'));
});

const updateAnnouncement = asyncHandler(async (req, res) => {
  const { announcementId } = req.params;
  const updateData = { ...req.body };

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

  const updatedAnnouncement = await Announcement.findByIdAndUpdate(
    announcementId,
    { $set: updateData },
    { new: true, runValidators: true }
  );

  if (!updatedAnnouncement) {
    throw new ApiError(404, 'Announcement not found');
  }

  return res.status(200).json(
    new ApiResponse(200, updatedAnnouncement, 'Announcement updated successfully')
  );
});

const getAllAnnouncements = asyncHandler(async (req, res) => {
  const allAnnouncement = await Announcement.find().lean();
  return res.status(200).json(new ApiResponse(200, allAnnouncement, 'Fetch all announcements'));
});

const deleteAnnouncement = asyncHandler(async (req, res) => {
  const { announcementId } = req.params;

  const announcement = await Announcement.findById(announcementId);

  if (!announcement) {
    throw new ApiError(404, 'Announcement not found');
  }

  await Announcement.findByIdAndDelete(announcementId);

  return res.status(200).json(new ApiResponse(200, {}, 'Announcement deleted successfully'));
});


export {
  createNewAnnouncement,
  updateAnnouncement,
  getAllAnnouncements,
  deleteAnnouncement
};
