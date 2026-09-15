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
      className="min-h-[80vh] flex items-center"
      action=""
    >
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[85] sm:min-w-96 border border-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">{role} Login</p>
        <div className="grid w-full grid-cols-3 gap-2">
          {["Admin", "Doctor", "User"].map((selectedRole) => (
            <button
              key={selectedRole}
              type="button"
              onClick={() => selectRole(selectedRole)}
              className={`rounded border px-2 py-2 ${role === selectedRole ? "border-primary bg-primary text-white" : "border-zinc-300"}`}
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
            <p>
              Please {state === "Sign Up" ? "sign up" : "login"} to book
              appointment
            </p>

            {state === "Sign Up" ? (
              <div className="w-full">
                <p>Full Name</p>
                <input
                  className="border border-zinc-300 rounded w-full p-2 mt-1"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  value={name}
                />
              </div>
            ) : (
              <></>
            )}

            <div className="w-full">
              <p>Email</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                value={email}
              />
            </div>

            <div className="w-full">
              <p>Password</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                value={password}
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white w-full py-2 rounded-md text-base"
            >
              {state === "Sign Up" ? "Create Account" : "Login"}
            </button>

            {state === "Sign Up" ? (
              <p>
                Already have an account?{" "}
                <span
                  className="text-primary underline cursor-pointer"
                  onClick={() => setState("Login")}
                >
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Create a new account?{" "}
                <span
                  className="text-primary underline cursor-pointer"
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
