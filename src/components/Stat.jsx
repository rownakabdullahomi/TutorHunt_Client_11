import { useEffect, useState, useRef } from "react";
import axios from "axios";
import CountUp from "react-countup";

const Stat = () => {
  const [tutorsCount, setTutorsCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  // Fetch stats from the server
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const tutorResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/tutors/count`
        );
        setTutorsCount(tutorResponse.data.result);

        const reviewResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/tutors/reviews/count`
        );
        setReviewCount(reviewResponse.data.result);

        const categoriesResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/language_categories/count`
        );
        setCategoriesCount(categoriesResponse.data.result);

        const userResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/users/count`
        );
        setUsersCount(userResponse.data.result);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Intersection Observer to detect when the stats come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const stats = [
    {
      count: tutorsCount,
      label: "Experienced Tutors",
    },
    {
      count: reviewCount,
      label: "User Reviews",
    },
    {
      count: categoriesCount,
      label: "Languages Taught",
    },
    {
      count: usersCount,
      label: "Active Users",
    },
  ];

  return (
    <div ref={statsRef} className="bg-base-200 py-12 my-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <div key={index} className="stat-item">
            <h3 className="text-4xl font-bold text-primary">
              {isVisible ? (
                <CountUp
                  start={0}
                  end={stat.count > 0 ? stat.count - 1 : 0} // Ensure no negative value
                  duration={2}
                  suffix="+"
                />
              ) : (
                "0" // Show 0 if not in view
              )}
            </h3>
            <p className="text-lg text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stat;
