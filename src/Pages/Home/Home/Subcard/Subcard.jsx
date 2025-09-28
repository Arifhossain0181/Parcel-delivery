import React from "react";
import { Package, DollarSign, MapPin, Briefcase } from "lucide-react"; // icons

const Services = () => {
  const cards = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <Package className="w-10 h-10 text-primary" />,
    },
    {
      id: 2,
      title: "Cash On Delivery",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <DollarSign className="w-10 h-10 text-primary" />,
    },
    {
      id: 3,
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <MapPin className="w-10 h-10 text-primary" />,
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: <Briefcase className="w-10 h-10 text-primary" />,
    },
  ];

  return (
    <div className="py-12 px-6 md:px-12 lg:px-20 bg-base-200">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
     How It Works
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow"
          >
            <div className="mb-4">{card.icon}</div>
            <h3 className="text-lg font-semibold mb-2 text-black">{card.title}</h3>
            <p className="text-sm text-gray-600">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
