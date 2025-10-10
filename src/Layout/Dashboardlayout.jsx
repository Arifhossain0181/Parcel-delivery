import React from "react";
import { Outlet } from "react-router-dom";
import Parcelicon from "../Pages/Shared/Parcelicon/Parcelicon";
import { NavLink } from "react-router-dom";
import { FiHome, FiPackage, FiDollarSign, FiMapPin, FiUser, FiCheckCircle, FiClock } from "react-icons/fi";

const Dashboardlayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar for small screens */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
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
        </div>

        {/* Page content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
  <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
  <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
    {/* Custom Parcel icon component */}
    <Parcelicon />

    <li>
      <NavLink to="/" className="flex items-center gap-2">
        <FiHome /> Home
      </NavLink>
    </li>

    <li>
      <NavLink to="/dashboard/MyParcel" className="flex items-center gap-2">
        <FiPackage /> My Parcel
      </NavLink>
    </li>

    <li>
      <NavLink to="/dashboard/Paymenthistory" className="flex items-center gap-2">
        <FiDollarSign /> Payment History
      </NavLink>
    </li>

    <li>
      <NavLink to="/dashboard/Track" className="flex items-center gap-2">
        <FiMapPin /> Track a Package
      </NavLink>
    </li>

    <li>
      <NavLink to="/dashboard/Profile" className="flex items-center gap-2">
        <FiUser /> Update Profile
      </NavLink>
    </li>

    {/* 🆕 Added new links */}
    <li>
      <NavLink to="/dashboard/ActiveRiders" className="flex items-center gap-2">
        <FiCheckCircle /> Active Riders
      </NavLink>
    </li>

    <li>
      <NavLink to="/dashboard/PendingRiders" className="flex items-center gap-2">
        <FiClock /> Pending Riders
      </NavLink>
    </li>
    {/*admin router */}
     <li> <NavLink to= '/dashboard/makeadmin'>Make Admin</NavLink></li>
  </ul>
</div>

    </div>
  );
};

export default Dashboardlayout;
