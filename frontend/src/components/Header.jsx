import React from "react";
import { assets } from "../assets/assets_admin/assets";
import { assetsFrontend } from "../assets/assets_frontend/assets";

const Header = () => {
  return (
    <div className="flex flex-col overflow-hidden rounded-[24px] bg-gradient-to-br from-primary via-cyan-600 to-cyan-700 px-6 md:flex-row md:flex-wrap md:px-10 lg:px-20">
      {/* ------- Left Side --------*/}
      <div className="flex flex-col items-start justify-center gap-4 py-10 md:w-1/2 md:py-[8vw] md:mb-[-7.5]">
        <span className="rounded-full border border-white/30 bg-white/15 px-4 py-1 text-sm font-medium text-white/90 backdrop-blur-sm">
          Care made simple
        </span>
        <p className="text-3xl font-semibold leading-tight text-white md:text-4xl lg:text-5xl">
          Book appointments <br /> with trusted doctors
        </p>
        <div className="flex flex-col items-center gap-3 text-sm font-light text-white/90 md:flex-row">
          <img className="w-28" src={assetsFrontend.group_profiles} alt="" />
          <p>
            Browse specialists, compare availability, and schedule your visit in
            just a few clicks.
          </p>
        </div>
        <a
          href="#speciality"
          className="flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm text-gray-700 transition-all duration-300 hover:scale-105 md:m-0"
        >
          Book appointment
          <img className="w-3" src={assetsFrontend.arrow_icon} alt="" />
        </a>
      </div>

      {/* -------- Right Side ------- */}
      <div className="relative md:w-1/2">
        <img
          className="h-auto w-full rounded-t-[24px] md:absolute md:bottom-0 md:rounded-none"
          src={assetsFrontend.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
