import React, { useState } from "react";
import registerImage from "../../../assets/authImage.png";
import UseAuthhooks from "../../../Hooks/UseAuthhooks";
import useAxios from "../../../Hooks/useAxios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { createUser, uPdatuserProfile, signOutUser } = UseAuthhooks();
  const [imagess, setimage] = useState("");
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // 1️ Create user in Firebase Auth
      const result = await createUser(formData.email, formData.password);
      const createdUser = result.user;
      console.log("User created:", createdUser);

      // 2️ Save user info to your MongoDB backend
      const userInfo = {
        email: formData.email,
        name: formData.name,
        role: "user", // default role
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userInfo);
      console.log("User info saved to DB");

      // 3️ Update Firebase user profile (name + photo)
      await uPdatuserProfile({
        displayName: formData.name,
        photoURL: imagess,
      });
      console.log("Profile updated in Firebase");

      // 4️ Immediately log out (so user isn’t auto logged in)
      await signOutUser();
      alert("Registration successful! Please log in to continue.");

      // 5️ Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert(error.message || "Registration failed");
    }
  };

  const handleChangePic = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    try {
      const formData = new FormData();
      formData.append("image", image);

      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=21c73b3e489b57ce38cdf8964d161e82`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setimage(res.data.data.url); // fixed line
      console.log("Image uploaded:", res.data.data.url);
    } catch (error) {
      console.error("Image upload error:", error.response || error.message);
      alert("Image upload failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="grid lg:grid-cols-2 grid-cols-1 shadow-xl bg-base-100 rounded-2xl overflow-hidden max-w-6xl w-full">
        {/* Left (form) */}
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
          <p className="text-sm mb-6">Register with Profast</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className="label">
                <span className="label-text">Profile Picture</span>
              </label>
              <input
                type="file"
                onChange={handleChangePic}
                className="file-input file-input-bordered w-full"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="btn bg-lime-400 hover:bg-lime-500 w-full"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Log in
            </a>
          </p>

          <div className="divider">Or</div>

          {/* Google Login */}
          <button className="btn btn-outline w-full flex items-center gap-2">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Sign up with Google
          </button>
        </div>

        {/* Right (Image) */}
        <div className="hidden lg:flex items-center justify-center bg-base-200">
          <img
            src={registerImage}
            alt="Register Illustration"
            className="max-w-md w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
