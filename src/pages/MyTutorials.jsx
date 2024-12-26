import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./Loading";
import { motion } from "framer-motion";
import { Fade, Zoom } from 'react-awesome-reveal';

const MyTutorials = () => {
  const axiosSecure = useAxiosSecure();
  const [tutorials, setTutorials] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const { data } = await axiosSecure.get(`/tutorials/${user?.email}`);
        setTutorials(data);
      } catch (error) {
        console.error("Error fetching tutorials:", error.message);
      }
    };

    fetchTutorials();
  }, [axiosSecure, user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/delete_tutorial/${id}`);
          setTutorials(tutorials.filter((tutorial) => tutorial._id !== id));
        } catch (error) {
          console.log("Failed to delete tutorial.", error.message);
        }
        Swal.fire({
          title: "Deleted!",
          text: "Your tutorial has been deleted.",
          icon: "success",
        });
      }
    });
  };

  if (!tutorials) {
    return <Loading />;
  }

  return (
    <div className="w-11/12 mx-auto my-8 p-6 bg-base-300 rounded-lg shadow-lg animate__animated animate__fadeIn animate__slower">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        <Fade duration={3000}>My Tutorials</Fade>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <motion.div
            key={tutorial._id}
            className="card bg-base-100 shadow-md rounded-lg overflow-hidden flex flex-col h-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Zoom>
              <img
                src={tutorial?.image}
                alt={tutorial?.name}
                className="w-full h-48 object-contain m-4"
              />
            </Zoom>
            <div className="p-4 flex-grow">
              <h3 className="text-xl font-semibold mb-2">
                <Fade>{tutorial?.name}</Fade>
              </h3>
              <p className="text-sm mb-1">
                <strong>Language:</strong> {tutorial?.language}
              </p>
              <p className="text-sm mb-1">
                <strong>Price:</strong> ${tutorial?.price}
              </p>
              <p className="text-sm mb-1">
                <strong>Review:</strong> {tutorial?.review}
              </p>
              <p className="text-sm text-gray-500 mt-2 flex-grow">
                {tutorial?.description.split(" ").slice(0, 50).join(" ")}
              </p>
            </div>
            <div className="p-4 flex justify-between items-center mt-auto">
              <Link
                to={`/update_tutorials/${tutorial._id}`}
                className="btn btn-outline btn-sm text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white"
              >
                Update
              </Link>
              <button
                onClick={() => handleDelete(tutorial?._id)}
                className="btn btn-outline btn-sm text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyTutorials;
