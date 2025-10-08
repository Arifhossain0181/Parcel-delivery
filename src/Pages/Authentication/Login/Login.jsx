import React, { useState } from "react";
import loginImage from "../../../assets/authImage.png";
import { Link, useNavigate, useLocation } from "react-router";
import UseAuthhooks from "../../../Hooks/UseAuthhooks";
import useAxios from '../../../Hooks/useAxios'
const Login = () => {
  const { signInWithGoogle, user } = UseAuthhooks();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance= useAxios()
  
  // If user came from a private page → redirect back there
  const from = location.state?.from?.pathname || "/";

  const handlegooglesign = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user
        console.log(result.user);
         const userInfo = {
        email: user.email,
        name:  user.displayName,
        role: "user", // default role
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };
     const res= axiosInstance.post(`/users`,userInfo);
     console.log('user gooogle djfjdfjdskfjsd' ,res.data)



        navigate(from, { replace: true }); //  redirects back after login
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    //  after successful login:
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="grid lg:grid-cols-2 grid-cols-1 shadow-xl bg-base-100 rounded-2xl overflow-hidden max-w-6xl w-full">
        {/* Left side (form) */}
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
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
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
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="text-right text-sm">
              <a href="/forgot-password" className="text-primary hover:underline">
                Forget Password?
              </a>
            </div>

            <button
              type="submit"
              className="btn bg-lime-400 hover:bg-lime-500 w-full"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/register"
              className="inline-block badge-outline text-white hover:bg-[#9be601] rounded md:w-1/2 mx-auto"
            >
              Create an account
            </Link>
            <p className="text-xs text-gray-500 mt-3">
              Side note: Need help with registration? Email us at
              <a
                href="mailto:support@example.com"
                className="text-primary ml-1"
              >
                support@example.com
              </a>
            </p>
          </div>

          <div className="divider">Or</div>

          <button
            onClick={handlegooglesign}
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

        <div className="hidden lg:flex items-center justify-center bg-base-200">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="max-w-md w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
