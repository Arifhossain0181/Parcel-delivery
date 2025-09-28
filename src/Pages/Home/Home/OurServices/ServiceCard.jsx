// src/components/ServiceCard.jsx
import React from "react";

const ServiceCard = ({service}) => {
  const {icon:icon, title, description, icon: Icon } = service;
  return (
    <div className="card bg-white shadow-md border border-gray-100 hover:bg-[#cbeb67] hover:text-white transition-all duration-400 transform hover:-translate-y-2 hover:shadow-xl">
      <div className="card-body items-center text-center">
        <div className="text-4xl text-primary group-hover:text-white transition-colors duration-300">
          <Icon />
        </div>
        <h3 className="card-title text-lg font-semibold text-black mt-3">{title}</h3>
        <p className="text-gray-600 group-hover:text-white transition-colors duration-300 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
