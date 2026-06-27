import { useState } from "react";
import { assetsFrontend } from "../assets/assets_frontend/assets";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "Shubham Bhosale",
    image: assetsFrontend.profile_pic,
    email: "shubhambhosale2299@gmail.com",
    phone: "+1 123 456 7890",
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Church Road, London",
    },
    gender: "Male",
    dob: "2004-10-09",
  });

  const [isReadOnly, setIsReadOnly] = useState(true);

  return (
    <div className="max-w-4xl mx-auto py-10 px-2 sm:px-0">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <img
              src={userData.image}
              alt={userData.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary/10"
            />
            <div>
              {isReadOnly ? (
                <p className="text-2xl font-semibold text-gray-800">
                  {userData.name}
                </p>
              ) : (
                <input
                  className="w-full rounded-xl border border-zinc-300 p-2 text-lg font-semibold outline-none focus:border-primary"
                  onChange={(e) =>
                    setUserData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  type="text"
                  value={userData.name}
                />
              )}
              <p className="mt-1 text-sm text-gray-500">Patient profile</p>
            </div>
          </div>

          <button
            onClick={() => setIsReadOnly(!isReadOnly)}
            className="border border-primary px-8 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition-all cursor-pointer"
          >
            {isReadOnly ? "Edit Profile" : "Save information"}
          </button>
        </div>

        <hr className="my-6 border-gray-200" />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
              Contact Information
            </p>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <p className="font-medium text-gray-500">Email Id</p>
                <p className="mt-1">{userData.email}</p>
              </div>
              <div>
                <p className="font-medium text-gray-500">Phone</p>
                {isReadOnly ? (
                  <p className="mt-1">{userData.phone}</p>
                ) : (
                  <input
                    className="mt-1 w-full rounded-xl border border-zinc-300 p-2 outline-none focus:border-primary"
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    value={userData.phone}
                    type="text"
                  />
                )}
              </div>
              <div>
                <p className="font-medium text-gray-500">Address</p>
                {isReadOnly ? (
                  <p className="mt-1 leading-6">
                    {userData.address.line1} <br /> {userData.address.line2}
                  </p>
                ) : (
                  <div className="mt-1 space-y-2">
                    <input
                      className="w-full rounded-xl border border-zinc-300 p-2 outline-none focus:border-primary"
                      value={userData.address.line1}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                    />
                    <input
                      className="w-full rounded-xl border border-zinc-300 p-2 outline-none focus:border-primary"
                      value={userData.address.line2}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gray-500">
              Basic Information
            </p>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <p className="font-medium text-gray-500">Gender</p>
                {isReadOnly ? (
                  <p className="mt-1">{userData.gender}</p>
                ) : (
                  <select
                    className="mt-1 w-full rounded-xl border border-zinc-300 p-2 outline-none focus:border-primary"
                    value={userData.gender}
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option value="Not Selected">Not Selected</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                )}
              </div>

              <div>
                <p className="font-medium text-gray-500">Birthday</p>
                {isReadOnly ? (
                  <p className="mt-1">{userData.dob}</p>
                ) : (
                  <input
                    className="mt-1 w-full rounded-xl border border-zinc-300 p-2 outline-none focus:border-primary"
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, dob: e.target.value }))
                    }
                    type="date"
                    value={userData.dob}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
