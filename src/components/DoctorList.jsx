import React from 'react';

const DoctorList = ({ doctors }) => {
  return (
    <div>
      {doctors.map(doctor => (
        <div key={doctor.id} data-testid="doctor-card">
          <h4 data-testid="doctor-name">{doctor.name}</h4>
          <p data-testid="doctor-specialty">{doctor.specialities.map(s => s.name).join(', ')}</p>
          <p data-testid="doctor-experience">{doctor.experience} years of experience</p>
          <p data-testid="doctor-fee">Fee: ${doctor.fee}</p>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;