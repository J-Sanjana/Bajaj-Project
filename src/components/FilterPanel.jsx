import { useState } from "react";

const FilterPanel = ({ filters, setFilters, setFilteredDoctors, doctors }) => {
  const [isSpecialtiesOpen, setIsSpecialtiesOpen] = useState(true);
  const [isSortByOpen, setIsSortByOpen] = useState(true);
  const [isConsultationOpen, setIsConsultationOpen] = useState(true);

  // Updated list to include all specialties
  const allSpecialties = [
    "General Physician",
    "Dentist",
    "Dermatologist",
    "Paediatrician",
    "Gynaecologist",
    "ENT",
    "Diabetologist",
    "Cardiologist",
    "Physiotherapist",
    "Endocrinologist",
    "Orthopaedic",
    "Ophthalmologist",
    "Gastroenterologist",
    "Pulmonologist",
    "Psychiatrist",
    "Urologist",
    "Dietitian/Nutritionist",
    "Psychologist",
    "Sexologist",
    "Nephrologist",
    "Neurologist",
    "Oncologist",
    "Ayurveda",
    "Homeopath"
  ];

  const handleConsultationChange = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, consultationType: value });
    applyFilters({ ...filters, consultationType: value });
  };

  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    const updatedSpecialties = filters.specialties.includes(value)
      ? filters.specialties.filter((specialty) => specialty !== value)
      : [...filters.specialties, value];
    setFilters({ ...filters, specialties: updatedSpecialties });
    applyFilters({ ...filters, specialties: updatedSpecialties });
  };

  const handleSortChange = (value) => {
    setFilters({ ...filters, sortBy: value });
    applyFilters({ ...filters, sortBy: value });
  };

  const applyFilters = (updatedFilters) => {
    let filtered = [...doctors];

    if (updatedFilters.consultationType) {
      filtered = filtered.filter(
        (doctor) =>
          (updatedFilters.consultationType === "Video Consult" &&
            doctor.video_consult) ||
          (updatedFilters.consultationType === "In Clinic" && doctor.in_clinic)
      );
    }

    if (updatedFilters.specialties.length > 0) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.specialities &&
          doctor.specialities.some((specialty) =>
            updatedFilters.specialties.includes(specialty.name)
          )
      );
    }

    if (updatedFilters.sortBy === "fees") {
      filtered = filtered.sort((a, b) => a.fee - b.fee);
    } else if (updatedFilters.sortBy === "experience") {
      filtered = filtered.sort((a, b) => b.experience - a.experience);
    }

    setFilteredDoctors(filtered);
  };

  const clearAllFilters = () => {
    setFilters({
      consultationType: "",
      specialties: [],
      sortBy: "",
    });
    setFilteredDoctors(doctors);
  };

  // Helper function to format specialty name for test ID
  const formatSpecialtyTestId = (specialty) => {
    return specialty.replace(/\//g, "-").replace(/\s+/g, "-");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        {(filters.consultationType ||
          filters.specialties.length > 0 ||
          filters.sortBy) && (
          <button
            onClick={clearAllFilters}
            className="text-blue-700 text-sm font-medium"
            data-testid="clear-all-filters"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Sort By Section */}
      <div className="mb-6 border-b pb-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => setIsSortByOpen(!isSortByOpen)}
        >
          <h3 className="font-medium" data-testid="filter-header-sort">
            Sort by
          </h3>
          <svg
            className={`w-5 h-5 transition-transform ${
              isSortByOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {isSortByOpen && (
          <div className="pl-1 space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                data-testid="sort-fees"
                type="radio"
                className="form-radio text-blue-700"
                checked={filters.sortBy === "fees"}
                onChange={() => handleSortChange("fees")}
              />
              <span className="text-sm">Price: Low-High</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                data-testid="sort-experience"
                type="radio"
                className="form-radio text-blue-700"
                checked={filters.sortBy === "experience"}
                onChange={() => handleSortChange("experience")}
              />
              <span className="text-sm">Experience: Most Experience first</span>
            </label>
          </div>
        )}
      </div>

      {/* Specialties Section */}
      <div className="mb-6 border-b pb-4">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => setIsSpecialtiesOpen(!isSpecialtiesOpen)}
        >
          <h3 className="font-medium" data-testid="filter-header-speciality">
            Specialities
          </h3>
          <svg
            className={`w-5 h-5 transition-transform ${
              isSpecialtiesOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {isSpecialtiesOpen && (
          <div className="pl-1 space-y-2 max-h-48 overflow-y-auto">
            {allSpecialties.map((specialty) => (
              <label
                key={specialty}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  data-testid={`filter-specialty-${formatSpecialtyTestId(specialty)}`}
                  type="checkbox"
                  className="form-checkbox text-blue-700"
                  value={specialty}
                  checked={filters.specialties.includes(specialty)}
                  onChange={handleSpecialtyChange}
                />
                <span className="text-sm">{specialty}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Consultation Mode Section */}
      <div className="mb-2">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => setIsConsultationOpen(!isConsultationOpen)}
        >
          <h3 className="font-medium" data-testid="filter-header-moc">
            Mode of consultation
          </h3>
          <svg
            className={`w-5 h-5 transition-transform ${
              isConsultationOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {isConsultationOpen && (
          <div className="pl-1 space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                data-testid="filter-video-consult"
                type="radio"
                className="form-radio text-blue-700"
                value="Video Consult"
                checked={filters.consultationType === "Video Consult"}
                onChange={handleConsultationChange}
              />
              <span className="text-sm">Video Consultation</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                data-testid="filter-in-clinic"
                type="radio"
                className="form-radio text-blue-700"
                value="In Clinic"
                checked={filters.consultationType === "In Clinic"}
                onChange={handleConsultationChange}
              />
              <span className="text-sm">In-clinic Consultation</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;