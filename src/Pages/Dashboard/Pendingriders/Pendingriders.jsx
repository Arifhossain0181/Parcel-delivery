import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
 

const Pendingriders = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);

  // Fetch pending riders using React Query

const { data: pendingRiders = [], isLoading, isError } = useQuery({
  queryKey: ["pendingRiders"],
  queryFn: async () => {
    const res = await axiosSecure.get("/rideres/pending");
    return res.data;
  },
});


  // Approve rider
  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/rideres/approve/${id}`, { status: "Active" });
      if (res.data.modifiedCount > 0) {
        Swal.fire({ icon: "success", title: "Approved!", timer: 1500, showConfirmButton: false });
        queryClient.invalidateQueries(["pendingRiders"]); // refetch
        setSelectedRider(null);
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to approve rider." });
    }
  };

  // Reject rider
  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.delete(`/rideres/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire({ icon: "info", title: "Rejected!", timer: 1500, showConfirmButton: false });
        queryClient.invalidateQueries(["pendingRiders"]); // refetch
        setSelectedRider(null);
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to reject rider." });
    }
  };

  if (isLoading) return <p>Loading pending riders...</p>;
  if (isError) return <p>Error loading riders!</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#cbea66]">Pending Riders</h1>

      <div className="overflow-x-auto text-black bg-white shadow-lg rounded-lg ">
        <table className="table w-full">
          <thead className="bg-amber-200 text-gray-800">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingRiders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No pending riders found.
                </td>
              </tr>
            ) : (
              pendingRiders.map((rider, index) => (
                <tr key={rider._id} className="hover:bg-[#cbea66]">
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.address}</td>
                  <td>{rider.contact}</td>
                  <td>
                    <button
                      className="btn btn-md border-0 bg-[#9eca10] text-white hover:bg-[#cbea66]"
                      onClick={() => setSelectedRider(rider)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRider && (
        <div className="fixed inset-0 bg-amber-50 bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-amber-600 text-center">
              Rider Details
            </h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Name:</strong> {selectedRider.name}</p>
              <p><strong>Email:</strong> {selectedRider.email}</p>
              <p><strong>Age:</strong> {selectedRider.age}</p>
              <p><strong>Religion:</strong> {selectedRider.religion}</p>
              <p><strong>District:</strong> {selectedRider.address}</p>
              <p><strong>Contact:</strong> {selectedRider.contact}</p>
              <p><strong>License:</strong> {selectedRider.license}</p>
              <p><strong>NID:</strong> {selectedRider.nid}</p>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => handleApprove(selectedRider._id)}
                className="btn bg-[#92bd07] text-white"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(selectedRider._id)}
                className="btn bg-[#92bd07] hover:bg-red-600 text-white"
              >
                Reject
              </button>
              <button
                onClick={() => setSelectedRider(null)}
                className="btn bg-gray-300 hover:bg-gray-400 text-black"
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

export default Pendingriders;
