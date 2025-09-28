// src/pages/LogoSlider.jsx
import React from "react";

// Import logos
import logo1 from "../../../assets/brands/amazon.png";
import logo2 from "../../../assets/brands/casio.png";
import logo3 from "../../../assets/brands/moonstar.png";
import logo4 from "../../../assets/brands/randstad.png";
import logo5 from "../../../assets/brands/start.png";
import logo6 from "../../../assets/brands/amazon_vector.png";
import logo7 from "../../../assets/brands/start-people 1.png";

const LogoSlider = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-2xl font-bold text-center mb-8 text-black">
        Trusted by Leading Companies
      </h2>

      {/* Marquee container */}
      <marquee behavior="scroll" direction="left" scrollamount="5">
        <div className="flex items-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex-shrink-0 px-[100px]">
              <img
                src={logo}
                alt={`logo-${index}`}
                className="h-6 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </marquee>
    </section>
  );
};

export default LogoSlider;
