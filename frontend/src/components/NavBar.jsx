import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_admin/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { assetsFrontend } from "../assets/assets_frontend/assets";
import { AppContext } from "../context/AppContext";

const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const closeMenu = () => setShowMenu(false);

  const handleLogout = () => {
    navigate(`/`);
    setToken(false);
    localStorage.removeItem("token");
    localStorage.removeItem("aToken");
    localStorage.removeItem("dToken");
    closeMenu();
  };

  return (
    <div className="flex items-center justify-between text-sm py-2 mb-2 border-b border-b-gray-400 px-4 md:px-0">
      <div className="flex items-center gap-2">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          className="w-32 sm:w-40 md:w-50 h-auto cursor-pointer"
          alt="logo"
        />
        {token && (
          <span className="rounded-full border border-gray-500 px-2.5 py-0.5 text-xs text-gray-600">
            User
          </span>
        )}
      </div>

      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={"/"} className="flex flex-col items-center">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"} className="flex flex-col items-center">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"} className="flex flex-col items-center">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"} className="flex flex-col items-center">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="hidden md:flex items-center gap-2 cursor-pointer group relative">
            <img
              className="w-10 rounded-full"
              src={userData.image}
              alt="profile"
            />
            <img
              className="w-3"
              src={assetsFrontend.dropdown_icon}
              alt="dropdown"
            />
            <div className="absolute top-1 right-0 pt-16 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={handleLogout}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer"
          >
            Create account
          </button>
        )}

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assetsFrontend.menu_icon}
          alt="menu"
        />

        <div
          className={`fixed inset-0 z-50 md:hidden bg-white transition-all duration-300 ${
            showMenu ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
            <img className="w-32" src={assets.logo} alt="logo" />
            <img
              className="w-7 cursor-pointer"
              onClick={closeMenu}
              src={assetsFrontend.cross_icon}
              alt="close menu"
            />
          </div>

          <ul className="flex flex-col items-center gap-3 mt-8 px-5 text-lg font-medium">
            <NavLink
              to="/"
              onClick={closeMenu}
              className="w-full text-center py-2"
            >
              Home
            </NavLink>
            <NavLink
              to="/doctors"
              onClick={closeMenu}
              className="w-full text-center py-2"
            >
              All Doctors
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className="w-full text-center py-2"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className="w-full text-center py-2"
            >
              Contact
            </NavLink>
          </ul>

          <div className="px-5 mt-8">
            {token ? (
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    navigate("/my-profile");
                    closeMenu();
                  }}
                  className="w-full rounded-full border border-gray-300 py-2 text-center"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    navigate("/my-appointments");
                    closeMenu();
                  }}
                  className="w-full rounded-full border border-gray-300 py-2 text-center"
                >
                  My Appointments
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-full bg-primary py-2 text-white"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  closeMenu();
                }}
                className="w-full rounded-full bg-primary py-3 text-white"
              >
                Create account
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
