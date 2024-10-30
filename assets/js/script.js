document.addEventListener('DOMContentLoaded', () => {
    fetchDoctors();
    document.getElementById('appointment-form')?.addEventListener('submit', bookAppointment);
  });
  
  function fetchDoctors() {
    fetch('http://localhost:5000/api/doctors')
      .then(response => response.json())
      .then(data => {
        const doctorList = document.getElementById('doctor-list');
        data.forEach(doctor => {
          const div = document.createElement('div');
          div.className = 'doctor-card';
          div.textContent = `${doctor.name} - ${doctor.specialization}`;
          doctorList.appendChild(div);
        });
      });
  }
  
  function bookAppointment(event) {
    event.preventDefault();
    const patientName = document.getElementById('patientName').value;
    
    fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctorId: "sampleDoctorId", // Replace with dynamic ID if needed
        patientName,
        appointmentDate: new Date(),
      })
    })
    .then(response => response.json())
    .then(data => alert('Appointment booked successfully!'))
    .catch(err => console.error(err));
  }
  
  // Example filter query on frontend
fetch(`http://localhost:5000/api/doctors?specialization=${specialization}&location=${location}`)
.then(response => response.json())
.then(data => {
  // Display filtered doctors
});

exports.getFilteredDoctors = async (req, res) => {
  const { specialization, location } = req.query;
  const query = {};
  if (specialization) query.specialization = specialization;
  if (location) query.location = location;

  try {
    const doctors = await Doctor.find(query);
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
