/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "../pages/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBookedTutorsCard = ({ tutorId }) => {
  const [bookedTutor, setBookedTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  // console.log(tutorId);

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/tutorial/${tutorId}`
        );
        setBookedTutor(data);
      } catch (error) {
        console.error("Error fetching tutor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorDetails();
    // setLoading(false);
  }, [axiosSecure, tutorId]);

  // console.log(bookedTutor);

  const handleReview = async (id) => {
    try {
      const response = await axiosSecure.patch(
        `/update_tutorial_review/${id}`
      );

      // console.log("Server Response:", response.data.modifiedCount);

      if (response.data.modifiedCount > 0) {
        toast.success("Review added successfully!");
        // Re-fetch updated tutors list
        const { data: updatedTutors } = await axiosSecure.get(
          `/tutorial/${tutorId}`
        );
        // console.log(updatedTutors);
        setBookedTutor(updatedTutors); // Sync state with latest data
      } else {
        toast.error(response.data.message || "Failed to add review.");
      }
    } catch (error) {
      // console.error("Error in handleReview:", error);
      toast.error("Failed to add review.", error.message);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (

        <div className="card bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <img
            src={bookedTutor?.image}
            alt={bookedTutor?.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{bookedTutor?.name}</h3>
          <p className="text-gray-700">
            <strong>Tutor Email:</strong> {bookedTutor?.email}
          </p>
          <p className="text-gray-700">
            <strong>Language:</strong> {bookedTutor?.language}
          </p>
          <p className="text-gray-700">
            <strong>Price:</strong> ${bookedTutor?.price}
          </p>
          <p className="text-gray-700">
            <strong>Email:</strong> {bookedTutor?.tutorEmail}
          </p>
          <p className="text-gray-700">
            <strong>Reviews:</strong> {bookedTutor?.review || 0}
          </p>
          <p className="text-gray-600 mt-2">
            {bookedTutor?.description.split(" ").slice(0, 3).join(" ")}...
          </p>
          <div className="mt-4 text-center">
            <button
              onClick={() => handleReview(bookedTutor._id)}
              className="btn btn-primary btn-sm"
            >
              Add Review
            </button>
          </div>
        </div>

  );
};

export default MyBookedTutorsCard;