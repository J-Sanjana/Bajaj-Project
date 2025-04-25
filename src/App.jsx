import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    consultationType: '',
    specialties: [],
    sortBy: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 py-4 px-4 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm} 
              doctors={doctors} 
              setFilteredDoctors={setFilteredDoctors} 
            />
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4">
            <FilterPanel 
              filters={filters} 
              setFilters={setFilters} 
              setFilteredDoctors={setFilteredDoctors} 
              doctors={doctors} 
            />
          </div>
          
          <div className="w-full md:w-3/4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
              </div>
            ) : (
              <DoctorList doctors={filteredDoctors} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;