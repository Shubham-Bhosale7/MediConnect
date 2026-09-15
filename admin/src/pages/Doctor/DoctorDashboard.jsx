import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="min-h-screen flex-1 min-w-0 bg-gray-50 p-3 sm:p-6 lg:p-8">
        <p className="mb-5 text-xl font-semibold text-gray-800 sm:mb-6 sm:text-2xl">
          Doctor Dashboard
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <img
              className="w-14 rounded-lg bg-emerald-50 p-3"
              src={assets.earning_icon}
              alt=""
            />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {currency}
                {dashData.earnings}
              </p>
              <p className="text-sm font-medium text-gray-500">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <img
              className="w-14 rounded-lg bg-amber-50 p-3"
              src={assets.appointments_icon}
              alt=""
            />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.appointments}
              </p>
              <p className="text-sm font-medium text-gray-500">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
            <img
              className="w-14 rounded-lg bg-sky-50 p-3"
              src={assets.patients_icon}
              alt=""
            />
            <div>
              <p className="text-2xl font-semibold text-gray-800">
                {dashData.patients}
              </p>
              <p className="text-sm font-medium text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm sm:mt-8">
          <div className="flex items-center gap-3 border-b border-gray-200 px-4 py-4 sm:px-5">
            <img className="h-5 w-5" src={assets.list_icon} alt="" />
            <p className="text-base font-semibold text-gray-800 sm:text-lg">
              Latest Appointments
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={item._id || index}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50 sm:gap-4 sm:px-5 sm:py-4"
              >
                <img
                  className="h-10 w-10 rounded-full bg-gray-100 object-cover sm:h-11 sm:w-11"
                  src={item.userData.image}
                  alt=""
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-800 sm:text-base">
                    {item.userData.name}
                  </p>
                  <p className="mt-1 truncate text-xs text-gray-500 sm:text-sm">
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </p>
                </div>
                <p
                  className={`text-right text-xs font-medium sm:text-sm ${
                    item.cancelled
                      ? "text-red-500"
                      : item.isCompleted
                        ? "text-emerald-600"
                        : "text-gray-500"
                  }`}
                >
                  {item.cancelled
                    ? "Cancelled"
                    : item.isCompleted
                      ? "Completed"
                      : "Upcoming"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
