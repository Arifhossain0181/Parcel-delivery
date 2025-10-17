import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const [selectedParcel, setSelectedParcel] = useState(null);
  const [riders, setRiders] = useState([]);
  const [loadingRiders, setLoadingRiders] = useState(false);

  // Fetch all paid parcels
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["paid-parcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/Parcel?paymentStatus=paid");
      return res.data;
    },
  });

  // Fetch riders by district
  const fetchRidersByDistrict = async (district) => {
    try {
      setLoadingRiders(true);
      const res = await axiosSecure.get(`/rideres/by-district?district=${district}`);
      setRiders(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to load riders", "error");
    } finally {
      setLoadingRiders(false);
    }
  };

  // Mutation to assign rider
  const assignRiderMutation = useMutation({
    mutationFn: async ({ parcelId, riderId, riderEmail }) => {
      return axiosSecure.patch("/assign-rider", { parcelId, riderId, riderEmail });
    },
    onSuccess: () => {
      Swal.fire("Success", "Rider assigned!", "success");
      setSelectedParcel(null);
      queryClient.invalidateQueries(["paid-parcels"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to assign rider!", "error");
    },
  });

  // Mutation to accept parcel (rider)
  const acceptParcelMutation = useMutation({
    mutationFn: async (parcelId) => {
      return axiosSecure.patch(`/parcels/accept/${parcelId}`);
    },
    onSuccess: () => {
      Swal.fire("Success", "Parcel accepted!", "success");
      queryClient.invalidateQueries(["paid-parcels"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to accept parcel!", "error");
    },
  });

  if (isLoading)
    return <p className="text-center mt-10 text-gray-600">Loading parcels...</p>;

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
              <th className="px-2 py-2">Sender Center</th>
              <th className="px-2 py-2">Receiver Center</th>
              <th className="px-2 py-2">Receiver</th>
              <th className="px-2 py-2">Tracking ID</th>
              <th className="px-2 py-2">Cost</th>
              <th className="px-2 py-2">Created At</th>
              <th className="px-2 py-2">Delivery Status</th>
              <th className="px-2 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.length > 0 ? (
              parcels.map((parcel, index) => {
                return (
                  <tr
                    key={parcel._id}
                    className="border-b text-gray-800 hover:bg-[#cbea66] hover:text-gray-900 cursor-pointer"
                  >
                    <td className="px-2 py-2">{index + 1}</td>
                    <td className="px-2 py-2">{parcel.title}</td>
                    <td className="px-2 py-2">{parcel.sender_center}</td>
                    <td className="px-2 py-2">{parcel.receiver_center}</td>
                    <td className="px-2 py-2">{parcel.receiver_name}</td>
                    <td className="px-2 py-2 text-xs sm:text-sm break-all">
                      {parcel.trackingId}
                    </td>
                    <td className="px-2 py-2">${parcel.cost}</td>
                    <td className="px-2 py-2">
                      {new Date(parcel.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-2 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                          parcel.deliveryStatus === "Collected"
                            ? "bg-green-100 text-green-700"
                            : parcel.deliveryStatus === "In Transit"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {parcel.deliveryStatus || "Not Collected"}
                      </span>
                    </td>
                    <td className="px-2 py-2 text-center">
                      {!parcel.assignedRiderStatus && (
                        <button
                          onClick={() => {
                            setSelectedParcel(parcel);
                            fetchRidersByDistrict(parcel.sender_center);
                          }}
                          className="btn btn-sm bg-blue-600 hover:bg-blue-700 text-white rounded-md px-3 py-1"
                        >
                          Assign Rider
                        </button>
                      )}

                      {parcel.assignedRiderStatus === "pending" && (
                        <button
                          onClick={() => acceptParcelMutation.mutate(parcel._id)}
                          className="btn btn-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-md px-3 py-1"
                        >
                          Accept
                        </button>
                      )}

                      {parcel.assignedRiderStatus === "accepted" && (
                        <button
                          className="btn btn-sm bg-green-600 text-white rounded-md px-3 py-1 cursor-not-allowed"
                          disabled
                        >
                          Accepted
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className="text-center py-6 text-gray-500">
                  No paid parcels found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Assign Rider */}
      {selectedParcel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 sm:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">
              Assign Rider for: {selectedParcel.title}
            </h3>

            {loadingRiders ? (
              <p className="text-center text-gray-500">Loading riders...</p>
            ) : riders.length > 0 ? (
              <ul className="space-y-2">
                {riders.map((rider) => (
                  <li
                    key={rider._id}
                    className="flex items-center justify-between border p-3 rounded-md hover:bg-[#cbea66]"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{rider.name}</p>
                      <p className="text-sm text-gray-500">
                        {rider.email} — {rider.district}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        assignRiderMutation.mutate({
                          parcelId: selectedParcel._id,
                          riderId: rider._id,
                          riderEmail: rider.email,
                        })
                      }
                      className="btn btn-xs bg-green-600 hover:bg-green-700 text-white rounded-md px-3 py-1"
                    >
                      Assign
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                No active riders in this district.
              </p>
            )}

            <div className="text-center mt-6">
              <button
                onClick={() => setSelectedParcel(null)}
                className="btn bg-red-500 hover:bg-red-600 text-white rounded-md px-4 py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRiders;
