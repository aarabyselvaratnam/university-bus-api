const express = require('express');
const router = express.Router();
const {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} = require('../controllers/scheduleController');
const { protect } = require('../middleware/auth');

router.route('/').get(getAllSchedules).post(protect, createSchedule);
router.route('/:id').get(getScheduleById).put(protect, updateSchedule).delete(protect, deleteSchedule);

module.exports = router;