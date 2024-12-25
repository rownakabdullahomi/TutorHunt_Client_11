import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import MyBookedTutorsCard from "../components/MyBookedTutorsCard";
import Loading from "./Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyBookedTutors = () => {
  const { user } = useContext(AuthContext);
  const [bookedTutors, setBookedTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchBookedTutors = async () => {
      if (!user?.email) {
        setBookedTutors([]);
        setLoading(false);
        return;
      }

      try {
        const { data } = await axiosSecure.get(
          `/bookings?userEmail=${user.email}`
        );

        if (Array.isArray(data) && data.length > 0) {
          setBookedTutors(data);
        } else {
          setBookedTutors([]);
        }
      } catch (error) {
        toast.error("Failed to load booked tutors.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedTutors();
  }, [axiosSecure, user]);

  // Handle Loading State
  if (loading) {
    return <Loading></Loading>
  }

  // Handle Empty Booked Tutors State
  if (!bookedTutors || bookedTutors.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-bold text-center">My Booked Tutors</h2>
        <p className="text-center text-gray-600 mt-4">
          You haven&apos;t booked any tutors yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">My Booked Tutors</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookedTutors.map((bookedTutor) => (
          <MyBookedTutorsCard
            key={bookedTutor._id}
            tutorId={bookedTutor.tutorId}
          />
        ))}
      </div>
    </div>
  );
};

export default MyBookedTutors;
