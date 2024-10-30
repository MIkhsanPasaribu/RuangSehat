const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patientName: String,
  appointmentDate: Date,
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
