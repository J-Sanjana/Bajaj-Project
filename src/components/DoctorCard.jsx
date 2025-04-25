const DoctorCard = ({ doctor }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      data-testid="doctor-card"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 mr-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
              {/* Placeholder for doctor image */}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div>
                <h3
                  className="text-lg font-semibold text-gray-900"
                  data-testid="doctor-name"
                >
                  {doctor.name || "Dr. Name"}
                </h3>
                <p
                  className="text-sm text-gray-600"
                  data-testid="doctor-specialty"
                >
                  {doctor.specialities
                    ? doctor.specialities.map((s) => s.name).join(", ")
                    : "General Physician"}
                </p>
                <p
                  className="text-sm text-gray-600 mt-1"
                  data-testid="doctor-experience"
                >
                  {doctor.experience || 0} yrs exp.
                </p>
              </div>

              <div className="mt-2 sm:mt-0 text-right">
                <p
                  className="text-lg font-semibold text-gray-900"
                  data-testid="doctor-fee"
                >
                  ₹ {doctor.fee || 0}
                </p>
              </div>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center text-sm text-gray-600 mb-2 sm:mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>
                  {doctor.location ||
                    (doctor.clinics && doctor.clinics[0]) ||
                    "Location"}
                </span>
              </div>

              <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition duration-200">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
