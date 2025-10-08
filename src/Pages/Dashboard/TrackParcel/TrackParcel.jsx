import React, { useState } from "react";
import { useParams } from "react-router";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import useFetchTracking from "../../../Hooks/useFetchTracking";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import { useLocation } from "react-router";
const TrackParcel = () => {
  const { trackId } = useParams();
  const [searchId, setSearchId] = useState(trackId || "");
  const [activeId, setActiveId] = useState(trackId || "");
const location = useLocation();
const stateTrackingId = location.state?.trackingId;

  const { data: updates, isLoading, error } = useFetchTracking(activeId);

  const handleSearch = () => {
    if (searchId.trim() !== "") setActiveId(searchId.trim());
  };

  const positions = updates.filter(u => u.lat && u.lng).map(u => [u.lat, u.lng]);
  const latest = positions[0];

  return (
    <div className="min-h-screen bg-base-200 p-6 text-black">
      <h2 className="text-3xl font-bold text-center mb-4">Track Your Parcel</h2>

      {/* Search */}
      <div className="flex justify-center gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="input input-bordered w-80"
        />
        <button className="btn btn-primary" onClick={handleSearch}>Track</button>
      </div>

      {/* Status */}
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error.message}</p>}

      {updates.length > 0 ? (
        <>
          {/* Table */}
          <div className="overflow-x-auto mb-6">
            <table className="table w-full border">
              <thead className="bg-gray-100">
                <tr>
                  <th>#</th>
                  <th>Status</th>
                  <th>Location</th>
                  <th>Notes</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {updates.map((u, i) => (
                  <tr key={u._id}>
                    <td>{i + 1}</td>
                    <td>{u.status}</td>
                    <td>{u.location}</td>
                    <td>{u.notes}</td>
                    <td>{new Date(u.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Map */}
          {latest && (
            <MapContainer center={latest} zoom={12} style={{ height: "400px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Polyline positions={positions} color="blue" />
              <Marker position={latest} icon={L.icon({
                iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
                iconSize: [32, 32],
                iconAnchor: [16, 32],
              })}>
                <Popup>
                  Current Location<br />
                  {updates[0].location}
                </Popup>
              </Marker>
            </MapContainer>
          )}
        </>
      ) : (
        activeId && !isLoading && (
          <p className="text-center text-gray-500 mt-4">No tracking updates found.</p>
        )
      )}
    </div>
  );
};

export default TrackParcel;
