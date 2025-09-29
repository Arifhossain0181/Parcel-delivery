import React, { useState } from "react";
import registerImage from "../../../assets/authImage.png"; // replaced missing register.png with authImage.png

const Register = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Registration Data:", formData);
    // 👉 later integrate with backend / Firebase
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

            {/* Submit */}
            <button type="submit" className="btn bg-lime-400 hover:bg-lime-500 w-full">
              Register
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
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
          <img src={registerImage} alt="Register Illustration" className="max-w-md w-full" />
        </div>
      </div>
    </div>
  );
};

export default Register;
