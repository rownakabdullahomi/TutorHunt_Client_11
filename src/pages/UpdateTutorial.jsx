import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Fade, Slide } from "react-awesome-reveal";

const UpdateTutorial = () => {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosSecure.get(`/language_categories`);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, [axiosSecure]);

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const { data } = await axiosSecure.get(`/tutorial/${id}`);
        setTutorial(data);
      } catch (error) {
        toast.error("Failed to fetch tutorial details.", error.message);
      }
    };

    fetchTutorial();
  }, [axiosSecure, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedData = Object.fromEntries(formData.entries());

    try {
      await axiosSecure.patch(`/update_tutorial/${id}`, updatedData);
      toast.success("Tutorial updated successfully!");
      navigate("/my_tutorials");
    } catch (error) {
      toast.error("Failed to update tutorial.", error.message);
    }
  };

  if (!tutorial) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-300 shadow-lg rounded-lg my-10">
      <Fade duration={3000}>
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Update Tutorial
        </h2>
      </Fade>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-grow">
          <Slide direction="left" triggerOnce>
            <div>
              <label className="block font-medium mb-2 text-indigo-700">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={tutorial.name}
                className="input input-bordered w-full border-indigo-300 focus:border-indigo-500"
                readOnly
              />
            </div>
          </Slide>
          <Slide direction="right" triggerOnce>
            <div>
              <label className="block font-medium mb-2 text-indigo-700">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={tutorial.email}
                className="input input-bordered w-full border-indigo-300 focus:border-indigo-500"
                readOnly
              />
            </div>
          </Slide>
          <Slide direction="left" triggerOnce>
            <div>
              <label className="block font-medium mb-2 text-indigo-700">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                defaultValue={tutorial.image}
                className="input input-bordered w-full border-indigo-300 focus:border-indigo-500"
                required
              />
            </div>
          </Slide>
          <Slide direction="right" triggerOnce>
            <div>
              <label className="block font-medium mb-2 text-indigo-700">
                Language
              </label>
              <select
                name="language"
                defaultValue={tutorial.language}
                className="select select-bordered w-full border-indigo-300 focus:border-indigo-500"
                required
              >
                {categories.map((category) => (
                  <option key={category._id} value={category.value}>
                    {category.value}
                  </option>
                ))}
              </select>
            </div>
          </Slide>
          <Slide direction="left" triggerOnce>
            <div>
              <label className="block font-medium mb-2 text-indigo-700">Price</label>
              <input
                type="number"
                name="price"
                defaultValue={tutorial.price}
                className="input input-bordered w-full border-indigo-300 focus:border-indigo-500"
                required
              />
            </div>
          </Slide>
          <Slide direction="right" triggerOnce>
            <div>
              <label className="block font-medium mb-2 text-indigo-700">
                Review
              </label>
              <input
                type="number"
                name="review"
                defaultValue={tutorial.review}
                className="input input-bordered w-full border-indigo-300 focus:border-indigo-500 bg-gray-100"
                readOnly
              />
            </div>
          </Slide>
          {/* Description */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-2 text-indigo-700">
            Description
          </label>
          <textarea
            name="description"
            defaultValue={tutorial.description}
            className="mb-2 textarea textarea-bordered w-full border-indigo-300 focus:border-indigo-500"
            required
          ></textarea>
        </div>
        </div>
        <Fade triggerOnce>
          <div className="flex-grow flex items-end">
            <button
              type="submit"
              className="btn btn-primary btn-outline w-full btn-neutral"
            >
              Update Tutorial
            </button>
          </div>
        </Fade>
      </form>
    </div>
  );
};

export default UpdateTutorial;
