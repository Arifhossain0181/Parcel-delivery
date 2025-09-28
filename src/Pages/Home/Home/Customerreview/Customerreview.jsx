// ProfileSwiper.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Quote } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import logo from "../../../../assets/customer-top.png";

const ProfileSwiper = () => {
  const profiles = [
    {
      id: 1,
      desc: "Pathao delivery has made my business faster and more reliable.",
      name: "Arif Hossain",
      role: "Business Owner",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    {
      id: 2,
      desc: "Excellent service! Always on time and very trustworthy.",
      name: "Sara Ahmed",
      role: "Entrepreneur",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    {
      id: 3,
      desc: "Their customer support is amazing and professional.",
      name: "Tanvir Rahman",
      role: "E-commerce Seller",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    {
      id: 4,
      desc: "Fastest courier service I’ve used so far. Highly recommend!",
      name: "Nadia Khan",
      role: "Freelancer",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    {
      id: 5,
      desc: "Safe packaging and always on-time delivery.",
      name: "Rafsan Jani",
      role: "Startup Founder",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: 6,
      desc: "I love how they handle corporate deliveries with care.",
      name: "Mehnaz Begum",
      role: "Corporate Manager",
      avatar: "https://i.pravatar.cc/100?img=6",
    },
    {
      id: 7,
      desc: "Booking and tracking are super easy through their system.",
      name: "Imran Ali",
      role: "Retailer",
      avatar: "https://i.pravatar.cc/100?img=7",
    },
    {
      id: 8,
      desc: "My customers love the cash-on-delivery option.",
      name: "Shaila Parvin",
      role: "Online Seller",
      avatar: "https://i.pravatar.cc/100?img=8",
    },
    {
      id: 9,
      desc: "They’ve helped me scale my business nationwide.",
      name: "Mahfuz Anam",
      role: "SME Owner",
      avatar: "https://i.pravatar.cc/100?img=9",
    },
    {
      id: 10,
      desc: "Professional, affordable, and highly dependable courier partner.",
      name: "Farhana Yasmin",
      role: "Corporate Client",
      avatar: "https://i.pravatar.cc/100?img=10",
    },
  ];

  return (
    <section className="py-12 px-6 md:px-12 lg:px-20  bg-amber-50 text-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <img className="justify-center mx-auto mb-10" src={logo} alt="" />
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            What Our Clients Say
          </h2>
          <p className="text-gray-600">Swipe or use arrows to change cards</p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          centeredSlides={true}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2, centeredSlides: true },
            1024: { slidesPerView: 3, centeredSlides: true },
          }}
          className="pb-12"
        >
          {profiles.map((p) => (
            <SwiperSlide key={p.id}>
              {({ isActive }) => (
                <div
                  className={`transition-all duration-300 rounded-2xl shadow-lg h-full flex flex-col justify-between text-center ${
                    isActive
                      ? "opacity-100 scale-105 bg-white"
                      : "opacity-50 scale-95 bg-gray-50"
                  }`}
                >
                  {/* Top Section */}
                  <div className="flex-1 flex flex-col justify-center px-6 pt-8 pb-6">
                    <Quote className="w-10 h-10 mb-4 text-primary mx-auto" />
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Divider + Profile */}
                  <div className="px-6 pb-8">
                    <hr className="border-gray-200 mb-4" />
                    <div className="flex items-center gap-3 justify-center">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="text-left">
                        <h4 className="text-sm font-semibold">{p.name}</h4>
                        <p className="text-xs text-gray-500">{p.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProfileSwiper;
