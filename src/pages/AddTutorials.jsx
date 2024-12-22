import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const AddTutorials = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data.review = 0; // Default review value
    console.log("Submitted Data:", data.name);
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
            className="input input-bordered w-full border-indigo-300 focus:border-indigo-500 bg-gray-100 cursor-not-allowed"
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
            className="input input-bordered w-full border-indigo-300 focus:border-indigo-500 bg-gray-100 cursor-not-allowed"
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
            type="text"
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
            <option value="English">English tutors</option>
            <option value="Spanish">Spanish tutors</option>
            <option value="French">French tutors</option>
            <option value="German">German tutors</option>
            <option value="Italian">Italian tutors</option>
            <option value="Chinese">Chinese tutors</option>
            <option value="Arabic">Arabic tutors</option>
            <option value="Japanese">Japanese tutors</option>
            <option value="Portuguese">Portuguese tutors</option>
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
            value="0"
            className="input input-bordered w-full border-indigo-300 focus:border-indigo-500 bg-gray-100 cursor-not-allowed"
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
            className="btn btn-primary btn-outline w-full bg-indigo-600 text-white hover:bg-indigo-700 border-none"
          >
            Submit Tutorial
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTutorials;
