import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FindTutors = () => {
  const [tutors, setTutors] = useState([]);
  const [searchText, setSearchText] = useState(""); // For search input
  const [filteredTutors, setFilteredTutors] = useState([]); // To store filtered results

  // Fetch tutors from the server
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/tutors`
        );
        setTutors(data); // Assuming the response is an array of tutor objects
        setFilteredTutors(data); // Initially, all tutors are displayed
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };
    fetchTutors();
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);

    // Filter tutors based on whether the search term is anywhere in the language name
    const filtered = tutors.filter((tutor) =>
      tutor.language.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTutors(filtered);
  };

  const handleReset = () => {
    setSearchText("");
    setFilteredTutors(tutors);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
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
        {filteredTutors.map((tutor) => (
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
      {filteredTutors.length === 0 && (
        <p className="text-center text-gray-600 mt-6">
          No tutors found matching your search.
        </p>
      )}
    </div>
  );
};

export default FindTutors;
