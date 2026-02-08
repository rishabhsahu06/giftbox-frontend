import React, { useEffect, useState, useCallback } from "react";
import { getAllhampers } from "../../api/hamper.api";
import HamperCard from "./HamperCard";

const HampersPage = () => {
  const [hampers, setHampers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  });

  const [filters, setFilters] = useState({
    sort: "new-arrival",
  });

  /* ================= FETCH ================= */
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = {
        page: pagination.currentPage,
        limit: pagination.limit,
        sort: filters.sort,
      };

      const response = await getAllhampers(queryParams);

      if (response?.data) {
        setHampers(response.data.hampers || []);
        setPagination((prev) => ({
          ...prev,
          totalPages: response.data.totalPages || 1,
          currentPage: response.data.currentPage || 1,
        }));
      }
    } catch (err) {
      setError("Failed to load hampers. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [pagination.currentPage, pagination.limit, filters.sort]);

  /* ================= EFFECT ================= */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: newPage,
      }));
    }
  };

  return (
    <div className="bg-gray-50 p-6 md:p-10">
      <div className="md:p-10 mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Our Exclusive Hampers
          </h1>

          <div className="flex gap-4">
            <select
              className="border p-2 rounded-lg bg-white shadow-sm"
              value={filters.sort}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sort: e.target.value,
                }))
              }
            >
              <option value="new-arrival">New Arrivals</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center text-red-500 py-10 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <>
            {hampers.length === 0 ? (
              <div className="text-center text-gray-500 text-lg py-20">
                No hampers found matching your criteria.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
                {hampers.map((hamper) => (
                  <HamperCard key={hamper?._id} hamper={hamper} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination?.totalPages > 1 && (
              <div className="flex justify-center mt-10 gap-4">
                <button
                  onClick={() =>
                    handlePageChange(pagination.currentPage - 1)
                  }
                  disabled={pagination.currentPage === 1}
                  className="px-4 py-2 border rounded bg-white disabled:opacity-50 hover:bg-gray-100"
                >
                  Previous
                </button>
                <span className="px-4 py-2 bg-white border rounded">
                  Page {pagination.currentPage} of{" "}
                  {pagination.totalPages}
                </span>
                <button
                  onClick={() =>
                    handlePageChange(pagination.currentPage + 1)
                  }
                  disabled={
                    pagination.currentPage === pagination.totalPages
                  }
                  className="px-4 py-2 border rounded bg-white disabled:opacity-50 hover:bg-gray-100"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HampersPage;