import React from "react";
import { specialityData } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="speciality"
    >
      <h1 className="text-3xl font-semibold">Find by specialty</h1>
      <p className="text-center text-sm text-gray-600 sm:w-1/2">
        Explore leading specialists and choose the care that fits your needs.
      </p>
      <div className="flex w-full gap-4 overflow-x-auto pt-5 sm:justify-center">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            className="flex shrink-0 cursor-pointer flex-col items-center rounded-2xl border border-gray-200 bg-white px-4 py-4 text-xs shadow-sm transition-all duration-500 hover:-translate-y-2.5 hover:shadow-md"
            key={index}
            to={`/doctors/${item.speciality}`}
          >
            <img className="mb-2 w-16 sm:w-24" src={item.image} alt="" />
            <p className="font-medium text-gray-700">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
