import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import Parcelicon from "../Pages/Shared/Parcelicon/Parcelicon";
import {
  FiHome,
  FiDollarSign,
  FiMapPin,
  FiUser,
  FiCheckCircle,
  FiClock,
  FiPackage,
  FiTruck,
} from "react-icons/fi";
import useUserRole from "../Hooks/useUseRole";

const Dashboardlayout = () => {
  const { role, roleLoading, userLoading } = useUserRole();

  // Debugging logs
  console.log("User Role:", role);
  console.log("Role Loading:", roleLoading);
  console.log("User Loading:", userLoading);

  if (userLoading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
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
                />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>

        <Outlet />
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <Parcelicon />

          <li>
            <NavLink to="/" className="flex items-center gap-2">
              <FiHome /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/MyParcel"
              className="flex items-center gap-2"
            >
              <FiPackage /> My Parcel
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/Paymenthistory"
              className="flex items-center gap-2"
            >
              <FiDollarSign /> Payment History
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/Track" className="flex items-center gap-2">
              <FiMapPin /> Track a Package
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/Profile"
              className="flex items-center gap-2"
            >
              <FiUser /> Update Profile
            </NavLink>
          </li>
          {/* Rider Links */}
          {role === "rider" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/PendingDeliveries"
                  className="flex items-center gap-2"
                >
                  <FiTruck /> Pending Deliveries
                </NavLink>
              </li>
            </>
          )}
          {/* Admin Links */}
          {role === "admin" && (
            <>
              <li>
                <NavLink
                  to="/dashboard/ActiveRiders"
                  className="flex items-center gap-2"
                >
                  <FiCheckCircle /> Active Riders
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/PendingRiders"
                  className="flex items-center gap-2"
                >
                  <FiClock /> Pending Riders
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/makeadmin"
                  className="flex items-center gap-2"
                >
                  <FiUser /> Make Admin
                </NavLink>
              </li>

              {/* New Assign Parcel Link */}
              <li>
                <NavLink
                  to="/dashboard/assign"
                  className="flex items-center gap-2"
                >
                  <FiPackage /> Assign Parcel
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboardlayout;
