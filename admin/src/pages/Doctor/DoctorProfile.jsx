import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";
import { DoctorContext } from "../../context/DoctorContext";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [fees, setFees] = useState("");
  const [address, setAddress] = useState({ line1: "", line2: "" });
  const [available, setAvailable] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address,
        fees,
        available,
      };

      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        { updateData },
        { headers: { dToken } },
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setFees(profileData.fees ?? "");
      setAddress({
        line1: profileData.address?.line1 ?? "",
        line2: profileData.address?.line2 ?? "",
      });
      setAvailable(Boolean(profileData.available));
    }
  }, [profileData]);

  return (
    profileData && (
      <div className="min-h-screen flex-1 min-w-0 bg-gray-50 p-3 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-6 sm:gap-6">
            <div className="flex min-w-0 items-center gap-4 sm:gap-5">
              <img
                className="h-20 w-20 shrink-0 rounded-full border-4 border-primary/10 bg-gray-100 object-cover sm:h-24 sm:w-24"
                src={profileData.image}
                alt={profileData.name}
              />
              <div className="min-w-0">
                <h1 className="truncate text-xl font-semibold text-gray-800 sm:text-2xl">
                  {profileData.name}
                </h1>
                <p className="mt-1 text-sm text-gray-500">Doctor profile</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => (isEdit ? updateProfile() : setIsEdit(true))}
              className="shrink-0 rounded-full border border-primary px-5 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white sm:px-8"
            >
              {isEdit ? "Save Profile" : "Edit Profile"}
            </button>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 sm:gap-6">
            <div className="rounded-2xl bg-gray-50 p-5 sm:p-6">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Professional Information
              </p>
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <p className="font-medium text-gray-500">Degree</p>
                  <p className="mt-1">{profileData.degree}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Speciality</p>
                  <p className="mt-1">{profileData.speciality}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Experience</p>
                  <p className="mt-1">{profileData.experience}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Appointment Fee</p>
                  {isEdit ? (
                    <input
                      className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:border-primary"
                      type="number"
                      min="0"
                      value={fees}
                      onChange={(event) => setFees(event.target.value)}
                    />
                  ) : (
                    <p className="mt-1">
                      {currency}
                      {profileData.fees}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 sm:p-6">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                Contact Information
              </p>
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <p className="font-medium text-gray-500">Email</p>
                  <p className="mt-1 wrap-break-word">{profileData.email}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Address</p>
                  {isEdit ? (
                    <div className="mt-1 space-y-2">
                      <input
                        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:border-primary"
                        value={address.line1}
                        onChange={(event) =>
                          setAddress((currentAddress) => ({
                            ...currentAddress,
                            line1: event.target.value,
                          }))
                        }
                        placeholder="Address line 1"
                      />
                      <input
                        className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 outline-none focus:border-primary"
                        value={address.line2}
                        onChange={(event) =>
                          setAddress((currentAddress) => ({
                            ...currentAddress,
                            line2: event.target.value,
                          }))
                        }
                        placeholder="Address line 2"
                      />
                    </div>
                  ) : (
                    <p className="mt-1 leading-6">
                      {profileData.address?.line1}
                      <br />
                      {profileData.address?.line2}
                    </p>
                  )}
                </div>
                <label className="flex cursor-pointer items-center gap-3 pt-1 font-medium">
                  <input
                    className="h-4 w-4 accent-primary"
                    type="checkbox"
                    checked={isEdit ? available : profileData.available}
                    disabled={!isEdit}
                    onChange={(event) => setAvailable(event.target.checked)}
                  />
                  <span
                    className={
                      (isEdit ? available : profileData.available)
                        ? "text-emerald-600"
                        : "text-gray-500"
                    }
                  >
                    {(isEdit ? available : profileData.available)
                      ? "Available for appointments"
                      : "Not available for appointments"}
                  </span>
                </label>
              </div>
            </div>

            <div className="rounded-2xl bg-gray-50 p-5 sm:col-span-2 sm:p-6">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
                About
              </p>
              <p className="whitespace-pre-line text-sm leading-6 text-gray-600">
                {profileData.about}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
