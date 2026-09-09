import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_admin/assets";
import { assetsFrontend } from "../assets/assets_frontend/assets";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } =
    useContext(AppContext);
  const [isEdit, setisEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);
      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } },
      );
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setisEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="max-w-4xl mx-auto py-10 px-2 sm:px-0">
        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              {isEdit ? (
                <label
                  htmlFor="image"
                  className="group relative block h-24 w-24 cursor-pointer overflow-hidden rounded-full border-4 border-primary/10 bg-gray-100 transition hover:border-primary/30"
                >
                  <div className="relative h-full w-full">
                    <img
                      src={image ? URL.createObjectURL(image) : userData.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-white/50" />
                    <img
                      src={image ? "" : assetsFrontend.upload_icon}
                      alt=""
                      className="absolute inset-0 m-auto h-8 w-8 rounded-full bg-white/90 p-1.5 opacity-90 shadow-sm transition group-hover:scale-105"
                    />
                    <span className="absolute inset-0 m-auto flex h-7 w-7 items-center justify-center rounded-full bg-primary/70 text-xl font-medium leading-none text-white shadow-md ring-2 ring-white transition group-hover:scale-105">
                      +
                    </span>
                  </div>
                  <input
                    onChange={(e) => setImage(e.target.files[0])}
                    type="file"
                    id="image"
                    hidden
                  />
                </label>
              ) : (
                <img
                  src={userData.image}
                  alt={userData.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary/10"
                />
              )}

              <div>
                {isEdit ? (
                  <input
                    className="w-full rounded-xl border border-zinc-300 p-2 text-lg font-semibold outline-none focus:border-primary"
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    type="text"
                    value={userData.name}
                  />
                ) : (
                  <p className="text-2xl font-semibold text-gray-800">
                    {userData.name}
                  </p>
                )}
                <p className="mt-1 text-sm text-gray-500">Patient profile</p>
              </div>
            </div>

            <button
              onClick={() => {
                if (isEdit) {
                  updateUserProfileData();
                } else {
                  setisEdit(true);
                }
              }}
              className="border border-primary px-8 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              {isEdit ? "Save information" : "Edit Profile"}
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
                  {isEdit ? (
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
                  ) : (
                    <p className="mt-1">{userData.phone}</p>
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-500">Address</p>
                  {isEdit ? (
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
                  ) : (
                    <p className="mt-1 leading-6">
                      {userData.address.line1} <br /> {userData.address.line2}
                    </p>
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
                  {isEdit ? (
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
                  ) : (
                    <p className="mt-1">{userData.gender}</p>
                  )}
                </div>

                <div>
                  <p className="font-medium text-gray-500">Birthday</p>
                  {isEdit ? (
                    <input
                      className="mt-1 w-full rounded-xl border border-zinc-300 p-2 outline-none focus:border-primary"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          dob: e.target.value,
                        }))
                      }
                      type="date"
                      value={userData.dob}
                    />
                  ) : (
                    <p className="mt-1">{userData.dob}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
