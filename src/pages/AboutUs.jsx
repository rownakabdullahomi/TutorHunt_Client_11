import AboutUsGif from "../assets/About us page.gif";

const AboutUs = () => {
  return (
    <div className="px-4 lg:px-6 bg-base-200 flex items-center justify-center py-10">
      <div className="w-full flex flex-col md:flex-row items-center gap-10 bg-base-100 rounded-xl shadow-lg p-6 overflow-hidden">
        {/* Left Side - GIF */}
        <div className="flex justify-center items-center w-full md:w-1/2">
          <img
            src={AboutUsGif}
            alt="About Us"
            className="max-h-[400px] w-auto object-contain"
          />
        </div>

        {/* Right Side - Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center md:text-left">
            About Tutor<span className="text-primary">Hunt</span>
          </h2>
          <p className=" mt-4 text-justify">
            Welcome to TutorHunt, your go-to platform for learning new languages
            from experienced tutors worldwide. We believe in the power of
            communication and strive to make language learning accessible,
            interactive, and engaging for everyone.
          </p>
          <p className=" mt-4 text-justify">
            Whether you&apos;re a beginner or looking to refine your fluency, our
            platform connects you with skilled tutors who tailor lessons to
            your needs. Join our growing community and start your journey to
            mastering a new language today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
