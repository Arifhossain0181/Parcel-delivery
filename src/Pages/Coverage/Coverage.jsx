import React, { useState } from "react";
import BangladeshMap from "./BangladeshMap";

const Coverage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightedDistrict, setHighlightedDistrict] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setHighlightedDistrict(searchTerm.trim());
    } else {
      setHighlightedDistrict(null);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Our Coverage Areas</h2>

      <form onSubmit={handleSearch} className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search district..."
          className="border p-2 rounded w-64 text-black"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>

      {/* Map Component */}
      <BangladeshMap highlightedDistrict={highlightedDistrict} />
    </div>
  );
};

export default Coverage;
