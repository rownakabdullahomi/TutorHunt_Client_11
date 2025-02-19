import { Helmet } from "react-helmet-async";
import Categories from "../components/Categories";
import Faq from "../components/Faq";
import OurPolicies from "../components/OurPolicies";
import Slider from "../components/Slider";
import Stat from "../components/Stat";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <div className="bg-base-100">
      <Helmet>
        <title>Home | TutorHunt</title>
      </Helmet>

      <section>
        <Slider></Slider>
      </section>
      <section>
        <Categories></Categories>
      </section>
      <section>
        <Stat></Stat>
      </section>
      <section>
        <WhyChooseUs></WhyChooseUs>
      </section>
      <section>
        <OurPolicies></OurPolicies>
      </section>
      <section>
        <Faq></Faq>
      </section>
    </div>
  );
};

export default Home;
