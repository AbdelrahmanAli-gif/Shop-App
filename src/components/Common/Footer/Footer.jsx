import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import {
  faFacebook,
  faXTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <footer
      className={`${styles.footer} w-full flex items-center justify-around py-6 flex-col md:flex-row gap-8`}
    >
      <Link to="/">
        <img src="/Identity.svg" alt="Logo" className="w-fit order-1" />
      </Link>
      <p className="text-black order-3 md:order-2">&copy; Copyright by Shop.</p>
      <div className="order-2 md:order-3">
        <p className="text-lg">Follow Us</p>
        <div className="flex justify-around w-full">
          <FontAwesomeIcon
            icon={faFacebook}
            className="icon cursor-pointer"
            size="xl"
          />
          <FontAwesomeIcon
            icon={faXTwitter}
            className="icon cursor-pointer"
            size="xl"
          />
          <FontAwesomeIcon
            icon={faInstagram}
            className="icon cursor-pointer"
            size="xl"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
