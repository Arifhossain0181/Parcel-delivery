import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const ActiveRiders = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState("");

  // Fetch active riders using React Query
  const { data: activeRiders = [], isLoading, isError } = useQuery({
    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/rideres/active");
      return res.data;
    },
  });

  // Deactivate rider
  const handleDeactivate = async (id) => {
    try {
      const res = await axiosSecure.patch(`/rideres/deactivate/${id}`, { status: "Inactive" });
      if (res.data.modifiedCount > 0) {
        Swal.fire({ icon: "success", title: "Deactivated!", timer: 1500, showConfirmButton: false });
        queryClient.invalidateQueries(["activeRiders"]); // Refetch data
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: "Failed to deactivate rider." });
    }
  };

  // Filter by search
  const filteredRiders = activeRiders.filter((r) =>
    Object.values(r).some((val) =>
      val?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  if (isLoading) return <p className="text-center py-6">Loading active riders...</p>;
  if (isError) return <p className="text-center py-6 text-red-500">Error loading riders!</p>;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#cbea66]">Active Riders</h1>

      {/* Search */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <input
          type="text"
          placeholder="Search by any field..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input w-full sm:w-60 border-1 bg-[#cbea66] text-black"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="table w-full min-w-[600px] text-black">
          <thead className="bg-amber-200 text-black">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">District</th>
              <th className="p-2">Contact</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No active riders found.
                </td>
              </tr>
            ) : (
              filteredRiders.map((rider, index) => (
                <tr key={rider._id} className="hover:bg-[#cbea66]">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{rider.name}</td>
                  <td className="p-2">{rider.email}</td>
                  <td className="p-2">{rider.address}</td>
                  <td className="p-2">{rider.contact}</td>
                  <td className="p-2">
                    <button
                      className="btn btn-sm w-full sm:w-auto bg-red-500 text-white hover:bg-red-600 border-none"
                      onClick={() => handleDeactivate(rider._id)}
                    >
                      Deactivate
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveRiders;
