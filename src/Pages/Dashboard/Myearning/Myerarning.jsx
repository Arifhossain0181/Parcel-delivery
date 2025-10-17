import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuthhooks from "../../../Hooks/UseAuthhooks";

const MyEarning = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuthhooks();

  const { data: earnings = [], isLoading, error } = useQuery({
    queryKey: ["riderEarnings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/rider/earnings?rider_email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const totals = useMemo(() => {
    if (!earnings.length) return {};

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    const parseDate = (d) => new Date(d);

    const filterAndSum = (filterFn) =>
      earnings
        .filter((e) => e.deliveryDate && filterFn(parseDate(e.deliveryDate)))
        .reduce((sum, e) => sum + (e.earningAmount || 0), 0);

    return {
      today: filterAndSum((d) => d.toDateString() === today.toDateString()),
      week: filterAndSum((d) => d >= startOfWeek),
      month: filterAndSum((d) => d >= startOfMonth),
      year: filterAndSum((d) => d >= startOfYear),
      overall: earnings.reduce((sum, e) => sum + (e.earningAmount || 0), 0),
    };
  }, [earnings]);

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading earnings...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Failed to load data.</p>;

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {["today", "week", "month", "year", "overall"].map((key) => (
        <div
          key={key}
          className="bg-white shadow-md rounded-2xl p-4 text-center border border-gray-100 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold capitalize text-gray-700">{key}</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-2">
            ৳ {totals[key]?.toLocaleString("bn-BD") || 0}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyEarning;
