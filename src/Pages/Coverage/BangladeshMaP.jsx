import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const BangladeshMap = ({ service }) => {
  const [searchText, setSearchText] = useState("");
  const [activeCoords, setActiveCoords] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    // safe check সহ includes
    const match = service.find((d) =>
      d?.district?.toLowerCase().includes(searchText.toLowerCase())
    );

    if (match) {
      setActiveCoords([match.latitude, match.longitude]);
      setActiveDistrict(match.district);
    } else {
      setActiveCoords(null);
      setActiveDistrict(null);
    }
  };

  const position = [23.685, 90.3563];

  const customIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  // Helper component to fly to searched district
  const FlyToDistrict = ({ coords }) => {
    const map = useMap();
    if (coords) {
      map.flyTo(coords, 14, { duration: 1.5 });
    }
    return null;
  };

  return (
    <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
      {/* Search box */}
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search district"
          className="flex-1 px-4 py-2.5 border rounded-md outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          type="submit"
          className="px-4 py-2.5 bg-blue-500 text-white rounded-md ml-2 hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      <MapContainer
        center={position}
        zoom={7}
        style={{ height: "100%", width: "100%" }}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToDistrict coords={activeCoords} />

        {service.map((center, idx) => (
          <Marker
            key={idx}
            icon={customIcon}
            position={[center.latitude, center.longitude]}
          >
            <Popup autoOpen={center.district === activeDistrict}>
              <strong>{center.district}</strong> <br />
              <span>{center.covered_area?.join(", ")}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
