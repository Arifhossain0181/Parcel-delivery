import React from "react";
import { Outlet } from "react-router";
import Parcelicon from "../Pages/Shared/Parcelicon/Parcelicon";
// Import NavLink from react-router-dom
import { NavLink } from "react-router";

const Dashboardlayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
          <div className="hidden flex-none lg:hidden">
           
          </div>
        </div>
        {/* Page content here */}
        <h1 className="text-3xl font-bold"></h1>
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <Parcelicon></Parcelicon>
          <li>
            <a>Home</a>
          </li>
          <li>
           <NavLink to='/dashboard/MyParcel'>My Parcel</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboardlayout;
