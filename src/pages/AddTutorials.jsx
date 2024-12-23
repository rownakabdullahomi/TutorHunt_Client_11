import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddTutorials = () => {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/language_categories`
        );
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
      }
    };

    fetchCategories();
  }, []); // Runs only once when the component mounts

//   console.log(categories);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // Create FormData object
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.review = 0; // Default review value

    console.log("Submitted Data:", data);

    try {
      // 1. Make a POST request
      await axios.post(`${import.meta.env.VITE_API_URL}/add_tutorials`, data);

      // 2. Reset the form
      form.reset();

      // 3. Show toast and navigate
      toast.success("Data Added Successfully!!!");
      navigate("/my_tutorials");
    } catch (error) {
      //   console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg rounded-lg my-10">
      <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6 lg:mb-12">
        Add a New Tutorial
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* User Name */}
        <div>
          <label className="block font-medium mb-2 text-indigo-700">Name</label>
          <input
            type="text"
            name="name"
            value={user?.displayName || ""}
            className="input input-bordered w-full border-indigo-300 focus:border-indigo-500 bg-base-200 cursor-not-allowed"
            placeholder="Enter your name"
            required
            readOnly
          />
        </div>
        {/* User Email */}
        <div>
          <label className="block font-medium mb-2 text-indigo-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user?.email || ""}
            className="input input-bordered w-full border-indigo-300 focus:border-indigo-500 bg-base-200 cursor-not-allowed"
            placeholder="Enter your email"
            required
            readOnly
          />
        </div>
        {/* Image */}
        <div>
          <label className="block font-medium mb-2 text-indigo-700">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            className="input input-bordered w-full border-indigo-300 focus:border-indigo-500"
            placeholder="Enter tutorial image URL"
            required
          />
        </div>

        {/* Language */}
        <div>
          <label className="block font-medium mb-2 text-indigo-700">
            Language
          </label>
          <select
            name="language"
            className="select select-bordered w-full border-indigo-300 focus:border-indigo-500"
            required
          >
            <option value="">Select a language</option>
            {categories.map((category) => (
              <option key={category._id} value={category.value}>{category.value}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium mb-2 text-indigo-700">
            Price
          </label>
          <input
            type="number"
            name="price"
            className="input input-bordered w-full border-indigo-300 focus:border-indigo-500"
            placeholder="Enter price"
            required
          />
        </div>
        {/* Review */}
        <div>
          <label className="block font-medium mb-2 text-indigo-700">
            Review
          </label>
          <input
            type="number"
            name="review"

            className="input input-bordered w-full border-indigo-300 focus:border-indigo-500 bg-base-200 cursor-not-allowed"
            placeholder="0"
            readOnly
          />
        </div>
        {/* Description */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-2 text-indigo-700">
            Description
          </label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full border-indigo-300 focus:border-indigo-500"
            placeholder="Enter description"
            required
          ></textarea>
        </div>
        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            className="btn btn-primary btn-outline w-full btn-neutral"
          >
            Submit Tutorial
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTutorials;





