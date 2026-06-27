import React from "react";
import { assetsFrontend } from "../assets/assets_frontend/assets";
import { assets } from "../assets/assets_admin/assets";

const Footer = () => {
  return (
    <div className="rounded-b-3xl bg-white/70 px-4 py-6 md:mx-10 md:px-0">
      <div className="my-10 mt-20 flex flex-col gap-14 text-sm sm:grid sm:grid-cols-[3fr_1fr_1fr]">
        {/* ------ Left Section -------*/}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full leading-7 text-gray-600 md:w-2/3">
            MediConnect helps patients discover trusted care, book appointments
            quickly, and stay organized with a seamless digital experience.
          </p>
        </div>

        {/* ------ Centor Section -------*/}
        <div>
          <p className="mb-5 text-xl font-semibold">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* ------ Right Section -------*/}
        <div>
          <p className="mb-5 text-xl font-semibold">Get in touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+1-212-456-7890</li>
            <li>mediconnect@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* ------- Copyright Text --------*/}
      <div>
        <hr className="border-gray-200" />
        <p className="py-5 text-center text-sm text-gray-500">
          Copyright 2024 © MediConnect.in - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
