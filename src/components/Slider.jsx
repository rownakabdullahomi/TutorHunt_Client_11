// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Slide } from "react-awesome-reveal";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Slider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imageUrls = [
      "https://i.ibb.co/6v9bL3d/pexels-august-de-richelieu-4261787.jpg",
      "https://i.ibb.co/3hVjwCv/pexels-julia-m-cameron-4144294.jpg",
      "https://i.ibb.co/Lxf8KB5/pexels-julia-m-cameron-4144531.jpg",
      "https://i.ibb.co/6YsBsgk/pexels-peter-olexa-2214257-4012966.jpg",
      "https://i.ibb.co/44HC34M/pexels-rdne-6517120.jpg",
      "https://i.ibb.co/M68JqrY/pexels-vanessa-garcia-6325978.jpg",
    ];

    setImages(imageUrls);
  }, []);

  return (
    <motion.div
      className="px-4 lg:px-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Title Section */}
      <Slide>
      <h1 className="text-3xl font-bold text-center my-10">
        Welcome to Tutor<span className="text-primary">Hunt</span>
      </h1>
      </Slide>

      {/* Slider Section */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation // Enables navigation arrows
        pagination={{ clickable: true }} // Enables pagination dots
        autoplay={{ delay: 3000 }} // Auto-slide every 3 seconds
        spaceBetween={30} // Spacing between slides
        slidesPerView={1} // Display one slide at a time
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="overflow-hidden rounded-lg shadow-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full md:h-[450px] h-36 object-cover"
              />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Slider;
