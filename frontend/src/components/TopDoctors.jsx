import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
// import { doctors } from "../assets/assets_frontend/assets";
const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="my-16 flex flex-col items-center gap-4 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-semibold">Top doctors to book</h1>
      <p className="text-center text-sm text-gray-600 sm:w-1/2">
        Meet highly rated professionals and book your next consultation with
        confidence.
      </p>
      <div className="grid w-full grid-cols-auto gap-4 gap-y-6 pt-5 sm:px-0">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            className="cursor-pointer overflow-hidden rounded-[20px] border border-cyan-100 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
            key={index}
          >
            <img className="bg-cyan-50" src={item.image} alt={item.name} />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm ${item.available ? "text-green-600" : "text-gray-500"}`}
              >
                <p
                  className={`h-2 w-2 ${item.available ? "bg-green-500" : "bg-gray-500"} rounded-full `}
                ></p>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                {item.name}
              </p>
              <p className="text-sm text-gray-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          navigate(`/doctors`);
          scrollTo(0, 0);
        }}
        className="mt-10 cursor-pointer rounded-full bg-cyan-50 px-12 py-3 text-gray-700 transition-all duration-300 hover:bg-cyan-100"
      >
        Explore more
      </button>
    </div>
  );
};

export default TopDoctors;
