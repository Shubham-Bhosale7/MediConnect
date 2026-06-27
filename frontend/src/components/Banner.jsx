import React from "react";
import { assets } from "../assets/assets_admin/assets";
import { assetsFrontend } from "../assets/assets_frontend/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="my-20 flex rounded-[24px] bg-gradient-to-r from-primary to-cyan-700 px-6 shadow-[0_18px_45px_-20px_rgba(0,161,176,0.6)] sm:px-10 md:mx-10 md:px-14 lg:px-12">
      {/* -------- Left Side --------- */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100">
          Fast booking
        </p>
        <div className="text-xl font-semibold text-white sm:text-2xl md:text-3xl lg:text-5xl">
          <p className="mt-2">Book appointments</p>
          <p>with 100+ trusted doctors</p>
        </div>
        <p className="mt-4 max-w-xl text-sm text-cyan-50 sm:text-base">
          Secure your visit in minutes and stay connected with care that fits
          your schedule.
        </p>
        <button
          onClick={() => {
            navigate(`/login`);
            scrollTo(0, 0);
          }}
          className="mt-6 cursor-pointer rounded-full bg-white px-8 py-3 text-sm text-gray-700 transition-all duration-300 hover:scale-105 sm:text-base"
        >
          Create account
        </button>
      </div>

      {/* -------- Right Side ---------*/}
      <div className="relative hidden md:block md:w-1/2 lg:w-[92.5]">
        <img
          className="absolute bottom-0 right-0 w-full max-w-md"
          src={assetsFrontend.appointment_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
