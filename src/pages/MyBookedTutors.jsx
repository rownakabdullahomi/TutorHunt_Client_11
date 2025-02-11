import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import MyBookedTutorsCard from "../components/MyBookedTutorsCard";
import Loading from "./Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Slide } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import NoData from "../components/NoData";

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
    return <Loading></Loading>;
  }

  // Handle Empty Booked Tutors State
  if (!bookedTutors || bookedTutors.length === 0) {
    return (
      <NoData></NoData>
    );
  }

  return (
    <div className="px-4 lg:px-6 mb-10">
      <Helmet>
        <title>My Booked Tutors | TutorHunt</title>
      </Helmet>

      <Slide cascade direction="right" duration={2000}>
        <h2 className="text-3xl font-bold my-10 text-center">
          My Booked Tutors
        </h2>
      </Slide>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
