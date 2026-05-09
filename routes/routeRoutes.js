const express = require('express');
const router = express.Router();
const {
  getAllRoutes,
  getRouteById,
  createRoute,
  updateRoute,
  deleteRoute,
  
} = require('../controllers/routeController');

router.route('/').get(getAllRoutes).post(createRoute);
router.route('/:id').get(getRouteById).put(updateRoute).delete(deleteRoute);

module.exports = router;