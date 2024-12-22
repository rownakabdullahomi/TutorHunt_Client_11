// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Slider = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imageUrls = [
      "https://i.ibb.co.com/6v9bL3d/pexels-august-de-richelieu-4261787.jpg",
      "https://i.ibb.co.com/3hVjwCv/pexels-julia-m-cameron-4144294.jpg",
      "https://i.ibb.co.com/Lxf8KB5/pexels-julia-m-cameron-4144531.jpg",
      "https://i.ibb.co.com/6YsBsgk/pexels-peter-olexa-2214257-4012966.jpg",
      "https://i.ibb.co.com/44HC34M/pexels-rdne-6517120.jpg",
      "https://i.ibb.co.com/M68JqrY/pexels-vanessa-garcia-6325978.jpg",
    ];

    setImages(imageUrls);
  }, []);

  return (
    <div className="my-10 w-11/12 mx-auto">

        <h1 className="text-3xl font-bold text-center my-6">
          Welcome to TutorHunt
        </h1>

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
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full md:h-[400px] h-36 rounded-lg shadow-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
