import React from "react";
import { NavLink, Link } from "react-router";
import Parcelicon from "../Parcelicon/Parcelicon";
import UseAuthhooks from "../../../Hooks/UseAuthhooks";
import { useLocation } from "react-router";
const Navbar = () => {
  const { user, signOutUser } = UseAuthhooks();
  const location = useLocation();

  const linka = (
    <>
      <li><NavLink to="/services">Services</NavLink></li>
      <li><NavLink to="/Coverage">Coverage</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/Pricing">Pricing</NavLink></li>
      <li><NavLink to="/Rider">Rider</NavLink></li>
      <li><NavLink to="/sendPercel">sendPercel</NavLink></li>
      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/*  Left Side */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {linka}
          </ul>
        </div>

        <div className="btn btn-ghost text-xl">
          <Parcelicon />
        </div>
      </div>

      {/*  Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{linka}</ul>
      </div>

      {/*  Right Side (user info or login) */}
      <div className="navbar-end space-x-3">
        {user ? (
          <div className="dropdown dropdown-end">
            {/* Button showing user name + photo */}
            <div tabIndex={0} role="button" className="btn btn-ghost flex items-center gap-2">
              <img
                src={user.photoURL || "https://i.ibb.co/3yG3Q2F/default-avatar.png"}
                alt="User"
                className="w-8 h-8 rounded-full border"
              />
              <span className="font-semibold">
                {user.displayName || user.email.split("@")[0]}
              </span>
            </div>

            {/* Dropdown menu */}
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
            >
             
              <li><button onClick={signOutUser}>Logout</button></li>
            </ul>
          </div>
        ) : (
          <Link className="btn btn-outline font-bold" to="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
