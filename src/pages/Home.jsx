import Categories from "../components/Categories";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import OurPolicies from "../components/OurPolicies";
import Slider from "../components/Slider";
import Stat from "../components/Stat";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <div>
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
      <section><OurPolicies></OurPolicies></section>
      <section><Faq></Faq></section>
      <section className="bg-base-300 text-base-content "><Footer></Footer></section>
    </div>
  );
};

export default Home;
