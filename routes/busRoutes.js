const express = require('express');
const router = express.Router();
const {
  getAllBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBus,
} = require('../controllers/busController');
const { protect } = require('../middleware/auth');

router.route('/').get(getAllBuses).post(protect, createBus);
router.route('/:id').get(getBusById).put(protect, updateBus).delete(protect, deleteBus);

module.exports = router;