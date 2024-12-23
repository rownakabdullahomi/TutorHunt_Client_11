import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import MyBookedTutorsCard from "../components/MyBookedTutorsCard";
// import Loading from "./Loading";

const MyBookedTutors = () => {
  const { user } = useContext(AuthContext);
  const [bookedTutors, setBookedTutors] = useState([]);

  useEffect(() => {
    const fetchBookedTutors = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/bookings?userEmail=${user.email}`
        );
        setBookedTutors(data);
      } catch (error) {
        console.error("Error fetching booked tutors:", error);
        toast.error("Failed to load booked tutors.");
      }
    };

    fetchBookedTutors();
  }, [user]);

//   const tutorIds = bookedTutors.map((item) => item.tutorId);
//   console.log(tutorIds);

  //   console.log(bookedTutors);

  return (
    <div>
      {bookedTutors.map((bookedTutor) => (
        <MyBookedTutorsCard
          key={bookedTutor._id}
          tutorId={bookedTutor.tutorId}
        ></MyBookedTutorsCard>
      ))}
    </div>
  );
};

export default MyBookedTutors;
