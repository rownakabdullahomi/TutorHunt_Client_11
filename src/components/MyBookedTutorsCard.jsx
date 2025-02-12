/* eslint-disable react/prop-types */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../pages/Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import NoData from "./NoData";
import { motion } from "framer-motion";

const MyBookedTutorsCard = ({ tutorId }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetching the tutor details using the object-based API
  const {
    data: bookedTutor,
    isLoading,
    isError,
    error,
  } = useQuery({
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
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ scale: 1.03, boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)" }}
      whileTap={{ scale: 0.97 }}
      className="shadow-md bg-base-100 rounded-lg overflow-hidden flex flex-col"
    >
      <img
        src={bookedTutor?.image}
        alt={bookedTutor?.name}
        className="w-full object-cover rounded-t-lg"
      />

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl font-extrabold">{bookedTutor?.name}</h3>
          <p className="mt-1 font-semibold">
            <strong>Email:</strong> {bookedTutor?.email}
          </p>
          <p className="mt-1 font-semibold">
            <strong>Language:</strong> {bookedTutor?.language}
          </p>
          <p className="font-bold mt-1 text-primary">
            <strong>Price:</strong> ${bookedTutor?.price}
          </p>

          {/* Short description */}
          <p className="text-gray-600 mt-2">
            {bookedTutor?.description.split(" ").slice(0, 8).join(" ")}...
          </p>
        </div>

        {/* Button at the bottom */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleReview}
            className="btn btn-primary btn-outline btn-sm w-full hover:!text-white"
            disabled={reviewMutation.isLoading}
          >
            {reviewMutation.isLoading ? "Adding Review..." : "Add Review"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MyBookedTutorsCard;
