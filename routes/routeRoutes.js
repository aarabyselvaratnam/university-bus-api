const express = require('express');
const router = express.Router();
const {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
} = require('../controllers/routeController');
const { protect } = require('../middleware/auth');

router.route('/').get(getAllRoutes).post(protect, createRoute);
router.route('/:id').get(getRouteById).put(protect, updateRoute).delete(protect, deleteRoute);

module.exports = router;