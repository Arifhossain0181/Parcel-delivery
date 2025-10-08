import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import UseAuthhooks from "../../../Hooks/UseAuthhooks";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
// Import Link and NavLink
import { Link, NavLink } from "react-router";

const MyParcel = () => {
  const { user } = UseAuthhooks();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Fetch parcels for this user
  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/Parcel?email=${user?.email}`,{
       
      });
      return res.data;
    },
  });

  // Delete parcel
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/Parcel/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
        queryClient.invalidateQueries(["parcels", user?.email]);
      }
    }
  };

  const handlePayment = (id) => {
    navigate(`/dashboard/Payment/${id}`);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        My Parcels ({parcels.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 bg-white text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="px-2 py-1">#</th>
              <th className="px-2 py-1">Title</th>
              <th className="px-2 py-1">Receiver</th>
              <th className="px-2 py-1">Status</th>
              <th className="px-2 py-1">Cost</th>
              <th className="px-2 py-1">trackingId</th>
              <th className="px-2 py-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr
                key={parcel._id}
                className="hover:bg-[#cbea66] border-b border-gray-200 text-black"
              >
                <td className="px-2 py-1">{index + 1}</td>
                <td className="px-2 py-1">{parcel.title}</td>
                <td className="px-2 py-1">{parcel.receiver_name}</td>
                <td className="px-2 py-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      parcel.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : parcel.status === "Delivered"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {parcel.paymentStatus === "paid" ? "Paid" : parcel.status}
                  </span>
                </td>
                <td className="px-2 py-1">{parcel.cost}</td>
                <td className="px-2 py-1">{parcel.trackingId}</td>
                <td className="px-2 py-1 flex flex-wrap gap-2">
                  <button className="btn btn-sm btn-info text-white">
                    View
                  </button>
                  {parcel.paymentStatus === "paid" && parcel.trackingId ? (
                    <Link
                      to={`/dashboard/Track`}
                      className="btn btn-sm btn-success text-white"
                    >
                      Tracking
                    </Link>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel._id)}
                      className="btn btn-sm btn-success text-white"
                      disabled={parcel.paymentStatus === "paid"}
                    >
                      Pay
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {parcels.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            No parcels found yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyParcel;
