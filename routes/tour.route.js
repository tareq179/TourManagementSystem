const express = require('express');
const tourController = require('../controllers/tour.controller');
const router = express.Router();

router.route("/bulk-update").patch(tourController.bulkUpdateTour)
router.route("/bulk-delete").delete(tourController.bulkDeleteTour)

router.route('/')
.get(tourController.getTours)
.post(tourController.createTour)

router.route("/:id").patch(tourController.updateTour).delete(tourController.deleteTourById)

module.exports = router;
