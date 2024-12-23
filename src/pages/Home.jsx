import Categories from "../components/Categories";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <section>
        <Slider></Slider>
      </section>
      <section>
        <Categories></Categories>
      </section>
    </div>
  );
};

export default Home;
