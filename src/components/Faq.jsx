import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { Slide } from "react-awesome-reveal"; 

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: "How do I book a lesson with a tutor?", answer: "You can book a lesson by visiting the tutor's profile and selecting the available time slot that suits you best." },
    { question: "What payment methods do you accept?", answer: "We accept various payment methods including credit/debit cards, PayPal, and more." },
    { question: "Is it safe to make payments through the Platform?", answer: "Yes, we use secure payment gateways to ensure all transactions are encrypted and safe." },
    { question: "Where are the online lessons held?", answer: "Lessons are conducted via our built-in video platform or a tool agreed upon with your tutor." },
    { question: "How do I join my scheduled lesson?", answer: "You can join your lesson by logging into your account and clicking on the 'Join Lesson' button from your dashboard." },
    { question: "Can I reschedule my lesson?", answer: "Yes, lessons can be rescheduled up to 6 hours before the scheduled time." },
    { question: "Can I cancel my lesson?", answer: "Yes, you can cancel a lesson according to the cancellation policy outlined during booking." },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="pb-10 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">

          <h2 className="text-3xl font-bold mb-6 animate__animated animate__flash animate__infinite animate__slower">Frequently Asked Questions</h2>

        {/* Slide animation for the FAQ section */}
        <Slide bottom duration={1000} delay={200}>
          <div className="divide-y divide-gray-300">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4">
                <button
                  className="w-full flex justify-between items-center text-left text-lg font-medium focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className="ml-4 text-primary">
                    {index === activeIndex ? <FiMinus /> : <FiPlus />}
                  </span>
                </button>
                {index === activeIndex && (
                  <div className="mt-3 text-gray-500">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default Faq;
