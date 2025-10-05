import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import serviceCenters from "../../../public/servicesenter.json";
import UseAuthhooks from "../../Hooks/UseAuthhooks"; //
import UseAxiosSecure from "../../Hooks/UseAxiosSecure"; // secure axios instance 
import { useNavigate } from "react-router-dom";

const ParcelForm = () => {
  const { user } =UseAuthhooks(); // logged in user info (email)
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
   const  axiossecure  = UseAxiosSecure(); // secure axios instance
  // state
  const [cost, setCost] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [trackingId, setTrackingId] = useState(null);

  const onSubmit = (data) => {
    // Sender & Receiver center 
    const senderCenterData = serviceCenters.find(
      (sc) => sc.district === data.sender_center
    );
    const receiverCenterData = serviceCenters.find(
      (sc) => sc.district === data.receiver_center
    );

    const senderCenter = senderCenterData?.district;
    const receiverCenter = receiverCenterData?.district;

    // Parcel Cost Calculation
    let calculatedCost = 0;
    let breakdown = "";

    if (data.type === "document") {
      calculatedCost = senderCenter === receiverCenter ? 60 : 80;
      breakdown = `Document Parcel: ${senderCenter === receiverCenter ? "Within City (৳60)" : "Outside City/District (৳80)"}`;
    } else {
      const weight = parseFloat(data.weight || 0);
      if (weight <= 3) {
        calculatedCost = senderCenter === receiverCenter ? 110 : 150;
        breakdown = `Non-Document up to 3kg: ${senderCenter === receiverCenter ? "Within City (৳110)" : "Outside City/District (৳150)"}`;
      } else {
        const extraKg = weight - 3;
        if (senderCenter === receiverCenter) {
          calculatedCost = 110 + extraKg * 40;
          breakdown = `Non-Document >3kg: ৳110 + (৳40 x ${extraKg}kg)`;
        } else {
          calculatedCost = 150 + extraKg * 40 + 40;
          breakdown = `Non-Document >3kg: ৳150 + (৳40 x ${extraKg}kg) + ৳40 extra`;
        }
      }
    }

    // Tracking ID  generate 
    const newTrackingId = uuidv4();
    setTrackingId(newTrackingId);

    setCost(calculatedCost);
    setShowConfirm(true);

    toast.success(
      `📦 Pricing Breakdown:\n${breakdown}\n\n💰 Total: ৳${calculatedCost}\n🔑 Tracking ID: ${newTrackingId}`,
      { duration: 6000 }
    );
  };

  const confirmSubmit = () => {
    if (!trackingId) {
      toast.error("Tracking ID not found! Please try again.");
      return;
    }

    const parcelData = {
      ...watch(),
      trackingId,
      cost,
      createdAt: new Date().toISOString(), // ISO format date
      createdBy: user?.email || "guest",
      status: "Pending", // future tracking system এ
    };

    console.log("Saved Parcel:", parcelData);

    

    //server data 
    axiossecure.post('/Parcel', parcelData)
    .then(res=>{
      console.log('Server Response:', res.data);
      if(res.data.insertedId){
        // todo: here payment gateway integration
        toast.success(' Parcel info saved to server successfully!');
            setTimeout(() => navigate("/dashboard/MyParcel"), 1000); 
      }
    })


  };

  const regions = [...new Set(serviceCenters.map((sc) => sc.region))];

  return (
    <div className="container mx-auto p-6">
      {/* Toast  center এ show */}
      <Toaster position="top-center" />

      <h1 className="text-3xl font-bold mb-2">Send a Parcel</h1>
      <p className="mb-6 text-gray-600">
        As the system is based on Door to Door delivery, Parcel needs both
        pickup and delivery location.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Parcel Info */}
        <div className="mb-6 border p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-2">Parcel Info</h2>
          <div className="mb-4">
            <label className="mr-4 font-medium">Parcel Type:</label>
            <label className="mr-4">
              <input
                type="radio"
                value="document"
                {...register("type", { required: true })}
              />{" "}
              Document
            </label>
            <label>
              <input
                type="radio"
                value="non-document"
                {...register("type", { required: true })}
              />{" "}
              Non-Document
            </label>
            {errors.type && <p className="text-red-500">Required</p>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
              {...register("title", { required: true })}
            />
            {errors.title && <p className="text-red-500">Required</p>}
          </div>
          <div className="mb-4">
            <input
              type="number"
              step="0.01"
              placeholder="Weight (kg, optional)"
              className="input input-bordered w-full"
              {...register("weight")}
            />
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sender */}
          <div className="border p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">Sender Info</h2>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full mb-3"
              {...register("sender_name", { required: true })}
            />
            <input
              type="text"
              placeholder="Contact"
              className="input input-bordered w-full mb-3"
              {...register("sender_contact", { required: true })}
            />
            <select
              className="select select-bordered w-full mb-3"
              {...register("sender_region", { required: true })}
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <select
              className="select select-bordered w-full mb-3"
              {...register("sender_center", { required: true })}
            >
              <option value="">Select Service Center</option>
              {serviceCenters.map((sc) => (
                <option key={sc.district} value={sc.district}>
                  {sc.district}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Address"
              className="textarea textarea-bordered w-full mb-3"
              {...register("sender_address", { required: true })}
            ></textarea>
          </div>

          {/* Receiver */}
          <div className="border p-4 rounded-lg shadow-sm">
            <h2 className="font-semibold mb-2">Receiver Info</h2>
            <input
              type="text"
              placeholder="Name"
              className="input input-bordered w-full mb-3"
              {...register("receiver_name", { required: true })}
            />
            <input
              type="text"
              placeholder="Contact"
              className="input input-bordered w-full mb-3"
              {...register("receiver_contact", { required: true })}
            />
            <select
              className="select select-bordered w-full mb-3"
              {...register("receiver_region", { required: true })}
            >
              <option value="">Select Region</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <select
              className="select select-bordered w-full mb-3"
              {...register("receiver_center", { required: true })}
            >
              <option value="">Select Service Center</option>
              {serviceCenters.map((sc) => (
                <option key={sc.district} value={sc.district}>
                  {sc.district}
                </option>
              ))}
            </select>
            <textarea
              placeholder="Address"
              className="textarea textarea-bordered w-full mb-3"
              {...register("receiver_address", { required: true })}
            ></textarea>
          </div>
        </div>

        {/* Submit */}
        <div className="mt-6">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      {/* Confirm Section */}
      {showConfirm && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-100">
          <p className="mb-2 font-semibold">
            🔑 Tracking ID: <span className="text-blue-600">{trackingId}</span>
          </p>
          <p className="mb-2 font-semibold text-green-600">
            💰 Total Cost: ৳{cost}
          </p>
          <button onClick={confirmSubmit} className="btn btn-success mr-3">
            Proceed to Payment
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            className="btn btn-warning"
          >
            Go Back & Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default ParcelForm;
