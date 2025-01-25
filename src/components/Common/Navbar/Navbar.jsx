import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faBars,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../../contexts/UserContext";

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const { cart, tempCart, id } = useUser();
  const cartCount = id
    ? Object.keys(cart).length
    : Object.keys(tempCart).length;

  const handleShowMenu = () => {
    setShowMenu((current) => !current);
  };

  return (
    <nav className={`${styles.navbar} w-full sticky top-0 z-20`}>
      <ul className="flex justify-between items-center text-sm md:text-xl px-5 md:px-10 bg-inherit">
        <li className="block md:hidden order-3 z-20 bg-transparent">
          <button onClick={handleShowMenu}>
            {showMenu ? (
              <FontAwesomeIcon icon={faXmark} size="2xl" className="icon" />
            ) : (
              <FontAwesomeIcon icon={faBars} size="2xl" className="icon" />
            )}
          </button>
        </li>
        <li className="order-2 md:order-1">
          <NavLink to="/">
            <img src="/Identity.svg" alt="Logo" className="w-28 md:w-fit" />
          </NavLink>
        </li>
        <li
          className={`${styles.navbarLinks} ${
            showMenu ? "left-2/4 translate-x-0" : "left-full translate-x-full"
          } flex-col justify-center items-center fixed h-72 top-0 bottom-0 gap-5
          flex md:flex md:flex-row w-1/2 md:w-1/3 md:justify-between order-2 md:static md:h-fit md:translate-x-0 z-10`}
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
        </li>
        <li className="relative order-1 md:order-3 h-full">
          <NavLink to="/cart">
            <FontAwesomeIcon icon={faCartShopping} className="icon" size="xl" />
          </NavLink>
          {cartCount > 0 ? (
            <div
              className={`${styles.counter} flex absolute h-4 w-4 rounded-full text-xs items-center justify-center text-white`}
            >
              {cartCount}
            </div>
          ) : null}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
