import DoctorCard from "./DoctorCard";

const DoctorList = ({ doctors }) => {
  if (doctors.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">
          No doctors found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {doctors.map((doctor, index) => (
        <DoctorCard key={doctor.id || index} doctor={doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
