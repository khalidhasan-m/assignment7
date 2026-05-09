import { FaPlus } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="hero bg-base-200">
      <div className="hero-content text-center">
        <div className="w-full">
          <h1 className="text-5xl font-bold">
            Friends to keep close in your life
          </h1>
          <p className="py-6">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>
          <button className="btn bg-[#1F5B4B] text-white hover:bg-[#1F5B4B]/50">
            <FaPlus />
            Add a Friend
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
