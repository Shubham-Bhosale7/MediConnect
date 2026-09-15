import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currrency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  useEffect(() => {
    if (dToken) {
      completeAppointment();
    }
  }, [dToken, appointments]);

  return (
    <div className="min-h-screen flex-1 min-w-0 overflow-hidden bg-gray-50 p-2 sm:p-6 lg:p-8">
      <p className="mb-4 text-lg font-semibold text-gray-800 sm:mb-6 sm:text-2xl">
        All Appointments
      </p>

      <div className="w-full max-w-full touch-pan-x overscroll-x-contain overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 bg-gray-100 px-3 py-3 text-xs font-semibold leading-5 text-gray-700 sm:min-w-190 sm:grid-cols-[0.4fr_1.6fr_1fr_0.8fr_1.5fr_0.8fr_1fr] sm:gap-4 sm:px-5 sm:py-4 sm:text-sm">
          <p className="hidden sm:block">#</p>
          <p>Patient</p>
          <p className="hidden sm:block">Payment</p>
          <p className="hidden sm:block">Age</p>
          <p className="hidden sm:block">Date &amp; Time</p>
          <p className="hidden sm:block">Fees</p>
          <p>Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-t border-gray-200 px-3 py-3 text-xs leading-5 text-gray-600 transition-colors hover:bg-gray-50 sm:min-w-190 sm:grid-cols-[0.4fr_1.6fr_1fr_0.8fr_1.5fr_0.8fr_1fr] sm:gap-4 sm:px-5 sm:py-4 sm:text-sm"
          >
            <p className="hidden text-gray-500 sm:block">{index + 1}</p>
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <img
                className="h-8 w-8 shrink-0 rounded-full object-cover sm:h-9 sm:w-9"
                src={item.userData.image}
                alt=""
              />
              <p className="truncate font-medium text-gray-800">
                {item.userData.name}
              </p>
            </div>
            <div className="hidden whitespace-nowrap sm:block">
              <p
                className={
                  item.payment
                    ? "font-medium text-emerald-600"
                    : "font-medium text-amber-600"
                }
              >
                {item.payment ? "Online" : "Cash"}
              </p>
            </div>
            <p className="hidden whitespace-nowrap sm:block">
              {calculateAge(item.userData.dob)}
            </p>
            <p className="hidden whitespace-nowrap sm:block">
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p className="hidden whitespace-nowrap font-medium text-gray-800 sm:block">
              {currrency}
              {item.amount}
            </p>
            {item.cancelled ? (
              <p className="justify-self-center text-xs font-medium text-red-500">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="justify-self-center text-xs font-medium text-green-500">Completed</p>
            ) : (
              <div className="flex items-center justify-self-end gap-2 sm:justify-self-auto sm:gap-3">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="h-7 w-7 cursor-pointer object-contain opacity-75 transition-opacity hover:opacity-100 sm:h-8 sm:w-8"
                  src={assets.cancel_icon}
                  alt="Cancel appointment"
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="h-7 w-7 cursor-pointer object-contain opacity-75 transition-opacity hover:opacity-100 sm:h-8 sm:w-8"
                  src={assets.tick_icon}
                  alt="Complete appointment"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
