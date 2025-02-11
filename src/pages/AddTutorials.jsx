import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal"; // React Awesome Reveal for fade effects
import { Helmet } from "react-helmet-async";

const AddTutorials = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosSecure.get(`/language_categories`);
        setCategories(data);
      } catch (error) {
        toast.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, [axiosSecure]); // Runs only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Create FormData object
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.review = 0; // Default review value

    try {
      // 1. Make a POST request
      await axiosSecure.post(`/add_tutorial`, data);

      // 2. Reset the form
      form.reset();

      // 3. Show toast and navigate
      toast.success("Data Added Successfully!!!");
      navigate("/my_tutorials");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className=" bg-base-200 py-10">
      <Helmet>
        <title>Add Tutorials | TutorHunt</title>
      </Helmet>

      <div className="max-w-4xl mx-auto shadow-lg rounded-lg py-10 px-6">
        <Fade triggerOnce>
          <h2 className="text-3xl font-bold text-center  mb-6 lg:mb-12">
            Add a New Tutorial
          </h2>
        </Fade>
        <motion.form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* User Name */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <label className="block font-medium mb-2 ">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user?.displayName || ""}
              className="input input-bordered w-full focus:border-indigo-500 bg-base-200 cursor-not-allowed"
              placeholder="Enter your name"
              required
              readOnly
            />
          </motion.div>

          {/* User Email */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <label className="block font-medium mb-2 ">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              className="input input-bordered w-full focus:border-indigo-500 bg-base-200 cursor-not-allowed"
              placeholder="Enter your email"
              required
              readOnly
            />
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <label className="block font-medium mb-2 ">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              className="input input-bordered w-full focus:border-indigo-500"
              placeholder="Enter tutorial image URL"
              required
            />
          </motion.div>

          {/* Language */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <label className="block font-medium mb-2 ">
              Language
            </label>
            <select
              name="language"
              className="select select-bordered w-full focus:border-indigo-500"
              required
            >
              <option value="">Select a language</option>
              {categories.map((category) => (
                <option key={category._id} value={category.value}>
                  {category.value}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Price */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <label className="block font-medium mb-2 ">
              Price
            </label>
            <input
              type="number"
              name="price"
              className="input input-bordered w-full focus:border-indigo-500"
              placeholder="Enter price"
              required
            />
          </motion.div>

          {/* Review */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <label className="block font-medium mb-2 ">
              Review
            </label>
            <input
              type="number"
              name="review"
              className="input input-bordered w-full focus:border-indigo-500 bg-base-200 cursor-not-allowed"
              placeholder="0"
              readOnly
            />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="md:col-span-2"
          >
            <label className="block font-medium mb-2 ">
              Description
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full focus:border-indigo-500"
              placeholder="Enter description"
              required
            ></textarea>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="md:col-span-2"
          >
            <button
              type="submit"
              className="btn btn-primary btn-outline w-full btn-neutral"
            >
              Submit Tutorial
            </button>
          </motion.div>
        </motion.form>
      </div>
    </div>
  );
};

export default AddTutorials;
