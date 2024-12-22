import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import Loading from "./Loading";

const TutorDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [tutor, setTutor] = useState(null);
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/tutorial/${id}`
        );
        setTutor(data);
      } catch (error) {
        console.error("Error fetching tutor details:", error);
      }
    };

    fetchTutorDetails();
  }, [id]);



  // Check if the tutor is already booked by the user
  useEffect(() => {
    const checkBookingStatus = async () => {
      try {
        console.log(id, user?.email);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/bookings?tutorId=${id}&userEmail=${user.email}`
        );
        console.log(data);
        setIsAlreadyBooked(data?.length > 0); // If booking exists, flag it
      } catch (error) {
        console.error(error);
        toast.error("Failed to validate booking.");
      }
    };

    if (user) checkBookingStatus();
  }, [id, user]);

  const handleBook = async () => {

        // Check if the user is trying to book their own tutorial
        if (tutor.email === user.email) {
            toast.error("You cannot book your own tutorial.");
            return;
          }
      
          // Check if the tutor is already booked by the current user
          if (isAlreadyBooked) {
            toast.error("You have already booked this tutor.");
            return;
          }


    const bookingDetails = {
      tutorId: tutor._id,
      image: tutor.image,
      language: tutor.language,
      price: tutor.price,
      tutorEmail: tutor.email,
      userEmail: user.email,
    };

    

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/bookings`,
        bookingDetails
      );
      toast.success("Tutor booked successfully!");
      setIsAlreadyBooked(true)
      navigate("/my_booked_tutors");
    } catch (error) {
      console.error("Error booking tutor:", error);
      toast.error("Failed to book the tutor.");
    }
  };

  if (!tutor) {
    return <Loading></Loading>;
  }

//   Check if user and tutor is the same person? if yes then book button should be disabled
//   const isBookDisabled = user?.email === tutor.email;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg rounded-lg my-10">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        <img
          src={tutor.image}
          alt={tutor.name}
          className="w-48 h-48 rounded-lg p-4 object-contain border-2 border-indigo-500"
        />
        <div>
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">
            {tutor.name}
          </h2>
          <p className="text-lg text-gray-700">Language: {tutor.language}</p>
          <p className="text-lg text-gray-700">Price: ${tutor.price}</p>
          <p className="text-lg text-gray-700">Review: {tutor.review}</p>
          <p className="text-gray-600 mt-4">{tutor.description}</p>
        </div>
      </div>
      <div className="mt-6 text-center space-x-5">
        {/* <Link
          to={"/my_booked_tutors"}
          onClick={handleBook}
          className={`btn ${
            isBookDisabled ? "btn-disabled" : "btn-primary"
          } btn-lg btn-neutral btn-outline px-10 rounded-xl`}
        >
          Book Tutor
        </Link> */}
        <button
          onClick={handleBook}
          className={`btn btn-primary btn-lg btn-neutral btn-outline px-10 rounded-xl`}
        >
          Book Tutor
        </button>
        {/* Back Button */}
        <button
          className="btn btn-secondary btn-lg btn-neutral btn-outline px-10 rounded-xl"
          onClick={() => navigate(-1)} // Navigate to the previous page
        >
          &larr; Back
        </button>
      </div>
    </div>
  );
};

export default TutorDetails;
