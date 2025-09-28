import logo1 from "../../../../assets/delivery-van.png";
import logo2 from "../../../../assets/safe-delivery.png";
// support.png does not exist in assets; use bookingIcon.png instead
import logo3 from "../../../../assets/bookingIcon.png";

const benefits = [
  {
    id: 1,
    title: "Live Parcel Tracking",
    description:
      "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
  image: logo1
  },
  {
    id: 2,
    title: "100% Safe Delivery",
    description:
      "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
  image: logo2
  },
  {
    id: 3,
    title: "24/7 Call Center Support",
    description:
      "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
  image: logo3
  }
];

export default function Benefits() {
  return (
    <div className="w-full max-w-6xl mx-auto py-10 space-y-6">
      {benefits.map((item, index) => (
        <div key={item.id}>
          {/* Card */}
          <div className="card bg-base-100 shadow-md hover:shadow-lg transition p-4">
            <div className="flex flex-col md:flex-row items-center">
              {/* Left side image */}
              <figure className="p-8">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 object-contain rounded-xl "
                />
              </figure>

              {/* Divider between image & text */}
              <div className="divider md:divider-horizontal"></div>

              {/* Right side text */}
              <div className="card-body">
                <h2 className="card-title text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          </div>

          {/* Divider between cards */}
          {index < benefits.length - 1 && (
            <hr className="my-6 border-gray-300" />
          )}
        </div>
      ))}
    </div>
  );
}
