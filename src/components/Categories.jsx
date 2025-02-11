import { useQuery } from "@tanstack/react-query";
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
import Loading from "../pages/Loading";
import toast from "react-hot-toast";
import { Zoom } from "react-awesome-reveal";

const Categories = () => {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/language_categories_with_counts`
      );
      return data;
    },
  });

  // console.log(categories);

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

  if (isLoading) return <Loading></Loading>;
  if (error) return toast.error("Failed to load categories.");

  return (
    <div className="px-4 lg:px-6">
      <Zoom>
        <h2 className="text-3xl font-bold text-center my-8">
          Language Categories
        </h2>
      </Zoom>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            to={`/find_tutors/${category.language}`}
            key={category._id}
            className="cursor-pointer bg-base-100 shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {icons[category.language]}
                <div>
                  <h3 className="text-xl font-semibold">
                    {category.language} tutors
                  </h3>
                  <p className="text-gray-500">{category.count} teachers</p>
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

