import { FcCurrencyExchange, FcElectronics, FcPaid, FcGlobe, FcGraduationCap, FcReading } from "react-icons/fc";
import { motion } from "framer-motion";


const WhyChooseUs = () => {
  const features = [
    {
      icon: <FcElectronics />,
      title: "Great Instructors",
      description:
        "We encourage our community to vet and rate our instructors so that you get access to the best online instructors approved by former learners.",
    },
    {
      icon: <FcCurrencyExchange />,
      title: "Affordable Classes",
      description:
        "As our instructors and tutors come from all around the globe, they can offer high-quality teaching at a more affordable local rate starting as low as $7/hour.",
    },
    {
      icon: <FcPaid />,
      title: "Free Trial Lessons",
      description:
        "Most of our tutors and instructors offer free trial classes. You can see if you enjoy the classes and the learning experience.",
    },
    {
      icon: <FcGlobe />,
      title: "Learn Anytime, Anywhere",
      description:
        "Access live online classes and self-paced materials from anywhere in the world, tailored to your schedule and convenience.",
    },
    {
      icon: <FcGraduationCap />,
      title: "Customized Learning Paths",
      description:
        "Our platform offers personalized lesson plans and learning paths tailored to your language level, goals, and interests.",
    },
    {
      icon: <FcReading />,
      title: "Interactive Learning Tools",
      description:
        "Enhance your language skills with our interactive tools, including quizzes, flashcards, and real-time practice with native speakers.",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3, // Stagger animations between cards
      },
    },
  };

  return (
    <section className="py-12 bg-base-200">
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold text-gray-600">Achieve your goals</h2>
        <h3 className="text-3xl font-bold mt-4 animate__animated animate__heartBeat animate__infinite animate__slower">Focus on the skills you need</h3>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="card bg-base-100 shadow-lg p-6 text-center flex flex-col items-center"
            variants={cardVariants}
          >
            <motion.div
              className="text-6xl text-primary mb-4"
              whileHover={{ scale: 1.2, rotate: 10 }} // Subtle hover effect
            >
              {feature.icon}
            </motion.div>
            <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
            <p className="text-gray-500">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;
