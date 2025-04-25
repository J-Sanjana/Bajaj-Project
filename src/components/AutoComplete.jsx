import React from 'react';

const Autocomplete = ({ searchTerm, setSearchTerm, doctors, setFilteredDoctors }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = doctors.filter(doctor => doctor.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredDoctors(filtered.slice(0, 3)); // Show top 3 matches
  };

  return (
    <div>
      <input 
        data-testid="autocomplete-input" 
        type="text" 
        value={searchTerm} 
        onChange={handleChange} 
        placeholder="Search for a doctor..." 
      />
      {searchTerm && (
        <ul>
          {doctors.filter(doctor => doctor.name.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 3).map(doctor => (
            <li key={doctor.id} data-testid="suggestion-item" onClick={() => setSearchTerm(doctor.name)}>
              {doctor.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;