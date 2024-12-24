import { useEffect, useState } from "react";
import axios from "axios";

const Stat = () => {
  const [tutorsCount, setTutorsCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);

  // Fetch tutors count and review count from the server
  useEffect(() => {
    const fetchStats = async () => {
      // Fetch tutors count
      const tutorResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/tutors/count`
      );
      setTutorsCount(tutorResponse.data.result);

      // Fetch total review count
      const reviewResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/tutors/reviews/count`
      );
      // console.log(reviewResponse);
      setReviewCount(reviewResponse.data.result);

      // Fetch Categories count
      const categoriesResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/language_categories/count`
      );
      setCategoriesCount(categoriesResponse.data.result);

      // Fetch users count
      const userResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/count`
      );
      setUsersCount(userResponse.data.result);
    };

    fetchStats();
  }, []);

  // Static data for other columns
  const stats = [
    {
      count: `${tutorsCount - 1}+`,
      label: "Experienced Tutors",
    },
    {
      count: `${reviewCount - 1}+`,
      label: "User Reviews",
    },
    {
      count: `${categoriesCount - 1}+`,
      label: "Languages Taught",
    },
    {
      count: `${usersCount - 1}+`,
      label: "Active Users",
    },
  ];

  return (
    <div className="bg-base-200 py-12 my-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <h3 className="text-4xl font-bold text-primary">{stat.count}</h3>
            <p className="text-lg text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stat;
