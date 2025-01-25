import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import styles from "./DashboardNavbar.module.css";
import HorizontalLine from "./HorizontalLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

function DashboardNavbar() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { logout } = useUser();

  const handleShowMenu = () => {
    setShowMenu((current) => !current);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={`${
        styles.navbar
      } w-1/2 sm:w-1/4 h-screen fixed top-0 sm:static z-50 backdrop-blur-3xl ${
        showMenu ? "translate-x-full" : "translate-x-0"
      }`}
    >
      <button
        onClick={handleShowMenu}
        className={`${styles.navbarMenuButton} absolute block sm:hidden`}
      >
        {showMenu ? (
          <FontAwesomeIcon icon={faXmark} className="icon" />
        ) : (
          <FontAwesomeIcon icon={faBars} className="icon" />
        )}
      </button>
      <ul className="flex flex-col items-center justify-between h-full gap-4 w-full">
        <li className="w-full flex flex-col items-center justify-center">
          <NavLink to="/">
            <img src="/Identity.svg" alt="Logo" />
          </NavLink>
          <HorizontalLine />
        </li>
        <li className="w-full flex flex-col items-center justify-center gap-8">
          <div className="w-full flex flex-col items-center">
            <HorizontalLine />
            <NavLink
              className="my-4 text-xs sm:text-base md:text-xl"
              to="/dashboard/products"
            >
              Products
            </NavLink>
            <HorizontalLine />
          </div>
          <div className="w-full flex flex-col items-center">
            <HorizontalLine />
            <NavLink
              className="my-4 text-xs sm:text-base md:text-xl"
              to="/dashboard/users"
            >
              Users
            </NavLink>
            <HorizontalLine />
          </div>
          <div className="w-full flex flex-col items-center">
            <HorizontalLine />
            <NavLink
              className="my-4 text-xs sm:text-base md:text-xl"
              to="/dashboard/orders"
            >
              Orders
            </NavLink>
            <HorizontalLine />
          </div>
        </li>
        <li className="w-full flex flex-col items-center justify-center">
          <HorizontalLine />
          <button
            className="text-xs sm:text-base md:text-xl my-4"
            onClick={handleLogout}
          >
            <span>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="mr-2 icon"
              />
            </span>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default DashboardNavbar;
