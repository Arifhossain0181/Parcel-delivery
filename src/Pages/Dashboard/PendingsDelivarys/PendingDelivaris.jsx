import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAuthhooks from "../../../Hooks/UseAuthhooks";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const PendingDeliveries = () => {
  const { user } = UseAuthhooks();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  //  Fetch pending deliveries
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["pending-deliveries", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/pending-deliveries?rider_email=${user.email}`
      );
      return res.data;
    },
  });

  //  Update status (Picked Up / Delivered)
  const updateStatusMutation = useMutation({
    mutationFn: async ({ parcelId, nextStatus }) => {
      const res = await axiosSecure.patch(`/parcels/update-status/${parcelId}`, {
        status: nextStatus,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Parcel marked as ${variables.nextStatus.replace("_", " ")}`,
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(["pending-deliveries", user?.email]);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update status. Try again.",
      });
    },
  });

  const handleStatusUpdate = (parcelId, currentStatus) => {
    let nextStatus = "";
    if (currentStatus === "rider_assigned") nextStatus = "in_transit";
    else if (currentStatus === "in_transit") nextStatus = "Delivered";

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to mark this parcel as ${nextStatus}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ parcelId, nextStatus });
      }
    });
  };

  if (isLoading)
    return <p className="text-center mt-10 text-lg">Loading parcels...</p>;

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Pending Deliveries ({parcels.length})
      </h2>

      {parcels.length === 0 ? (
        <p className="text-center text-gray-500">No pending deliveries.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200 text-sm sm:text-base">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-700">
                <th className="p-2">#</th>
                <th className="p-2">Title</th>
                <th className="p-2">Receiver</th>
                <th className="p-2">Tracking ID</th>
                <th className="p-2">Status</th>
                <th className="p-2">Cost</th>
                <th className="p-2">Created</th>
                <th className="p-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{parcel.title}</td>
                  <td className="p-2">{parcel.receiver_name}</td>
                  <td className="p-2 break-all">{parcel.trackingId}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-md text-white text-xs ${
                        parcel.status === "rider_assigned"
                          ? "bg-blue-500"
                          : parcel.status === "in_transit"
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                    >
                      {parcel.status}
                    </span>
                  </td>
                  <td className="p-2">${parcel.cost}</td>
                  <td className="p-2">
                    {new Date(parcel.createdAt).toLocaleString()}
                  </td>
                  <td className="p-2 text-center">
                    {(parcel.status === "rider_assigned" ||
                      parcel.status === "in_transit") && (
                      <button
                        disabled={updateStatusMutation.isPending}
                        className={`${
                          parcel.status === "rider_assigned"
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-green-600 hover:bg-green-700"
                        } text-white rounded-md px-3 py-1`}
                        onClick={() =>
                          handleStatusUpdate(parcel._id, parcel.status)
                        }
                      >
                        {parcel.status === "rider_assigned"
                          ? "Mark Picked Up"
                          : "Mark Delivered"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingDeliveries;
