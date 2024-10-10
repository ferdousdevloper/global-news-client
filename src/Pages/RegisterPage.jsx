import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import "./SignInPage.css";
import axios from "axios";

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { createUser, loading } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const upperCasePattern = /[A-Z]/;
    const lowerCasePattern = /[a-z]/;
    const numberPattern = /[0-9]/;

    return (
      upperCasePattern.test(password) &&
      lowerCasePattern.test(password) &&
      numberPattern.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error

    if (!validatePassword(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number."
      );
      return;
    }

    if (!createUser) {
      return;
    }

    try {
      await createUser(email, password);
      const userInfo = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role: "user",
      };
      axios.post("https://global-news-server-phi.vercel.app/register", userInfo);
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You have successfully created your account.",
        confirmButtonColor: "#02AA08",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      setError("Failed to create an account. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Registration Failed!",
        text: "Please check your details and try again.",
        confirmButtonColor: "#02AA08",
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden font-montserrat">
      {/* Register Container */}
      <div className="relative flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden z-10 border border-[#02AA08]">
        {/* Left Side - Sign In */}
        <div className="w-1/2 bg-[#02AA08] p-8 flex flex-col justify-center items-center">
          <h2 className="text-white text-4xl font-bold">Welcome!</h2>
          <p className="text-white mt-4 text-lg">
            Already have an account? Please sign in!
          </p>
          <button className="mt-6 px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-[#02AA08] transition">
            <Link to="/login">Sign In</Link>
          </button>
        </div>

        {/* Right Side - Register */}
        <div className="w-1/2 bg-gray-800 p-8 flex flex-col justify-center">
          <h2 className="text-[#02AA08] text-3xl font-bold mb-4">
            Create your account
          </h2>
          <p className="text-gray-400 mb-8">
            or use your email for registration
          </p>

          {/* Error Message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-gray-400" htmlFor="name">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                name="name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02AA08]"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-400" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02AA08]"
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label className="block text-gray-400" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="*****"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02AA08]"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-2 bg-[#02AA08] text-white rounded-md hover:bg-green-400 transition"
              disabled={loading}
            >
              {loading ? "REGISTERING..." : "REGISTER"}
            </button>
          </form>
        </div>
      </div>

      {/* Background Shapes */}
      <div className="absolute inset-0 z-0">
        <div className="bg-rectangle"></div>
        <div className="bg-ellipse"></div>
        <div className="bg-polygon"></div>
        <div className="bg-circle-small"></div>
        <div className="bg-circle-large"></div>
        <div className="bg-triangle"></div>
        <div className="bg-diamond"></div>
        <div className="bg-parallelogram"></div>
        <div className="bg-oval"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
