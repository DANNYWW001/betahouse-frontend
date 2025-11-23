import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import PropertyForm from "../components/PropertyForm";
import PopularProperties from "../components/PopularProperties";
import Footer from "../components/Footer";
import axiosInstance from "../api/Axios";

const PropertiesView = () => {
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
    total: 0,
    totalPages: 1,
  });

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const res = await axiosInstance.get("/properties", {
          params: { page: 1, limit: 9 },
        });
        setProperties(res.data?.data || []);
        if (res.data?.pagination) {
          setPagination(res.data.pagination);
        }
      } catch (err) {
        console.error("Initial property load error:", err);
      }
    };

    fetchInitial();
  }, []);

  return (
    <>
      <Hero setProperties={setProperties} setPagination={setPagination} />

      <PropertyForm
        properties={properties}
        pagination={pagination}
        setProperties={setProperties}
        setPagination={setPagination}
      />

      <PopularProperties />
      <Footer />
    </>
  );
};

export default PropertiesView;
