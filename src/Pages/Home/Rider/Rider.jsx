import React from "react";
import logo from "../../../assets/agent-pending.png";

const Rider = () => {
  const handleSubmitted = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const nid = form.nid.value;
    const age = form.age.value;
    const religion = form.religion.value;
    const house = form.house.value;
    const contact = form.contact.value;
    const weight = form.weight.value;
    const address = form.address.value;
    const license = form.license.value;   
    const rider = {
      name,
      email,nid,age,religion,house,contact,weight,address,license
    };
    console.log(rider);
    form.reset();
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
      <div className="flex flex-col lg:flex-row bg-white shadow-2xl rounded-xl overflow-hidden max-w-6xl w-full">
        {/* Left: Form */}
        <div className="lg:w-1/2 p-10">
          <h1 className="text-4xl font-bold text-black mb-4">Be A Rider</h1>
          <p className="text-gray-700 mb-8">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>

          <form
            onSubmit={handleSubmitted}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#cbeb67]"
          >
            {/* Name */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Your Name</label>
              <input
              name="name"
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Your Email</label>
              <input
              name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* NID No */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">NID No</label>
              <input
              name="nid"
                type="text"
                placeholder="NID No"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Age */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Your Age</label>
              <input
              name="age"
                type="number"
                placeholder="Age"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Religion Dropdown */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Religion</label>
              <select className="select select-bordered w-full" name="religion" required>
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
              <label className="mb-1 font-medium">Which Warehouse?</label>
              <select name="house" className="select select-bordered w-full" required>
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
              name="contact"
                type="text"
                placeholder="Contact"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Weight */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Full Weight Capacity</label>
              <input
              name="weight"
                type="text"
                placeholder="Weight in Kg"
                className="input input-bordered w-full"
                required
              />
            </div>

            

            {/* Driving License */}
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 font-medium">Driving License No</label>
              <input
              name="license"
                type="text"
                placeholder="License Number"
                className="input input-bordered w-full"
                required
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
          <img src={logo} alt="Rider" className="object-cover rounded-r-xl" />
        </div>
      </div>
    </div>
  );
};

export default Rider;
