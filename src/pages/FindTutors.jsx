import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import NoData from "../components/NoData";

const FindTutors = () => {
  const [searchText, setSearchText] = useState(""); // For search input

  // Fetch tutors using TanStack Query
  const { data: tutors, isLoading, isError, error } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/tutors`);
      return data; 
    },
  });

  // Filter tutors based on the search text
  const filteredTutors = tutors?.filter((tutor) =>
    tutor.language.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleReset = () => {
    setSearchText("");
  };

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
    <div className="w-11/12 mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Find Tutors
      </h2>

      {/* Search Input */}
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

      {/* Tutor Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTutors?.map((tutor) => (
          <div
            key={tutor._id}
            className="flex flex-col lg:flex-row bg-base-300 shadow-lg rounded-lg overflow-hidden"
          >
            {/* Tutor Image */}
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-full lg:w-1/3 object-contain rounded-lg m-4"
            />

            {/* Tutor Details */}
            <div className="p-4 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-indigo-700">
                  {tutor.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Email: {tutor.email}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Language: {tutor.language}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Review: {tutor.review}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Price: ${tutor.price}
                </p>
                <p className="text-gray-700 mt-3">
                  {tutor.description.split(" ").slice(0, 3).join(" ")}...
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4">
                <Link
                  to={`/tutor_details/${tutor._id}`}
                  className="btn btn-primary btn-sm w-full lg:w-auto"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show message if no tutors match */}
      {filteredTutors?.length === 0 && <NoData />}
    </div>
  );
};

export default FindTutors;
