const express = require('express');
const router = express.Router();
const { authenticate, authorizeRole } = require('../middlewares/auth');
const appointmentController = require('../controllers/appointmentController');

router.get('/appointments', authenticate, authorizeRole('patient'), appointmentController.getPatientAppointments);

module.exports = router;