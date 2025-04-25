import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorList from './components/DoctorList.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import Autocomplete from './components/AutoComplete.jsx';

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    consultationType: '',
    specialties: [],
    sortBy: ''
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await axios.get('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
      setDoctors(response.data);
      setFilteredDoctors(response.data);
    };
    fetchDoctors();
  }, []);

  return (
    <div>
      <h1>Doctor Listing</h1>
      <Autocomplete 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        doctors={doctors} 
        setFilteredDoctors={setFilteredDoctors} 
      />
      <FilterPanel filters={filters} setFilters={setFilters} setFilteredDoctors={setFilteredDoctors} doctors={doctors} />
      <DoctorList doctors={filteredDoctors} />
    </div>
  );
};

export default App;













