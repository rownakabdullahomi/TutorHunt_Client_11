import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import NoData from "../components/NoData";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const FindTutors = () => {
  const [categoryWiseData, setCategoryWiseData] = useState(null);
  const [searchText, setSearchText] = useState(""); // For search input
  const [page, setPage] = useState(1); // Current page
  const [pageSize, setPageSize] = useState(6); // Page size
  const axiosSecure = useAxiosSecure();
  const { category } = useParams();

  useEffect(() => {
    const fetchCategoryWiseData = async () => {
      if (category) {
        try {
          const { data } = await axiosSecure.get(
            `/tutorial_categories/${category}`
          );
          setCategoryWiseData(data);
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        setCategoryWiseData(null); // Reset when no category
      }
    };

    fetchCategoryWiseData();
  }, [axiosSecure, category]);

  // Fetch all tutors using TanStack Query
  const {
    data: allTutors,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tutors`);
      return data;
    },
  });

  // Determine the data source (categoryWiseData or allTutors)
  const tutorsToDisplay = category ? categoryWiseData : allTutors;

  // Filter tutors based on the search text
  const filteredTutors = tutorsToDisplay?.filter((tutor) =>
    tutor.language.toLowerCase().includes(searchText.toLowerCase())
  );

  // Paginate the filtered tutors
  const startIndex = (page - 1) * pageSize;
  const paginatedTutors = filteredTutors?.slice(
    startIndex,
    startIndex + pageSize
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleReset = () => {
    setSearchText("");
    setPage(1); // Reset to first page on reset
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setPage(1); // Reset to first page on page size change
  };

  // Calculate total pages
  const totalPages = Math.ceil((filteredTutors?.length || 0) / pageSize);

  // Create page numbers array
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // Render loading state
  if (isLoading) {
    return <Loading />;
  }

  // Render error state
  if (isError) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  // Render the main content
  return (
    <div className="px-4 lg:px-6">
      <Helmet>
        <title>Find Tutors | TutorHunt</title>
      </Helmet>

      <Zoom duration={2000}>
        <h2 className="text-3xl font-bold text-center text-primary my-10">
          {category ? `${category} Tutors` : "Find Tutors"}
        </h2>
      </Zoom>

      <Fade duration={1500}>
        <div className="mb-6 flex items-center justify-center space-x-4">
          <input
            type="text"
            value={searchText}
            onChange={handleSearch}
            placeholder="Search by language..."
            className="input input-bordered w-full lg:w-1/3"
          />
          <button
            onClick={handleReset}
            className="px-4 py-3 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium shadow-sm transition duration-300 ease-in-out"
          >
            Reset
          </button>
        </div>
      </Fade>

      <Slide direction="left" duration={1000}>
        {/* Page Size Dropdown */}
        <div className="mb-6 flex items-center justify-end space-x-4">
          <label htmlFor="pageSize" className=" font-semibold">
            Page Size:
          </label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="select select-bordered"
          >
            <option value={6} className="rounded-lg">6</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
        </div>
      </Slide>

      {/* React Framer Motion animation in cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {paginatedTutors?.map((tutor) => (
          <motion.div
            key={tutor._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            whileHover={{
              scale: 1.03,
              boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col bg-base-200 shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-primary">
                  {tutor.name}
                </h3>
                <p className="text-sm mt-1">Email: {tutor.email}</p>
                <p className="text-sm mt-1">Language: {tutor.language}</p>
                <p className="text-sm mt-1">Review: {tutor.review}</p>
                <p className="text-sm mt-1">Price: ${tutor.price}</p>
                <p className="text-gray-600 mt-3">
                  {tutor.description.split(" ").slice(0, 3).join(" ")}...
                </p>
              </div>
              <div className="mt-4">
                <Link
                  to={`/tutor_details/${tutor._id}`}
                  className="btn btn-primary btn-outline btn-sm w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show message if no tutors match */}
      {filteredTutors?.length === 0 && <NoData />}

      <Fade duration={1500}>
        <div
          className="my-10 flex flex-wrap justify-center items-center space-x-2"
          style={{ gap: "0.5rem" }}
        >
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="btn btn-outline btn-sm"
          >
            Previous
          </button>
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`btn btn-sm ${
                pageNumber === page ? "btn-secondary text-white" : "btn-outline"
              }`}
            >
              {pageNumber}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="btn btn-outline btn-sm"
          >
            Next
          </button>
        </div>
      </Fade>
    </div>
  );
};

export default FindTutors;
