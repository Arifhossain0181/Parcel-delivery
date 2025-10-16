import React from "react";
import useAuthhooks from "../../../../Hooks/UseAuthhooks.jsx";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure.jsx";
import { useQuery } from "@tanstack/react-query";

const Paymenthistory = () => {
  const { user } = useAuthhooks();
  const axiosSecure = UseAxiosSecure();

  // Fetch payment history
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user?.email}`);
      return res.data;
    },
    onError: (err) => console.error("Failed to fetch payment history:", err),
  });

  

  return (
    <div className="p-2 sm:p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Payment History ({payments.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200 bg-white text-xs sm:text-sm md:text-base">
          <thead>
            <tr className="bg-gray-100 text-black">
              <th className="px-2 py-1">#</th>
              <th className="px-2 py-1">Parcel ID</th>
              <th className="px-2 py-1 hidden sm:table-cell">Transaction ID</th>
              <th className="px-2 py-1">Amount</th>
              
              <th className="px-2 py-1">Status</th>
              <th className="px-2 py-1 hidden md:table-cell">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={payment._id}
                className="hover:bg-[#cbea66] border-b border-gray-200 text-black"
              >
                <td className="px-2 py-1">{index + 1}</td>
                <td className="px-2 py-1">{payment.parcelId}</td>
                <td className="px-2 py-1 hidden sm:table-cell">{payment.transactionId}</td>
                <td className="px-2 py-1">${payment.amount}</td>
               
                <td className="px-2 py-1">
                  <span
                    className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                      payment.status === "succeeded"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {payment.status === "succeeded" ? "Paid" : payment.status}
                  </span>
                </td>
                <td className="px-2 py-1 hidden md:table-cell">
                  {new Date(payment.paid_at_string || payment.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <p className="text-center mt-6 text-gray-500">
            No payment history found yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Paymenthistory;
