import { FaPlus } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="hero bg-base-200 py-12 md:py-20 px-4">
      <div className="hero-content text-center">
        <div className="w-full max-w-xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Friends to keep close in your life
          </h1>
          <p className="py-6 text-sm sm:text-base">
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