import React from "react";
import { NavLink } from "react-router";
import Parcelicon from "../Parcelicon/Parcelicon";
import { Link } from "react-router";
import UseAuthhooks from "../../../Hooks/UseAuthHooks";
const Navbar = () => {
  const {user} = UseAuthhooks()
  const linka = (
    <>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        <NavLink to="/Coverage">Coverage</NavLink>
      </li>
    
      <li>
        <NavLink to="/about">Abouts</NavLink>
      </li>
      <li>
        <NavLink to="/Pricing">Pricing</NavLink>
      </li>
      <li>
        <NavLink to="/Rider">Be a Rider</NavLink>
      </li>
      {
        user &&   <><li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li> </>
      }
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
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
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
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
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{linka}</ul>
        </div>
        <div className="navbar-end">
          {
            user ? <><Link className="btn btn-outline font-bold" to="/login">
            Login
          </Link></>:
          <h2>{user}</h2>




          }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
