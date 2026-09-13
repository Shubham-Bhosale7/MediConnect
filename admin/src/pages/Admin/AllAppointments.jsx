import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);
  return (
    <div className="flex-1 min-w-0 w-full min-h-screen bg-gray-50 p-5 sm:p-8">
      <p className="mb-6 text-2xl font-semibold text-gray-800">
        All Appointments
      </p>

      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="grid min-w-[760px] grid-cols-[0.4fr_1.6fr_0.8fr_1.5fr_1.6fr_0.8fr_1fr] items-center gap-4 px-5 py-4 bg-gray-100 text-sm font-semibold text-gray-700">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date &amp; Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid min-w-[760px] grid-cols-[0.4fr_1.6fr_0.8fr_1.5fr_1.6fr_0.8fr_1fr] items-center gap-4 border-t border-gray-200 px-5 py-4 text-sm text-gray-600"
          >
            <p className="text-gray-500">{index + 1}</p>
            <div className="flex min-w-0 items-center gap-3">
              <img
                className="h-9 w-9 rounded-full object-cover"
                src={item.userData.image}
                alt=""
              />
              <p className="truncate font-medium text-gray-800">
                {item.userData.name}
              </p>
            </div>
            <p className="whitespace-nowrap">
              {calculateAge(item.userData.dob)}
            </p>
            <p className="whitespace-nowrap">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <div className="flex min-w-0 items-center gap-3">
              <img
                className="h-9 w-9 rounded-full bg-gray-200 object-cover"
                src={item.docData.image}
                alt=""
              />
              <p className="truncate font-medium text-gray-800">
                {item.docData.name}
              </p>
            </div>
            <p className="whitespace-nowrap">
              {currency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="justify-self-center text-xs font-medium text-red-500">
                Cancelled
              </p>
            ) : (
              <img
                onClick={() => cancelAppointment(item._id)}
                className="w-8 cursor-pointer justify-self-center opacity-70 transition-opacity hover:opacity-100"
                src={assets.cancel_icon}
                alt="Cancel appointment"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAppointments;
