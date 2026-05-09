import { ImStatsDots } from "react-icons/im";
import { IoMdHome } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between px-3 sticky top-0 z-50">
      
      <div>
        <Link to="/" className="btn btn-ghost text-xl">
          KeenKeeper
        </Link>
      </div>

      <div>
        <ul>
          <li className="flex gap-4 justify-around px-3">
            <Link className="btn btn-ghost" to="/">
              <IoMdHome /> Home
            </Link>

            <Link className="btn btn-ghost" to="/timeline">
              <IoTimeOutline /> Timeline
            </Link>

            <Link className="btn btn-ghost" to="/stats">
              <ImStatsDots /> Stats
            </Link>
          </li>
        </ul>
      </div>

    </div>
  );
};

export default Navbar;