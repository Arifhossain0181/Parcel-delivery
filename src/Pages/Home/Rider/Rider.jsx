import React, { useState } from "react";
import logo from "../../../assets/agent-pending.png";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const bangladeshDistricts = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barisal",
  "Bhola",
  "Bogra",
  "Brahmanbaria",
  "Chandpur",
  "Chapai Nawabganj",
  "Chattogram",
  "Chuadanga",
  "Comilla",
  "Cox's Bazar",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokathi",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachhari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
];

const Rider = () => {
  const [searchDistrict, setSearchDistrict] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const axiosSecure = UseAxiosSecure();

  const filteredDistricts = bangladeshDistricts.filter((d) =>
    d.toLowerCase().includes(searchDistrict.toLowerCase())
  );

  // ✅ CHANGED — made async so we can await axios call properly
  const handleSubmitted = async (event) => {
    event.preventDefault();
    const form = event.target;

    const rider = {
      name: form.name.value,
      email: form.email.value,
      nid: form.nid.value,
      age: form.age.value,
      religion: form.religion.value,
      house: form.house.value,
      contact: form.contact.value,
      weight: form.weight.value,
      address: selectedDistrict,
      license: form.license.value,
    };

    try {
      const res = await axiosSecure.post(`/rideres`, rider);

      if (res.data.insertedId) {
        Swal.fire({
          title: "✅ Success!",
          html: "<b>Your form has been submitted successfully!</b>",
          icon: "success",
          confirmButtonText: "Great!",
          confirmButtonColor: "#4CAF50",
          background: "#f0fdf4",
          iconColor: "#4CAF50",
          timer: 2500,
          timerProgressBar: true,
          showClass: {
            popup: "animate__animated animate__fadeInDown",
          },
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
        });

        //  CHANGED — moved reset *inside* success block
        form.reset();
        setSelectedDistrict("");
        setSearchDistrict("");
      }
    } catch (error) {
      console.error("Error submitting rider form:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Something went wrong. Please try again.",
      });
    }
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

            {/* NID */}
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

            {/* Religion */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Religion</label>
              <select
                className="select select-bordered w-full"
                name="religion"
                required
              >
                <option value="" disabled>
                  Select Religion
                </option>
                <option>Islam</option>
                <option>Hindu</option>
                <option>Christian</option>
                <option>Buddhism</option>
              </select>
            </div>

            {/* Warehouse */}
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Which Warehouse?</label>
              <select
                name="house"
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
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
              />
            </div>

            {/* District */}
            <div className="flex flex-col md:col-span-2">
              <label className="mb-1 font-medium">Your District</label>
              <input
                type="text"
                placeholder="Search District"
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                className="input input-bordered mb-2 w-full"
              />
              <select
                className="select select-bordered w-full"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select District
                </option>
                {filteredDistricts.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>

            {/* License */}
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

            {/* Submit */}
            <div className="col-span-1 md:col-span-2">
              <button className="w-full bg-amber-400 text-white font-semibold py-3 rounded-lg hover:bg-amber-500 transition">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 hidden lg:flex items-center justify-center bg-amber-50">
          <img src={logo} alt="Rider" className="object-cover rounded-r-xl" />
        </div>
      </div>
    </div>
  );
};

export default Rider;
