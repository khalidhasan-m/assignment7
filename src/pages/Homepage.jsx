import Banner from "../components/Banner";
import Friends from "../components/Friends";
import StatusCard from "../components/StatusCard";

const Homepage = () => {
  return (
    <div className="px-61.25 mt-20 bg-base-200">
      <Banner />
      <StatusCard />
      <Friends />
    </div>
  );
};

export default Homepage;
