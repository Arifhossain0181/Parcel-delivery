import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Default marker fix (otherwise marker icon won't show)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// 
const districts = [
  // Dhaka Division (13)
  { name: "Dhaka", position: [23.8103, 90.4125] },
  { name: "Faridpur", position: [23.6070, 89.8430] },
  { name: "Gazipur", position: [24.0010, 90.4265] },
  { name: "Gopalganj", position: [23.0052, 89.8266] },
  { name: "Kishoreganj", position: [24.4260, 90.7829] },
  { name: "Madaripur", position: [23.1700, 90.2070] },
  { name: "Manikganj", position: [23.8617, 89.9767] },
  { name: "Munshiganj", position: [23.5500, 90.5305] },
  { name: "Narayanganj", position: [23.6200, 90.5000] },
  { name: "Narsingdi", position: [23.9226, 90.7156] },
  { name: "Rajbari", position: [23.7576, 89.6500] },
  { name: "Shariatpur", position: [23.2200, 90.4308] },
  { name: "Tangail", position: [24.2500, 89.9200] },

  // Chattogram Division (11)
  { name: "Bandarban", position: [22.1958, 92.2186] },
  { name: "Brahmanbaria", position: [23.9571, 91.1116] },
  { name: "Chandpur", position: [23.2333, 90.8500] },
  { name: "Chattogram", position: [22.3569, 91.7832] },
  { name: "Cumilla", position: [23.4573, 91.1809] }, // Cumilla / Comilla
  { name: "Cox's Bazar", position: [21.4272, 92.0165] },
  { name: "Feni", position: [23.0167, 91.4000] },
  { name: "Khagrachari", position: [23.1000, 91.9667] },
  { name: "Lakshmipur", position: [22.9444, 90.8415] },
  { name: "Noakhali", position: [22.8245, 91.0995] },
  { name: "Rangamati", position: [22.6500, 92.2000] },

  // Rajshahi Division (8)
  { name: "Bogura", position: [24.8500, 89.3700] },
  { name: "Chapainawabganj", position: [24.5962, 88.2700] },
  { name: "Joypurhat", position: [25.0953, 89.0412] },
  { name: "Naogaon", position: [24.8236, 88.9300] },
  { name: "Natore", position: [24.4167, 89.0000] },
  { name: "Pabna", position: [24.0037, 89.2331] },
  { name: "Rajshahi", position: [24.3745, 88.6087] },
  { name: "Sirajganj", position: [24.4500, 89.7167] },

  // Khulna Division (10)
  { name: "Bagerhat", position: [22.6516, 89.7926] },
  { name: "Chuadanga", position: [23.6400, 88.8500] },
  { name: "Jashore", position: [23.1700, 89.2167] }, // Jessore / Jashore
  { name: "Jhenaidah", position: [23.5333, 89.1833] },
  { name: "Khulna", position: [22.8456, 89.5403] },
  { name: "Kushtia", position: [23.9013, 89.1220] },
  { name: "Magura", position: [23.4853, 89.4194] },
  { name: "Meherpur", position: [23.7623, 88.6318] },
  { name: "Narail", position: [23.1667, 89.5000] },
  { name: "Satkhira", position: [22.7085, 89.0809] },

  // Barishal Division (6)
  { name: "Barguna", position: [22.1667, 90.1167] },
  { name: "Barishal", position: [22.7000, 90.3667] },
  { name: "Bhola", position: [22.6850, 90.6311] },
  { name: "Jhalokati", position: [22.6417, 90.2167] },
  { name: "Patuakhali", position: [22.3500, 90.3333] },
  { name: "Pirojpur", position: [22.5833, 89.9750] },

  // Sylhet Division (4)
  { name: "Habiganj", position: [24.3745, 91.4026] },
  { name: "Moulvibazar", position: [24.4826, 91.7832] },
  { name: "Sunamganj", position: [25.0658, 91.3950] },
  { name: "Sylhet", position: [24.8949, 91.8662] },

  // Rangpur Division (8)
  { name: "Rangpur", position: [25.7460, 89.2752] },
  { name: "Dinajpur", position: [25.6275, 88.6414] },
  { name: "Kurigram", position: [25.8054, 89.6500] },
  { name: "Gaibandha", position: [25.3288, 89.5418] },
  { name: "Nilphamari", position: [25.9310, 88.8560] },
  { name: "Lalmonirhat", position: [25.9167, 89.1662] },
  { name: "Thakurgaon", position: [26.0333, 88.4660] },
  { name: "Panchagarh", position: [26.3411, 88.5658] },

  // Mymensingh Division (4)
  { name: "Jamalpur", position: [24.9167, 89.9333] },
  { name: "Mymensingh", position: [24.7471, 90.4203] },
  { name: "Netrokona", position: [24.8833, 90.7333] },
  { name: "Sherpur", position: [25.0333, 90.0333] }
];

// Component: search match 
const MapUpdater = ({ position }) => {
  const map = useMap();
  if (position) {
    map.setView(position, 10, { animate: true });
  }
  return null;
};

const BangladeshMap = ({ highlightedDistrict }) => {
  // highlight district থাকলে তার position বের করা
  const highlight = districts.find(
    (d) => d.name.toLowerCase() === highlightedDistrict?.toLowerCase()
  );

  return (
    <div className="flex justify-center p-4">
      <MapContainer
        center={[23.685, 90.3563]} // বাংলাদেশ কেন্দ্র
        zoom={7}
        style={{ height: "400px", width: "80%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {districts.map((district, index) => (
          <Marker key={index} position={district.position}>
            <Popup>{district.name}</Popup>
          </Marker>
        ))}

        {/* যদি search match হয় → সেই district zoom */}
        {highlight && <MapUpdater position={highlight.position} />}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
