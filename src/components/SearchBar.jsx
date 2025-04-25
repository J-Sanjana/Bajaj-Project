import { useState } from "react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  doctors,
  setFilteredDoctors,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim()) {
      const filtered = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredDoctors(doctors);
      setShowSuggestions(false);
    }
  };

  const handleSelectDoctor = (doctorName) => {
    setSearchTerm(doctorName);
    const filtered = doctors.filter(
      (doctor) => doctor.name.toLowerCase() === doctorName.toLowerCase()
    );
    setFilteredDoctors(filtered);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center bg-white rounded-md">
        <input
          data-testid="autocomplete-input"
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onFocus={() => searchTerm && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          className="w-full py-3 px-4 rounded-l-md focus:outline-none"
        />
        <button className="bg-blue-700 text-white p-3 rounded-r-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {showSuggestions && searchTerm && (
        <ul className="absolute z-10 w-full bg-white rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
          {doctors
            .filter((doctor) =>
              doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 5)
            .map((doctor, index) => (
              <li
                key={doctor.id || index}
                data-testid="suggestion-item"
                onClick={() => handleSelectDoctor(doctor.name)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
              >
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">{doctor.name}</p>
                  <p className="text-sm text-gray-500">
                    {doctor.specialities
                      ? doctor.specialities.map((s) => s.name).join(", ")
                      : "Doctor"}
                  </p>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
