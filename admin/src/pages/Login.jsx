import { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";
import { useLocation } from "react-router-dom";

const Login = () => {
  const location = useLocation();
  const [state, setState] = useState(location.state?.role || "Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const frontendUrl =
    import.meta.env.VITE_FRONTEND_URL || window.location.origin;

  const clearOtherTokens = () => {
    setAToken("");
    setDToken("");
    localStorage.removeItem("aToken");
    localStorage.removeItem("dToken");
    localStorage.removeItem("token");
  };

  const selectRole = (role) => {
    if (role === "User") {
      window.location.href = `${frontendUrl}/login`;
      return;
    }

    setState(role);
  };

  const onSuubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });

        if (data.success) {
          clearOtherTokens();
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/doctor/login", {
          email,
          password,
        });

        if (data.success) {
          clearOtherTokens();
          localStorage.setItem("dToken", data.token);
          setDToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {}
  };

  return (
    <form
      onSubmit={onSuubmitHandler}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8 flex items-center justify-center sm:px-6 lg:px-8"
    >
      <div className="m-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_12px_35px_rgba(95,111,255,0.15)]">
        <p className="mb-6 text-center text-3xl font-semibold text-slate-800">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="mb-6 grid grid-cols-3 gap-2">
          {["Admin", "Doctor", "User"].map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => selectRole(role)}
              className={`rounded-lg border px-2 py-2 text-sm ${state === role ? "border-primary bg-primary text-white" : "border-slate-300 text-slate-600"}`}
            >
              {role}
            </button>
          ))}
        </div>
        <div className="mb-4">
          <p className="mb-2 text-sm font-medium text-slate-700">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="mb-6">
          <p className="mb-2 text-sm font-medium text-slate-700">Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
