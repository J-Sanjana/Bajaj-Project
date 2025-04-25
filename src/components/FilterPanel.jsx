import React from 'react';

const FilterPanel = ({ filters, setFilters, setFilteredDoctors, doctors }) => {
  const handleConsultationChange = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, consultationType: value });
    applyFilters({ ...filters, consultationType: value });
  };

  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    const updatedSpecialties = filters.specialties.includes(value)
      ? filters.specialties.filter(specialty => specialty !== value)
      : [...filters.specialties, value];
    setFilters({ ...filters, specialties: updatedSpecialties });
    applyFilters({ ...filters, specialties: updatedSpecialties });
  };

  const applyFilters = (updatedFilters) => {
    let filtered = doctors;

    if (updatedFilters.consultationType) {
      filtered = filtered.filter(doctor => 
        (updatedFilters.consultationType === 'Video Consult' && doctor.video_consult) || 
        (updatedFilters.consultationType === 'In Clinic' && doctor.in_clinic)
      );
    }

    if (updatedFilters.specialties.length > 0) {
      filtered = filtered.filter(doctor => 
        doctor.specialities.some(specialty => updatedFilters.specialties.includes(specialty.name))
      );
    }
    if (updatedFilters.sortBy === 'fees') {
        filtered = filtered.sort((a, b) => a.fee - b.fee);
      } else if (updatedFilters.sortBy === 'experience') {
        filtered = filtered.sort((a, b) => b.experience - a.experience);
      }
  
      setFilteredDoctors(filtered);
    };
  
    return (
      <div>
        <div>
          <h3 data-testid="filter-header-moc">Consultation Mode</h3>
          <label>
            <input 
              data-testid="filter-video-consult" 
              type="radio" 
              value="Video Consult" 
              checked={filters.consultationType === 'Video Consult'} 
              onChange={handleConsultationChange} 
            />
            Video Consult
          </label>
          <label>
            <input 
              data-testid="filter-in-clinic" 
              type="radio" 
              value="In Clinic" 
              checked={filters.consultationType === 'In Clinic'} 
              onChange={handleConsultationChange} 
            />
            In Clinic
          </label>
        </div>
  
        <div>
          <h3 data-testid="filter-header-speciality">Specialties</h3>
          {['General Physician', 'Dentist', 'Dermatologist', 'Paediatrician', 'Gynaecologist', 'ENT', 'Diabetologist', 'Cardiologist', 'Physiotherapist', 'Endocrinologist', 'Orthopaedic', 'Ophthalmologist', 'Gastroenterologist', 'Pulmonologist', 'Psychiatrist', 'Urologist', 'Dietitian/Nutritionist', 'Psychologist', 'Sexologist', 'Nephrologist', 'Neurologist', 'Oncologist', 'Ayurveda', 'Homeopath'].map(specialty => (
            <label key={specialty}>
              <input 
                data-testid={`filter-specialty-${specialty.replace(/\s+/g, '-')}`} 
                type="checkbox" 
                value={specialty} 
                checked={filters.specialties.includes(specialty)} 
                onChange={handleSpecialtyChange} 
              />
              {specialty}
            </label>
          ))}
        </div>
  
        <div>
          <h3 data-testid="filter-header-sort">Sort</h3>
          <label>
            <input 
              data-testid="sort-fees" 
              type="radio" 
              value="fees" 
              checked={filters.sortBy === 'fees'} 
              onChange={() => setFilters({ ...filters, sortBy: 'fees' })} 
            />
            Sort by Fees (Ascending)
          </label>
          <label>
            <input 
              data-testid="sort-experience" 
              type="radio" 
              value="experience" 
              checked={filters.sortBy === 'experience'} 
              onChange={() => setFilters({ ...filters, sortBy: 'experience' })} 
            />
            Sort by Experience (Descending)
          </label>
        </div>
      </div>
    );
  };
  
  export default FilterPanel;