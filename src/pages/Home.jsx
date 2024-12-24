import Categories from "../components/Categories";
import Slider from "../components/Slider";
import Stat from "../components/Stat";

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
    </div>
  );
};

export default Home;
