import { Link } from "react-router-dom";
import styles from "./IntroImage.module.css";

function IntroImage() {
  return (
    <div
      className={`${styles.imageContainer} w-full flex justify-center items-center`}
    >
      <button className="rounded-md py-2 px-3 text-base md:text-xl text-white border-2 border-white bg-transparent">
        <Link to="/products">Start Shopping</Link>
      </button>
    </div>
  );
}

export default IntroImage;
