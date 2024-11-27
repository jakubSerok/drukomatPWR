import React, { useContext, useState } from "react";
import { Context } from "../Context/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = ({ setShowLogin }) => {
  const { setToken, url } = useContext(Context);
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    let new_url = url;
    if (currState === "Login") {
      new_url += "/api/user/login";
    } else {
      new_url += "/api/user/register";
    }

    try {
      const response = await axios.post(new_url, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
        navigate("/userpanel"); // Navigate to UserPanel on success
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={onLogin}
        className="bg-white rounded-lg p-8 w-full max-w-md shadow-md"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{currState}</h2>
        </div>
        <div className="space-y-4">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
          {currState === "Sign Up" && (
            <input
              name="phone"
              onChange={onChangeHandler}
              value={data.phone}
              type="text" // Corrected the type to "text"
              placeholder="Your phone number"
              className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
            />
          )}
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-md focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mt-6 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          {currState === "Login" ? "Login" : "Create account"}
        </button>
        <div className="flex items-center mt-4">
          <input type="checkbox" id="terms" className="mr-2" required />
          <label htmlFor="terms" className="text-sm text-gray-600">
            By continuing, I agree to the terms of use & privacy policy.
          </label>
        </div>
        <div className="mt-4 text-sm text-gray-600 text-center">
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span
                onClick={() => setCurrState("Sign Up")}
                className="text-blue-600 cursor-pointer hover: underline"
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span
                onClick={() => setCurrState("Login")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
