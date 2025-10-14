import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = UseAxiosSecure();

  // Fetch only paid parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["paid-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/Parcel?paymentStatus=paid");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10 text-gray-600">Loading parcels...</p>;
  }

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Paid Parcels ({parcels.length})
      </h2>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table-auto w-full border border-gray-200 text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr className="text-left text-gray-700">
              <th className="px-2 py-2">#</th>
              <th className="px-2 py-2">Title</th>
              <th className="px-2 py-2">Receiver</th>
              <th className="px-2 py-2">Tracking ID</th>
              <th className="px-2 py-2">Delivery Status</th>
              <th className="px-2 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {parcels.length > 0 ? (
              parcels.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className="border-b hover:bg-gray-50 text-gray-800"
                >
                  <td className="px-2 py-2">{index + 1}</td>
                  <td className="px-2 py-2">{parcel.title}</td>
                  <td className="px-2 py-2">{parcel.receiver_name}</td>
                  <td className="px-2 py-2">{parcel.trackingId}</td>
                  <td className="px-2 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                        parcel.deliveryStatus === "Collected"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {parcel.deliveryStatus === "Collected"
                        ? "Collected"
                        : "Not Collected"}
                    </span>
                  </td>
                  <td className="px-2 py-2 text-center">
                    <button
                      onClick={() => {
                        // this will be your assign function later
                        Swal.fire(
                          "Assign Rider",
                          `You clicked Assign for ${parcel.title}`,
                          "info"
                        );
                      }}
                      className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1"
                    >
                      Assign Rider
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No paid parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignRiders;
