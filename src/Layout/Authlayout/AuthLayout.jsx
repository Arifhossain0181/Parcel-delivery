import React, { useState } from "react";
import loginImage from "../../assets/authImage.png"; // fixed relative path to src/assets

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    // TODO integrate with backend or firebase
  };

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // TODO Google OAuth logic
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="grid lg:grid-cols-2 grid-cols-1 shadow-xl bg-base-100 rounded-xl overflow-hidden max-w-5xl w-full">
        {/* Left side form */}
        <div className="flex flex-col justify-center p-8 sm:p-12">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-sm mb-6">Login with Profast</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="text-sm text-right">
              <a href="/forgot-password" className="text-primary hover:underline">
                Forget Password?
              </a>
            </div>

            <button type="submit" className="btn bg-lime-400 hover:bg-lime-500 w-full">
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Don’t have any account?{" "}
            <a href="/register" className="text-primary hover:underline">
              Register
            </a>
          </p>

          <div className="divider">Or</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full flex items-center gap-2"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Login with Google
          </button>
        </div>

        {/* Right side image */}
        <div className=" lg:flex items-center justify-center bg-base-200">
          <img src={loginImage} alt="Login illustration" className="max-w-md w-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;
