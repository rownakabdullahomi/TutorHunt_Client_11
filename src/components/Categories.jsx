import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaArchway, FaLandmark, FaRegBuilding } from "react-icons/fa6";
import { BsBuildings } from "react-icons/bs";
import { PiBuildingApartmentBold, PiBuildingOfficeBold } from "react-icons/pi";
import {
  TbBuildingBank,
  TbBuildingCastle,
  TbBuildingMosque,
} from "react-icons/tb";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/language_categories_with_counts`
        );
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories with counts:", error);
      }
    };

    fetchCategories();
  }, []);

//   console.log(categories);

  const icons = {
    English: <FaLandmark className="w-12 h-12"></FaLandmark>,
    Spanish: <FaArchway className="w-12 h-12"></FaArchway>,
    French: <FaRegBuilding className="w-12 h-12"></FaRegBuilding>,
    German: <BsBuildings className="w-12 h-12"></BsBuildings>,
    Italian: (
      <PiBuildingApartmentBold className="w-12 h-12"></PiBuildingApartmentBold>
    ),
    Chinese: (
      <PiBuildingOfficeBold className="w-12 h-12"></PiBuildingOfficeBold>
    ),
    Arabic: <TbBuildingMosque className="w-12 h-12"></TbBuildingMosque>,
    Japanese: <TbBuildingCastle className="w-12 h-12"></TbBuildingCastle>,
    Portuguese: <TbBuildingBank className="w-12 h-12"></TbBuildingBank>,
  };

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl font-bold text-center my-8">
        Language Categories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            to={`/find-tutors`}
            key={category._id}
            className="cursor-pointer bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* <FaLandmark className="w-12 h-12"></FaLandmark> */}
                {/* Icons for each language */}
                {icons[category.language]}
                <div>
                  <h3 className="text-xl font-semibold">
                    {category.language} tutors
                  </h3>
                  <p className="text-gray-600">{category.count} teachers</p>
                </div>
              </div>
              <FaArrowRight className="text-gray-400 text-lg" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
