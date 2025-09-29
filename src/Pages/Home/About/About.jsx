import React, { useState } from "react";

const AboutUs = () => {
  const [active, setActive] = useState("Story");

  return (
    <div className="min-h-screen bg-amber-50 flex  p-6">
      <div className="max-w-4xl w-full  s rounded-xl p-6">
        {/* Title */}
        <h1 className="text-3xl text-black font-bold mb-4">About Us</h1>
        <p className="text-gray-600 mb-6">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
          From personal packages to business shipments — we deliver on time,
        </p>

        {/* Tabs */}
        <div className="flex gap-6 border-b pb-2 text-sm md:text-base">
          {["Story", "Mission", "Success", "Team & Others"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`pb-2 ${
                active === tab
                  ? "text-[#cbeb67] border-b-2 border-[#cbeb67]"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-6 text-gray-700 leading-relaxed">
          {active === "Story" && (
            <p>
              We started with a simple promise — to make parcel delivery fast, reliable,
              and stress-free. Over the years, our commitment to real-time tracking,
              efficient logistics, and customer-first service has made us a trusted partner.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            </p>
          )}

          {active === "Mission" && (
            <p>
              Our mission is to redefine delivery services with technology, efficiency,
              and trust. We aim to provide reliable and secure parcel solutions that
              save time and simplify logistics.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            </p>
          )}

          {active === "Success" && (
            <p>
              Thousands of happy customers, countless successful deliveries, and
              strong partnerships with businesses define our success.Our mission is to redefine delivery services with technology, efficiency, and trust. We aim to provide reliable and secure parcel solutions that save time and simplify logistics.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            </p>
          )}

          {active === "Team & Others" && (
            <p>
              Behind every delivery is a hardworking team — riders, staff, and
              tech experts working together to ensure shipments are handled with care.Our mission is to redefine delivery services with technology, efficiency, and trust. We aim to provide reliable and secure parcel solutions that save time and simplify logistics.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
