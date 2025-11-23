
import React, { useEffect, useState } from "react";
import PropertyList from "./PropertyList";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import axiosInstance from "../api/Axios";

const LIMIT = 9; 

const PropertyForm = ({ properties: initial }) => {
  const [filters, setFilters] = useState({ location: "", bedrooms: "" });
  const [showFilter, setShowFilter] = useState(false);

  const [properties, setProperties] = useState(initial || []);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    page: 1,
    limit: LIMIT,
  });
  const [sort, setSort] = useState("Default");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { location, bedrooms } = filters;

  useEffect(() => {
    const fetchProps = async () => {
      setIsLoading(true);
      setError("");

      try {
        const res = await axiosInstance.get("/properties", {
          params: {
            location: location || undefined,
            beds: bedrooms || undefined,
            page,
            limit: LIMIT,
            sort: sort !== "Default" ? sort : undefined,
          },
        });

        const data = Array.isArray(res.data?.data) ? res.data.data : [];

        setProperties(data);

        if (res.data?.pagination) {
          const meta = res.data.pagination;
          setPagination({
            total: meta.total ?? data.length ?? 0,
            totalPages: meta.totalPages ?? 1,
            page: meta.page ?? page,
            limit: meta.limit ?? LIMIT,
          });
        } else {
          setPagination({
            total: data.length || 0,
            totalPages: 1,
            page: 1,
            limit: LIMIT,
          });
        }
      } catch (err) {
        console.error("Property fetch error:", err);
        setError(
          err.response?.data?.message ||
            "Unable to load properties right now. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProps();
  }, [location, bedrooms, page, sort]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1); 
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setPage(1);
  };

  const totalPages = pagination.totalPages || 1;
  const totalResults = pagination.total || properties.length;
  const currentPage = pagination.page || page;
  const currentLimit = pagination.limit || LIMIT;

  const from = totalResults === 0 ? 0 : (currentPage - 1) * currentLimit + 1;
  const to = (currentPage - 1) * currentLimit + properties.length;

  return (
    <div className="layout max-w-[1240px] mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-6 text-gray-700 gap-4">
        <div className="flex flex-col sm:flex-row text-black-900 items-center gap-4 w-full lg:w-auto">
          <button
            className="flex items-center font-[500] px-3 py-2 rounded-md text-sm"
            onClick={() => setShowFilter(!showFilter)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-1" /> More Filter
          </button>
          <p className="text-sm font-medium">
            Showing {from} – {to} of {totalResults} results
          </p>
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            className="rounded-md py-2 text-black-700 text-lg transition bg-transparent"
            value={sort}
            onChange={handleSortChange}
          >
            <option value="Default">Default</option>
            <option value="price-asc">Price (Low → High)</option>
            <option value="price-desc">Price (High → Low)</option>
          </select>
        </div>
      </div>
      {showFilter && (
        <div className="border rounded-md p-4 mb-6 bg-gray-50 shadow-sm flex text-black flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="location"
            placeholder="Enter location"
            value={filters.location}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded-md w-full sm:w-1/2"
          />

          <input
            type="number"
            name="bedrooms"
            min="0"
            placeholder="Min bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
            className="border px-3 py-2 rounded-md w-full sm:w-1/2"
          />
        </div>
      )}
      {error && (
        <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
      )}
      {isLoading ? (
        <p className="text-center text-gray-500 py-10">Loading properties...</p>
      ) : (
        <PropertyList properties={properties} />
      )}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="p-2 rounded disabled:opacity-30 text-[#4A5568]"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNumber = i + 1;
            const isActive = page === pageNumber;

            return (
              <button
                key={i}
                onClick={() => setPage(pageNumber)}
                className={`w-8 h-8 flex items-center justify-center rounded 
            text-[18px] font-semibold transition 
            ${
              isActive
                ? "bg-[#3D9970] text-white"
                : "text-[#4A5568] hover:text-[#3D9970]"
            }
          `}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* Next */}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="p-2 rounded disabled:opacity-30 text-[#4A5568]"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyForm;
