/* eslint-disable react/prop-types */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../pages/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import NoData from "./NoData";
import { Zoom } from "react-awesome-reveal";
import { motion } from "framer-motion";

const MyBookedTutorsCard = ({ tutorId }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetching the tutor details using the object-based API
  const { data: bookedTutor, isLoading, isError, error } = useQuery({
    queryKey: ["bookedTutor", tutorId],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tutorial/${tutorId}`);
      return data;
    },
    enabled: !!tutorId, // Run the query only if tutorId exists
  });

  // Mutation for adding a review
  const reviewMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.patch(`/update_tutorial_review/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        toast.success("Review added successfully!");
        queryClient.invalidateQueries({ queryKey: ["bookedTutor", tutorId] }); // Refresh data
      } else {
        toast.error(data.message || "Failed to add review.");
      }
    },
    onError: (error) => {
      toast.error(`Failed to add review: ${error.message}`);
    },
  });

  const handleReview = () => {
    if (bookedTutor?._id) {
      reviewMutation.mutate(bookedTutor._id);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (!bookedTutor) {
    return <NoData />;
  }

  return (

      <div className="card shadow-md bg-base-100 rounded-lg p-4 border border-gray-200 flex flex-col min-h-[400px]">
        <Zoom duration={3000}>
          <div className="flex-grow">
            <img
              src={bookedTutor?.image}
              alt={bookedTutor?.name}
              className="w-full h-32 object-cover rounded-md mb-4"
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
              <strong>Tutor Email:</strong> {bookedTutor?.tutorEmail}
            </p>
            <p className="text-gray-700">
              <strong>Reviews:</strong> {bookedTutor?.review || 0}
            </p>
            <p className="text-gray-600 my-1">
              {bookedTutor?.description.split(" ").slice(0, 3).join(" ")}...
            </p>
          </div>
        </Zoom>
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReview}
            className="btn btn-primary btn-sm mt-1"
            disabled={reviewMutation.isLoading}
          >
            {reviewMutation.isLoading ? "Adding Review..." : "Add Review"}
          </motion.button>
        </div>
      </div>
  );
};

export default MyBookedTutorsCard;
