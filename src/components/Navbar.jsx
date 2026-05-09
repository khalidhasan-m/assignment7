import { ImStatsDots } from "react-icons/im";
import { IoMdHome } from "react-icons/io";
import { IoTimeOutline } from "react-icons/io5";
import { NavLink } from "react-router";

const Navbar = () => {
  const linkStyle = ({ isActive }) =>
    `btn btn-ghost flex gap-2 items-center ${
      isActive ? "font-bold bg-[#1F5B4B] text-white" : ""
    }`;

  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between px-3 sticky top-0 z-50">
      
      <div>
        <NavLink to="/" className="btn btn-ghost text-xl">
          KeenKeeper
        </NavLink>
      </div>

      <div>
        <ul>
          <li className="flex gap-4 justify-around px-3">

            <NavLink to="/" className={linkStyle}>
              <IoMdHome /> Home
            </NavLink>

            <NavLink to="/timeline" className={linkStyle}>
              <IoTimeOutline /> Timeline
            </NavLink>

            <NavLink to="/stats" className={linkStyle}>
              <ImStatsDots /> Stats
            </NavLink>

          </li>
        </ul>
      </div>

    </div>
  );
};

export default Navbar;