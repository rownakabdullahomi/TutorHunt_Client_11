import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "./Loading";
import { Fade, Zoom } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";
import NoData from "../components/NoData";

const MyTutorials = () => {
  const axiosSecure = useAxiosSecure();
  const [tutorials, setTutorials] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const { data } = await axiosSecure.get(`/tutorials/${user?.email}`);
        setTutorials(data);
      } catch (error) {
        console.error("Error fetching tutorials:", error.message);
      } finally {
        setLoading(false);
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/delete_tutorial/${id}`);
          setTutorials(tutorials.filter((tutorial) => tutorial._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Your tutorial has been deleted.",
            icon: "success",
          });
        } catch (error) {
          console.error("Failed to delete tutorial.", error.message);
        }
      }
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-11/12 mx-auto my-8 p-6 bg-base-300 rounded-lg shadow-lg animate__animated animate__fadeIn animate__slower">
      <Helmet>
        <title>My Tutorials | TutorHunt</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        <Fade duration={3000}>My Tutorials</Fade>
      </h2>

      {tutorials.length === 0 ? (
        <NoData></NoData>
      ) : (
        <div className="overflow-x-auto scrollbar-hide rounded-lg">
          <table className="table w-full border-collapse border-2 border-gray-300">
            <thead>
              <tr className="bg-indigo-700 text-white">
                <th className="p-4 text-left">#</th>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Language</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Review</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.map((tutorial, index) => (
                <tr key={tutorial._id} className="hover:bg-gray-100">
                  <td className="p-4 align-middle">{index + 1}</td>
                  <td className="p-4 align-middle">
                    <Zoom duration={2000}>
                      <img
                        src={tutorial?.image}
                        alt={tutorial?.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    </Zoom>
                  </td>
                  <td className="p-4 align-middle">{tutorial?.name}</td>
                  <td className="p-4 align-middle">{tutorial?.language}</td>
                  <td className="p-4 align-middle">${tutorial?.price}</td>
                  <td className="p-4 align-middle">{tutorial?.review}</td>
                  <td className="p-4 align-middle">
                    {tutorial?.description.split(" ").slice(0, 20).join(" ")}...
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center space-x-2">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyTutorials;
