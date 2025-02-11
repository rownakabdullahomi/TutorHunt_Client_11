import Marquee from "react-fast-marquee";
import {
  FaFire,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUserCheck,
} from "react-icons/fa";
import { Slide } from "react-awesome-reveal";

const OurPolicies = () => {
  const policies = [
    {
      icon: <FaFire className="text-red-500 text-3xl mb-2" />,
      title: "Lessons Never Disappear",
      description:
        "All your prepared and unused lessons stay with you, ensuring you never lose access to any lessons you've paid for.",
    },
    {
      icon: <FaCalendarAlt className="text-blue-500 text-3xl mb-2" />,
      title: "Flexible Scheduling",
      description:
        "Adjust your plans without hassle by rescheduling or canceling any lesson up to 6 hours before it starts.",
    },
    {
      icon: <FaMoneyBillWave className="text-green-500 text-3xl mb-2" />,
      title: "No Subscription Needed",
      description:
        "Pay per lesson and schedule sessions at your convenience without any subscription commitment.",
    },
    {
      icon: <FaUserCheck className="text-purple-500 text-3xl mb-2" />,
      title: "Tutor Reliability Assurance",
      description:
        "Carefully selected professionals and dedicated tutors provide you with high-quality lessons.",
    },
  ];

  return (
    <div className="bg-base-200 py-14">
      <Slide direction="right">
        <h2 className="text-4xl font-bold text-center mb-14">
          Tutor<span className="text-primary">Hunt</span> Policies Are Really
          Simple
        </h2>
      </Slide>
      <div className="px-4 lg:px-6">
        <Marquee gradient={false} speed={40}>
          {policies.map((policy, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-base border-2 border-gray-300 shadow-md rounded-lg p-6 mx-4 w-80"
            >
              {policy.icon}
              <h3 className="text-xl font-bold mb-2">
                {policy.title}
              </h3>
              <p className="text-sm text-gray-500">{policy.description}</p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default OurPolicies;
