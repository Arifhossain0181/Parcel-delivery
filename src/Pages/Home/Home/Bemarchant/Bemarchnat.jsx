import React from "react";
import location from "../../../../assets/location-merchant.png";
import banner from "../../../../assets/Screenshot 2025-09-28 203224.png"; // 👈 wave image

const Bemarchnat = () => {
  return (
    <div data-aos='flip-up' className="relative ">
      {/*  Top middle banner image */}
      <div className="w-full flex justify-center absolute top-0 ">
        <img
          src={banner}
          alt="banner"
          className="w-full max-w-7xl object-cover h-12 md:h-20 lg:h-22"
        />
      </div>

      {/* Hero section */}
      <div className="hero  p-6 md:p-12 lg:p-20 bg-[#02373c] relative opacity-80">
        <div className="hero-content flex-col lg:flex-row-reverse gap-8">
          <img
            src={location}
            alt="merchant-location"
            className="max-w-xs md:max-w-sm rounded-lg shadow-2xl"
          />
          <div className="text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
              Merchant and Customer Satisfaction is Our First Priority
            </h1>
            <p className="py-4 md:py-6 text-sm md:text-base">
              We offer the lowest delivery charge with the highest value along
              with 100% safety of your product. Pathao courier delivers your
              parcels in every corner of Bangladesh right on time.
            </p>
           <div className="space-x-4">
             <button className="btn btn-primary rounded-full bg-[#cbeb67] border-0 text-black font-bold">Become A Merchant </button> 
            <button className="btn btn-primary btn-outline rounded-full border-[#cbeb67] text-[#cbeb67]">Become a ronded full</button> 
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bemarchnat;
