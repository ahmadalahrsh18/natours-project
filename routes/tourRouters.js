
const express = require('express');
const tourController = require('./../controllers/tourcontroller')


const router = express.Router();

// router.param('id',tourController.checkID);

router
.route('/')
.get(tourController.getAllTours)
.post(tourController.CreateTour);

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.DeleteTour);

module.exports = router;