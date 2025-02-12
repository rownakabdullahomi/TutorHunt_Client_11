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
    <div className="px-4 lg:px-6 py-10 p-6 bg-base-100 animate__animated animate__fadeIn animate__slower">
      <Helmet>
        <title>My Tutorials | TutorHunt</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center text-primary mb-10">
        <Fade duration={3000}>My Tutorials</Fade>
      </h2>

      {tutorials.length === 0 ? (
        <NoData></NoData>
      ) : (
        <div className="overflow-x-auto scrollbar-hide rounded-lg">
          <table className="table w-full border-collapse border-2 border-base-300">
            <thead>
              <tr className="bg-base-300 text-primary md:text-lg">
                <th className="lg:p-4 text-center">#</th>
                <th className="lg:p-4 text-center">Image</th>
                <th className="lg:p-4 text-center">Name</th>
                <th className="lg:p-4 text-center">Language</th>
                <th className="lg:p-4 text-center">Review</th>
                <th className="lg:p-4 text-center">Price</th>
                <th className="lg:p-4 text-center">Description</th>
                <th className="lg:p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tutorials.map((tutorial, index) => (
                <tr
                  key={tutorial._id}
                  className="hover:bg-gray-200 hover:text-black md:text-lg text-center"
                >
                  <td className="lg:p-4 align-middle">{index + 1}</td>
                  <td className="lg:p-4 align-middle">
                    <Zoom duration={2000}>
                      <img
                        src={tutorial?.image}
                        alt={tutorial?.name}
                        className="h-16 md:min-w-20 md:h-20 min-w-16 object-cover rounded-lg mx-auto"
                      />
                    </Zoom>
                  </td>
                  <td className="lg:p-4 align-middle">{tutorial?.name}</td>
                  <td className="lg:p-4 align-middle">{tutorial?.language}</td>
                  <td className="lg:p-4 align-middle">${tutorial?.price}</td>
                  <td className="lg:p-4 align-middle">{tutorial?.review}</td>
                  <td className="lg:p-4 align-middle text-start">
                    {tutorial?.description.split(" ").slice(0, 5).join(" ")}...
                  </td>
                  <td className="p-4 align-middle">
                    <div className="flex items-center space-x-2">
                      <Link
                        to={`/update_tutorials/${tutorial._id}`}
                        className="btn btn-outline btn-sm btn-primary hover:!text-white"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(tutorial._id)}
                        className="btn btn-outline btn-sm btn-secondary hover:!text-white"
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
