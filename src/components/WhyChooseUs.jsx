import { FcCurrencyExchange, FcElectronics, FcPaid } from "react-icons/fc";

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
  ];

  return (
    <section className="py-12 bg-base-200">
      <div className="text-center mb-8">
        <h2 className="text-lg font-semibold text-gray-500">Achieve your goals</h2>
        <h3 className="text-3xl font-bold text-gray-800 mt-4">Focus on the skills you need</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="card bg-base-100 shadow-lg p-6 text-center flex flex-col items-center"
          >
            <div className="text-6xl text-primary mb-4">{feature.icon}</div>
            <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
