import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyTutorials = () => {
  const [tutorials, setTutorials] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/tutorials/${user?.email}`
        );
        setTutorials(data);
      } catch (error) {
        console.error("Error fetching tutorials:", error.message);
      }
    };

    fetchTutorials();
  }, [user?.email]);

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
          axios.delete(`${import.meta.env.VITE_API_URL}/delete_tutorial/${id}`);
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

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        My Tutorials
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial._id}
            className="card bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={tutorial.image}
              alt={tutorial.name}
              className="w-full h-48 object-contain m-4"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {tutorial.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Language:</strong> {tutorial.language}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Price:</strong> ${tutorial.price}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Review:</strong> {tutorial.review}
              </p>
              <p className="text-sm text-gray-700 mb-3">
                {tutorial.description}
              </p>
              <div className="flex justify-between items-center">
                <Link
                  to={`/update_tutorials/${tutorial._id}`}
                  className="btn btn-outline btn-sm text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(tutorial._id)}
                  className="btn btn-outline btn-sm text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTutorials;
