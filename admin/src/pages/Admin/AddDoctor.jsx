import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!docImg) {
        return toast.error("Image Not Selected");
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 }),
      );

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        { headers: { aToken } },
      );

      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setAddress1("");
        setAddress2("");
        setDegree("");
        setAbout("");
        setFees("");
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error)
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full max-w-6xl" action="">
      <p className="mb-4 text-lg font-semibold text-slate-800">Add Doctor</p>

      <div className="w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-[0_10px_30px_rgba(15,23,42,0.06)] sm:px-8 sm:py-8">
        <div className="mb-6 flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-cyan-500 bg-cyan-50/70 p-5 text-center">
          <label htmlFor="doc-img" className="cursor-pointer">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="Upload doctor"
              className="h-28 w-28 rounded-full border-2 border-cyan-100 bg-white object-cover p-1 shadow-sm"
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />
          <p className="text-sm font-medium text-slate-600">
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">
                Doctor name
              </p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                required
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">
                Doctor Email
              </p>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">
                Doctor Password
              </p>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">
                Experience
              </p>
              <select
                onChange={(e) => setExperience(e.target.value)}
                value={experience}
                name=""
                id=""
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">Fees</p>
              <input
                onChange={(e) => setFees(e.target.value)}
                value={fees}
                type="text"
                placeholder="Fees"
                required
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">
                Speciality
              </p>
              <select
                onChange={(e) => setSpeciality(e.target.value)}
                value={speciality}
                name=""
                id=""
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">
                Education
              </p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                type="text"
                placeholder="Education"
                required
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700">
                Address
              </p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                type="text"
                placeholder="address 1"
                required
                className="mb-2 w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                type="text"
                placeholder="address 2"
                required
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2 text-sm font-semibold text-slate-700">
            About Doctor
          </p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            placeholder="write about doctor"
            rows={5}
            required
            className="min-h-[120px] w-full resize-y rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>

        <button
          type="submit"
          className="mt-5 rounded-xl bg-cyan-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-cyan-700"
        >
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
