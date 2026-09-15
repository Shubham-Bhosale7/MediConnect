import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { email, setEmail, name, setName, backendUrl, token, setToken } =
    useContext(AppContext);
  const [role, setRole] = useState("User");
  const [state, setState] = useState("Sign Up");

  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const adminUrl =
    import.meta.env.VITE_ADMIN_URL ||
    (import.meta.env.DEV
      ? "http://localhost:5174"
      : `${window.location.origin}/admin`);

  const selectRole = (selectedRole) => {
    if (selectedRole !== "User") {
      window.location.href = `${adminUrl}/`;
      return;
    }

    setRole(selectedRole);
  };

  // const createAccount = () => {
  //   if (name && email && password) {
  //     setEmail(email);
  //     setName(name);
  //     setPassword(password);
  //   }
  // };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          password,
          email,
        });
        if (data.success) {
          localStorage.removeItem("aToken");
          localStorage.removeItem("dToken");
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          password,
          email,
        });
        if (data.success) {
          localStorage.removeItem("aToken");
          localStorage.removeItem("dToken");
          localStorage.setItem("token", data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 px-4 py-8 flex items-center justify-center sm:px-6 lg:px-8"
    >
      <div className="m-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-700 shadow-[0_12px_35px_rgba(95,111,255,0.15)]">
        <p className="mb-6 text-center text-3xl font-semibold text-slate-800">
          <span className="text-primary">
            {state === "Sign Up" ? "Create Account" : role}
          </span>
          {state === "Sign Up" ? "" : " Login"}
        </p>
        <div className="mb-6 grid w-full grid-cols-3 gap-2">
          {["Admin", "Doctor", "User"].map((selectedRole) => (
            <button
              key={selectedRole}
              type="button"
              onClick={() => selectRole(selectedRole)}
              className={`rounded-lg border px-2 py-2 text-sm ${role === selectedRole ? "border-primary bg-primary text-white" : "border-slate-300 text-slate-600"}`}
            >
              {selectedRole}
            </button>
          ))}
        </div>

        {role !== "User" ? (
          <button
            type="button"
            onClick={() => {
              window.location.href = `${adminUrl}/`;
            }}
            className="w-full rounded-md bg-primary py-2 text-base text-white"
          >
            Continue to {role} Login
          </button>
        ) : (
          <>
            <p className="mb-4 text-slate-600">
              Please {state === "Sign Up" ? "sign up" : "login"} to book an
              appointment
            </p>

            {state === "Sign Up" ? (
              <div className="mb-4 w-full">
                <p className="mb-2 font-medium text-slate-700">Full Name</p>
                <input
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  value={name}
                />
              </div>
            ) : (
              <></>
            )}

            <div className="mb-4 w-full">
              <p className="mb-2 font-medium text-slate-700">Email</p>
              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                value={email}
              />
            </div>

            <div className="mb-6 w-full">
              <p className="mb-2 font-medium text-slate-700">Password</p>
              <input
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                value={password}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-3 font-semibold text-white transition"
            >
              {state === "Sign Up" ? "Create Account" : "Login"}
            </button>

            {state === "Sign Up" ? (
              <p>
                Already have an account?{" "}
                <span
                  className="cursor-pointer text-primary underline"
                  onClick={() => setState("Login")}
                >
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Create a new account?{" "}
                <span
                  className="cursor-pointer text-primary underline"
                  onClick={() => setState("Sign Up")}
                >
                  Register here
                </span>
              </p>
            )}
          </>
        )}
      </div>
    </form>
  );
};

export default Login;
