import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthhooks from "../../../Hooks/UseAuthhooks.jsx";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure.jsx";

const CompletedDeliveries = () => {
  const { user } = useAuthhooks();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [cashoutSelected, setCashoutSelected] = useState([]);

  // Fetch completed deliveries using React Query
  const { data: completedParcels = [], isLoading } = useQuery({
    queryKey: ["completed-deliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/completed-deliveries?rider_email=${user.email}`
      );
      return res.data;
    },
    onError: (err) => console.error("Failed to fetch completed deliveries:", err),
  });

  // Calculate earning for a parcel
  const calculateEarning = (parcel) => {
    const sameDistrict = parcel.sender_region === parcel.receiver_region;
    return sameDistrict ? parcel.cost * 0.8 : parcel.cost * 0.3;
  };

  // Cashout selected parcels
  const handleCashout = async () => {
    try {
      // In real scenario, send API request to mark as cashed out
      const totalEarning = cashoutSelected.reduce(
        (sum, parcel) => sum + calculateEarning(parcel),
        0
      );
      alert(`Cashout request sent! Total: $${totalEarning.toFixed(2)}`);
      // Optionally, refetch after cashout
      setCashoutSelected([]);
      queryClient.invalidateQueries(["completed-deliveries", user?.email]);
    } catch (err) {
      console.error("Cashout failed:", err);
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Completed Deliveries ({completedParcels.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 bg-white text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="px-2 py-1">#</th>
              <th className="px-2 py-1">Parcel Title</th>
              <th className="px-2 py-1">Receiver Name</th>
              <th className="px-2 py-1">Receiver Address</th>
              <th className="px-2 py-1">Cost</th>
              <th className="px-2 py-1">Delivery Type</th>
              <th className="px-2 py-1">Earning</th>
              <th className="px-2 py-1">Pick-up Time</th>
              <th className="px-2 py-1">Delivery Time</th>
              <th className="px-2 py-1">Tracking ID</th>
              <th className="px-2 py-1">Select Cashout</th>
            </tr>
          </thead>

          <tbody>
            {completedParcels.map((parcel, index) => {
              const earning = calculateEarning(parcel);
              const isSelected = cashoutSelected.some((p) => p._id === parcel._id);

              return (
                <tr
                  key={parcel._id}
                  className="hover:bg-[#cbea66] border-b border-gray-200 text-black"
                >
                  <td className="px-2 py-1">{index + 1}</td>
                  <td className="px-2 py-1">{parcel.title}</td>
                  <td className="px-2 py-1">{parcel.receiver_name}</td>
                  <td className="px-2 py-1">{parcel.receiver_address}</td>
                  <td className="px-2 py-1">${parcel.cost}</td>
                  <td className="px-2 py-1">
                    {parcel.sender_region === parcel.receiver_region
                      ? "Same District"
                      : "Other District"}
                  </td>
                  <td className="px-2 py-1">${earning.toFixed(2)}</td>
                  <td className="px-2 py-1">
                    {new Date(parcel.assignedAt).toLocaleString()}
                  </td>
                  <td className="px-2 py-1">
                    {new Date(parcel.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-2 py-1">{parcel.trackingId}</td>
                  <td className="px-2 py-1 text-center">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {
                        if (isSelected) {
                          setCashoutSelected(
                            cashoutSelected.filter((p) => p._id !== parcel._id)
                          );
                        } else {
                          setCashoutSelected([...cashoutSelected, parcel]);
                        }
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {completedParcels.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            No completed deliveries yet.
          </p>
        )}

        {/* Cashout Box */}
        {cashoutSelected.length > 0 && (
          <div className="mt-6 p-4 bg-gray-100 hover:bg-amber-300 text-black rounded shadow flex justify-between items-center">
            <p className="font-medium">
              Total Earnings: $
              {cashoutSelected
                .reduce((sum, parcel) => sum + calculateEarning(parcel), 0)
                .toFixed(2)}
            </p>
            <button
              onClick={handleCashout}
              className="btn btn-sm btn-success text-white"
            >
              Cashout Selected
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedDeliveries;
