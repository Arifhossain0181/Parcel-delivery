import React from "react";
import logo from "../../../assets/agent-pending.png";

const Rider = () => {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
      <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-xl overflow-hidden max-w-6xl w-full">
        {/* Left: Form */}
        <div className="lg:w-1/2 p-10">
          <h1 className="text-4xl font-bold text-black mb-4">Be A Rider</h1>
          <p className="text-gray-700 mb-8">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time, every time.
          </p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#cbeb67]">
            {/* Name */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Your Name</label>
              <input
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Your Email</label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
              />
            </div>

            {/* NID No */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">NID No</label>
              <input
                type="text"
                placeholder="NID No"
                className="input input-bordered w-full"
              />
            </div>

            {/* Age */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Your Age</label>
              <input
                type="number"
                placeholder="Age"
                className="input input-bordered w-full"
              />
            </div>

            {/* Religion Dropdown */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Religion</label>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  Select Religion
                </option>
                <option>Islam</option>
                <option>Hindu</option>
                <option>Christian</option>
                <option>Buddhism</option>
              </select>
            </div>

            {/* Warehouse Dropdown */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Which Warehouse you want to ?</label>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  Select Warehouse
                </option>
                <option>Warehouse 1</option>
                <option>Warehouse 2</option>
                <option>Warehouse 3</option>
              </select>
            </div>

            {/* Contact */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Contact Number</label>
              <input
                type="text"
                placeholder="Contact"
                className="input input-bordered w-full"
              />
            </div>

            {/* Weight */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Full Weight</label>
              <input
                type="text"
                placeholder="Weight in Kg"
                className="input input-bordered w-full"
              />
            </div>

            {/* Submit button spans full width */}
            <div className="col-span-1 md:col-span-2">
              <button className="w-full bg-amber-400 text-white font-semibold py-3 rounded-lg hover:bg-amber-500 transition">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Right: Image */}
        <div className="lg:w-1/2 hidden lg:flex items-center justify-center bg-amber-50">
          <img
            src={logo}
            alt="Rider"
            className="object-cover   rounded-r-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Rider;
