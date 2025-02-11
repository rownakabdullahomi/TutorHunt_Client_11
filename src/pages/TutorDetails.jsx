import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import Loading from "./Loading";
import useAxiosSecure from "../hooks/useAxiosSecure";
import ReactStars from "react-rating-stars-component";

const TutorDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [tutor, setTutor] = useState(null);
  const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchTutorDetails = async () => {
      try {
        const { data } = await axiosSecure.get(`/tutorial/${id}`);
        setTutor(data);
      } catch (error) {
        toast.error("Error fetching tutor details.");
      }
    };

    fetchTutorDetails();
  }, [axiosSecure, id]);

  useEffect(() => {
    if (!user) return;
    
    const checkBookingStatus = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/bookings?tutorId=${id}&userEmail=${user.email}`
        );
        setIsAlreadyBooked(data?.length > 0);
      } catch (error) {
        toast.error("Failed to validate booking.");
      }
    };

    checkBookingStatus();
  }, [axiosSecure, id, user]);

  const handleBook = async () => {
    if (tutor.email === user.email) {
      toast.error("You cannot book your own tutorial.");
      return;
    }

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
      await axiosSecure.post(`/bookings`, bookingDetails);
      toast.success("Tutor booked successfully!");
      setIsAlreadyBooked(true);
      navigate("/my_booked_tutors");
    } catch (error) {
      toast.error("Failed to book the tutor.", error);
    }
  };

  if (!tutor) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-200 shadow-lg rounded-lg my-10">
      <Helmet>
        <title>{tutor.name} | Tutor Details</title>
      </Helmet>

      <img
        src={tutor.image}
        alt={tutor.name}
        className="md:w-7/12 w-full mx-auto h-96 object-center rounded-lg mb-6"
      />

      <h2 className="text-3xl font-bold mb-4 text-indigo-700">{tutor.name}</h2>
      <p className="text-lg mb-2">
        <strong>Email:</strong> {tutor.email}
      </p>
      <p className="text-lg mb-2">
        <strong>Language:</strong> {tutor.language}
      </p>
      <p className="text-lg mb-2">
        <strong>Price:</strong> ${tutor.price}
      </p>

      {/* ⭐ Rating */}
      <p className="text-lg mb-2 flex items-center gap-1">
        <strong>Rating:</strong>
        <ReactStars
          count={5}
          value={tutor.review}
          size={24}
          activeColor="#ffd700"
          edit={false}
        />
        <span>({tutor.review}/5)</span>
      </p>

      <p className="text-lg mb-4">
        <strong>Description:</strong> {tutor.description}
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handleBook}
          className="btn btn-primary btn-lg btn-neutral btn-outline px-10 rounded-xl"
          disabled={isAlreadyBooked}
        >
          {isAlreadyBooked ? "Already Booked" : "Book Tutor"}
        </button>
        <button
          className="btn btn-secondary btn-lg btn-neutral btn-outline px-10 rounded-xl"
          onClick={() => navigate(-1)}
        >
          &larr; Back
        </button>
      </div>
    </div>
  );
};

export default TutorDetails;
