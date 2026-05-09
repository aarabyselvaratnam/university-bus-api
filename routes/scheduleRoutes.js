const express = require('express');
const router = express.Router();
const {
  getAllSchedules,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} = require('../controllers/scheduleController');

router.route('/').get(getAllSchedules).post(createSchedule);
router.route('/:id').get(getScheduleById).put(updateSchedule).delete(deleteSchedule);

module.exports = router;