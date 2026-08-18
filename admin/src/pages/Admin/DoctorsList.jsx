import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, getAllDoctors, aToken, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      console.log("hello1");
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Doctors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer"
          >
            <img
              src={item.image}
              alt=""
              className="w-full h-48 bg-indigo-50 group-hover:bg-primary transition-all duration-500"
            />
            <div className="p-4">
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600 mb-4">{item.speciality}</p>
              <div className="flex items-center gap-2">
                <input
                  onChange={() => changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  className="w-4 h-4 cursor-pointer"
                />
                <p className="text-sm text-gray-700 font-medium">Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
