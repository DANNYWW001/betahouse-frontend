import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

import arrow from "../assets/arrow.png";
import connect from "../assets/connect.png";
import video from "../assets/video.png";
import image from "../assets/image.png";
import heart from "../assets/hearticon.png";
import share from "../assets/shareicon.png";
import bed from "../assets/bedroomicon.png";
import bath from "../assets/bathroomicon.png";

const formatPrice = (price, priceValue) => {
  if (
    typeof priceValue === "number" &&
    !Number.isNaN(priceValue) &&
    priceValue > 0
  ) {
    let duration = "";
    if (typeof price === "string" && price.includes("/")) {
      const parts = price.split("/");
      duration = parts[1]?.trim() || "";
    }

    const formattedAmount = "₦ " + priceValue.toLocaleString("en-NG");

    return duration ? `${formattedAmount} / ${duration}` : formattedAmount;
  }

  if (typeof price === "string") {
    const raw = price.trim();
    if (!raw) return "";

    const [amountPart, durationPart] = raw.split("/");

    const numericString = (amountPart || "").replace(/[^\d]/g, "");
    const numeric = Number(numericString);

    if (!Number.isNaN(numeric) && numeric > 0) {
      const formattedAmount = "₦ " + numeric.toLocaleString("en-NG");
      const duration = durationPart?.trim();

      return duration ? `${formattedAmount} / ${duration}` : formattedAmount;
    }

    return raw;
  }

  return "";
};

const PropertyList = ({ properties }) => {
  const safeProperties = Array.isArray(properties) ? properties : [];

  return (
    <>
      <div
        id="properties-section"
        className="layout max-w-[1240px] mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {safeProperties.map((property) => (
          <div
            key={property._id || property.id}
            className="rounded-2xl shadow-md overflow-hidden bg-white w-full"
          >
            <div className="relative h-56 w-full">
              <img
                src={property.image || "/placeholder.png"}
                alt={property.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute top-3 left-3 flex md:gap-52 gap-2">
                {(property.tags || []).map((tag, i) => (
                  <span
                    key={i}
                    className={`px-2 py-1 w-[96px] h-[36px] text-center rounded-[2.8px] ${
                      tag === "Featured"
                        ? "bg-[#3D9970] text-white"
                        : "bg-[#D3D3D3B2] text-white"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {property.featured && (
                <span className="absolute top-3 left-3 px-4 py-1 rounded-[4px] bg-[#3D9970] text-white text-sm font-semibold shadow">
                  Featured
                </span>
              )}

              {property.status && (
                <span className="absolute top-3 right-3 px-4 py-1 rounded-[4px] bg-[#D3D3D3B2] text-white text-sm font-semibold shadow">
                  {property.status}
                </span>
              )}

              <div className="absolute bottom-3 right-3 flex gap-2">
                <button className="p-2 bg-opacity-70 text-white rounded hover:bg-opacity-90">
                  <img src={connect} alt="connect" />
                </button>
                <button className="p-2 bg-opacity-70 text-white rounded hover:bg-opacity-90">
                  <img src={video} alt="video" />
                </button>
                <button className="p-2 bg-opacity-70 text-white rounded hover:bg-opacity-90">
                  <img src={image} alt="image" />
                </button>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">{property.title}</h3>

              <p className="text-sm text-gray-500 flex items-center gap-1">
                <FaMapMarkerAlt className="text-black" />
                {property.location}
              </p>

              <div className="flex gap-8 text-gray-600 text-sm mt-5 mb-6">
                <span className="flex items-center gap-1">
                  <img src={bed} alt="bedrooms" className="w-4 h-4" />
                  {property.bedrooms} Bedrooms
                </span>
                <span className="flex items-center gap-1">
                  <img src={bath} alt="bathrooms" className="w-4 h-4" />
                  {property.bathrooms} Bathrooms
                </span>
              </div>

              <div className="flex justify-between items-center border-t pt-3 mt-3 border-gray-300">
                <p className="text-black-600 font-bold">
                  {formatPrice(property.price, property.priceValue)}
                </p>

                <div className="flex gap-10 font-bold">
                  <button>
                    <img src={arrow} alt="arrow" className="w-4 h-4" />
                  </button>

                  <button className="text-gray-400 hover:text-blue-600">
                    <img src={share} alt="share" className="w-4 h-4" />
                  </button>

                  <button className="text-gray-400 hover:text-red-500">
                    <img src={heart} alt="favorite" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {safeProperties.length === 0 && (
        <p className="text-gray-500 text-center mt-6">No properties found.</p>
      )}
    </>
  );
};

export default PropertyList;
