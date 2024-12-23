import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FindTutors = () => {
  const [tutors, setTutors] = useState([]);


  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/tutors`
        );
        setTutors(data); // Assuming the response is an array of tutor objects
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };
    fetchTutors();
  }, []);

  // console.log(tutors);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Find Tutors
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tutors.map((tutor) => (
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
                <Link to={`/tutor_details/${tutor._id}`}
                  className="btn btn-primary btn-sm w-full lg:w-auto"
                  
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindTutors;
