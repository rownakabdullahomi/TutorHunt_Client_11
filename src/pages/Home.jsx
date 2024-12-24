import Categories from "../components/Categories";
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
    </div>
  );
};

export default Home;
