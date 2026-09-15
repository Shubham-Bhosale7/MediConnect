import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="min-h-screen flex-1 bg-gray-50 p-5 sm:p-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.doctors}
              </p>
              <p className="text-lg font-semibold text-gray-500">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <img
              className="h-12 w-12 rounded-lg bg-amber-50 p-3"
              src={assets.appointment_icon}
              alt=""
            />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.appointments}
              </p>
              <p className="text-lg font-semibold text-gray-500">
                Appointments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.patients}
              </p>
              <p className="text-lg font-semibold text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-4">
            <img className="h-5 w-5" src={assets.list_icon} alt="" />
            <p className="text-lg font-semibold text-gray-800">
              Latest Bookings
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-gray-50"
              >
                <img
                  className="h-11 w-11 rounded-full bg-gray-100 object-cover"
                  src={item.docData.image}
                  alt=""
                />
                <div className="min-w-0">
                  <p className="truncate font-medium text-gray-800">
                    {item.docData.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="justify-self-center text-xs font-medium text-red-500">
                    Cancelled
                  </p>
                ) : item.isCompleted ? (
                  <p className="justify-self-center text-xs font-medium text-green-500">
                    Completed
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
      </div>
    )
  );
};

export default Dashboard;
