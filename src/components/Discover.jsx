import { FaMapMarkerAlt, FaBed, FaBath } from "react-icons/fa";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import discover1 from "../assets/discover1.jpg";
import discover2 from "../assets/discover2.jpg";
import discover3 from "../assets/discover3.jpg";
import discover4 from "../assets/discover4.jpg";

const properties = [
  {
    id: 1,
    title: "Semi Detached Duplex",
    price: "₦ 1,430,000,000",
    bedrooms: 6,
    bathrooms: 3,
    size: "720 sq ft",
    location: "Victoria Island, Lagos",
  },
  {
    id: 2,
    title: "Special Duplex",
    price: "₦ 670,000,000",
    bedrooms: 6,
    bathrooms: 3,
    size: "720 sq ft",
    location: "Victoria Island, Lagos",
  },
  {
    id: 3,
    title: "Split-Level House",
    price: "₦ 340,000,000",
    bedrooms: 6,
    bathrooms: 3,
    size: "720 sq ft",
    location: "Victoria Island, Lagos",
  },
  {
    id: 4,
    title: "Twin Duplex",
    price: "₦ 290,000,000",
    bedrooms: 6,
    bathrooms: 3,
    size: "720 sq ft",
    location: "Victoria Island, Lagos",
  },
  {
    id: 5,
    title: "Luxury Apartment",
    price: "₦ 1,200,000,000",
    bedrooms: 6,
    bathrooms: 3,
    size: "720 sq ft",
    location: "Victoria Island, Lagos",
  },
  {
    id: 6,
    title: "Modern Villa",
    price: "₦ 2,500,000,000",
    bedrooms: 6,
    bathrooms: 3,
    size: "720 sq ft",
    location: "Victoria Island, Lagos",
  },
];

export default function PopularProperties() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; 

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? properties.length - itemsPerPage : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev >= properties.length - itemsPerPage ? 0 : prev + 1
    );
  };

  return (
    <div className=" layout max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">
        Discover Our Popular Properties
      </h2>

      <div className="relative flex items-center">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10  bg-[#F4F4F4] rounded-full shadow flex items-center justify-center w-10 h-10"
        >
          <FaArrowLeft color="[#555555]" className="text-xl" />
        </button>

        <div className="overflow-hidden w-full">
          <div
            className="flex gap-6 transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
              width: `${(properties.length / itemsPerPage) * 100}%`,
            }}
          >
            {properties.map((property) => (
              <div
                key={property.id}
                className="relative rounded-lg shadow-md w-64 shrink-0 overflow-hidden flex flex-col"
              >
                <img
                  src={
                    [discover1, discover2, discover3, discover4][
                      (property.id - 1) % 4
                    ]
                  }
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="p-4 space-y-2 flex-1 absolute bottom-0 left-0 right-0 bg-[#4a4a4c33] text-white">
                  <h3 className="font-semibold text-lg">{property.title}</h3>
                  <p className="text-white font-bold">{property.price}</p>
                  <p className="text-white text-sm flex items-center gap-2 flex-wrap">
                    <span>{property.bedrooms} Bed</span>
                    <span className="text-gray-400">|</span>
                    <span>{property.bathrooms} Bath</span>
                    <span className="text-gray-400">|</span>
                    <span>{property.size}</span>
                  </p>
                  <p className="text-sm text-white flex items-center gap-1">
                    <FaMapMarkerAlt className="text-black500" />
                    {property.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 bg-[#3D9970] rounded-full shadow flex items-center justify-center w-10 h-10"
        >
          <FaArrowRight color="white" className="text-xl" />
        </button>
      </div>
    </div>
  );
}
