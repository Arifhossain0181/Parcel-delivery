import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { FaSearch, FaUserShield, FaUserMinus } from "react-icons/fa";
// NurUI GlowCard import (after running `npx nurui add spotlight-card`)
import { GlowCard } from "../../../components/nurui/spotlight-card";


const MakeAdmin = () => {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");

  //  Search users by email (multi-user)
  const { data: users = [], refetch, isFetching } = useQuery({
    queryKey: ["searchUser", email],
    queryFn: async () => {
      if (!email) return [];
      const res = await axiosSecure.get(`/users/search?email=${email}`);
      return res.data.user || [];
    },
    enabled: false,
  });

  // Promote user mutation
  const promoteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/admin/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "User promoted to Admin ✅", "success");
      queryClient.invalidateQueries({ queryKey: ["searchUser", email] });
      refetch();
    },
    onError: (err) => {
      Swal.fire("Error", err.response?.data?.message || "Failed to promote", "error");
    },
  });

  // Remove admin mutation
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.patch(`/users/remove-admin/${id}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Admin role removed 🚫", "success");
      queryClient.invalidateQueries({ queryKey: ["searchUser", email] });
      refetch();
    },
    onError: (err) => {
      Swal.fire("Error", err.response?.data?.message || "Failed to remove admin", "error");
    },
  });

  // Handle search
  const handleSearch = () => {
    if (!email.trim()) {
      Swal.fire("Error", "Please enter an email", "error");
      return;
    }
    refetch();
  };

  // Handle promote/remove with Swal confirmation
  const handleToggle = (id, isAdmin) => {
    Swal.fire({
      title: "Are you sure?",
      text: isAdmin
        ? "Do you want to remove admin privileges?"
        : "Do you want to make this user an admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: isAdmin ? "Yes, remove" : "Yes, promote",
    }).then((result) => {
      if (result.isConfirmed) {
        isAdmin ? removeMutation.mutate(id) : promoteMutation.mutate(id);
      }
    });
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Manage User Roles 👑
      </h2>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center">
        <input
          type="email"
          placeholder="Search user by email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full sm:w-96"
        />
        <button
          onClick={handleSearch}
          className="btn btn-primary flex items-center gap-2"
        >
          <FaSearch />
          {isFetching ? "Searching..." : "Search"}
        </button>
      </div>

      {/* User Results */}
      {users.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {users.map((u, index) => (
            <GlowCard key={u._id || index}>
              <div className="p-5 bg-base-100/80 backdrop-blur rounded-xl shadow-lg border border-gray-200 hover:border-primary transition">
                <h3 className="text-lg font-semibold mb-1">
                  {u.name || "Unnamed User"}
                </h3>
                <p className="text-sm text-gray-600 break-all">{u.email}</p>
                <p className="mt-2">
                  <strong>Role:</strong>{" "}
                  <span
                    className={`badge ${
                      u.role === "admin" ? "badge-success" : "badge-outline"
                    }`}
                  >
                    {u.role}
                  </span>
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Created: {new Date(u.created_at).toLocaleDateString()}
                </p>

                <button
                  onClick={() => handleToggle(u._id, u.role === "admin")}
                  className={`btn w-full mt-4 flex items-center justify-center gap-2 ${
                    u.role === "admin" ? "btn-warning" : "btn-success"
                  }`}
                >
                  {u.role === "admin" ? <FaUserMinus /> : <FaUserShield />}
                  {u.role === "admin" ? "Remove Admin" : "Make Admin"}
                </button>
              </div>
            </GlowCard>
          ))}
        </div>
      ) : (
        !isFetching && (
          <p className="text-center text-gray-500">
            No users found. Try searching by full or partial email.
          </p>
        )
      )}
    </div>
  );
};

export default MakeAdmin;
