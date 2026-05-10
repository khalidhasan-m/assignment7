import Banner from "../components/Banner";
import Friends from "../components/Friends";
import StatusCard from "../components/StatusCard";

const Homepage = () => {
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 mt-20 bg-base-200">
      <Banner />
      <StatusCard />
      <Friends />
    </div>
  );
};

export default Homepage;