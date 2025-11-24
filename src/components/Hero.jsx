import React, { useState } from "react";
import axiosInstance from "../api/Axios";

const Hero = ({ setProperties, setPagination }) => {
  const [bedrooms, setBedrooms] = useState(""); 
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const increment = () => {
    setBedrooms((prev) => {
      if (prev === "") return 1; 
      return Number(prev) + 1;
    });
  };

  const decrement = () => {
    setBedrooms((prev) => {
      if (prev === "" || Number(prev) <= 0) return "";
      return Number(prev) - 1;
    });
  };

  const scrollToProperties = () => {
    const el = document.getElementById("properties-section");
    if (!el) return;

    const headerOffset = 80; 
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });
  };

 const handleSearch = async (e) => {
   e.preventDefault();
   setError("");
   setIsLoading(true);

   try {
     // Get values from state
     const loc = (location || "").trim(); // e.g. "Lagos"
     const type = (propertyType || "").trim(); // e.g. "apartment"
     const beds = bedrooms === "" ? "" : Number(bedrooms); // e.g. "3" -> 3

     // Build query params for backend
     const params = {
       page: 1,
       limit: 9, // or whatever you want per page
     };

     if (loc) params.location = loc;
     if (type) params.type = type;
     if (beds !== "" && !Number.isNaN(beds)) {
       params.bedrooms = beds; // matches backend `bedrooms`
     }

     const res = await axiosInstance.get("/properties", { params });

     const { data = [], pagination } = res.data || {};

     // Update state with API result
     if (setProperties) setProperties(data);

     if (setPagination && pagination) {
       setPagination({
         page: pagination.page,
         totalPages: pagination.totalPages,
         total: pagination.total,
         limit: pagination.limit,
       });
     }

     if (!data.length) {
       setError("No properties match your search. Try different filters.");
     } else {
       scrollToProperties();
     }
   } catch (err) {
     console.error("Hero search error:", err);
     setError("Unable to fetch properties. Try again.");
   } finally {
     setIsLoading(false);
   }
 };

  return (
    <div className="layout px-4">
      <div className="text-center text-white mt-[60px] lg:mt-[120px] lg:mb-[50px]">
        <h1 className="font-bold text-[32px] sm:text-[48px] lg:text-[68px] leading-tight">
          Browse Our Properties
        </h1>
        <p className="text-[16px] sm:text-[20px] lg:text-[26px] max-w-[784px] mx-auto mt-3">
          Find your perfect home among our curated properties.
        </p>

        {error && (
          <p className="text-red-400 text-sm mt-3 max-w-[500px] mx-auto">
            {error}
          </p>
        )}
      </div>

      <div className="bg-[#FFFFFF33] lg:h-[135px] px-5">
        <form
          onSubmit={handleSearch}
          className="flex flex-col lg:flex-row items-stretch lg:h-[85px] max-w-[1240px] mx-auto 
          w-full bg-white rounded-[10px] mt-8 lg:mt-16 
          text-black overflow-hidden shadow-md md:translate-y-[30%]"
        >
          <div className="flex-1 min-w-[250px] border-b lg:border-b-0 lg:border-r border-gray-300 p-3">
            <label className="font-semibold block mb-2 text-center text-sm tracking-[0.08em]">
              LOCATION
            </label>
            <input
              type="text"
              placeholder="eg. Lekki"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full outline-none placeholder:text-[#787878] text-center"
            />
          </div>

          <div className="flex-1 min-w-[250px] border-b lg:border-b-0 lg:border-r border-gray-300 p-3">
            <label className="font-semibold block mb-2 text-center text-sm tracking-[0.08em]">
              PROPERTY TYPE
            </label>
            <input
              type="text"
              placeholder="eg. Duplex, Villa"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full outline-none placeholder:text-[#787878] text-center"
            />
          </div>

          <div className="flex-1 min-w-[200px] border-b lg:border-b-0 border-gray-300 p-3">
            <label className="font-semibold block mb-2 text-center tracking-[0.08em]">
              BEDROOM
            </label>
            <div className="flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={decrement}
                className="w-8 h-8 flex items-center justify-center border rounded-full"
              >
                -
              </button>

              <span className="text-[15px] font-medium">
                {bedrooms === "" ? 0 : bedrooms}
              </span>

              <button
                type="button"
                onClick={increment}
                className="w-8 h-8 flex items-center justify-center border rounded-full"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full lg:w-[250px] bg-[#3D9970] hover:bg-[#2e7b5d] disabled:opacity-80 
            text-white font-semibold px-4 py-4 lg:py-0 text-[16px] transition"
          >
            {isLoading ? "Searching..." : "Find Property"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Hero;
