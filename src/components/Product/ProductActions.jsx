import { Link } from "react-router-dom";
import styles from "./ProductActions.module.css";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ProductActions({ id, available, action }) {
  return (
    <>
      <Link
        to={`/products/${id}`}
        className={`${styles.detailsBtn}  px-2 py-1 sm:px-4 sm:py-2 rounded-3xl`}
      >
        Details
      </Link>
      <button
        className={`${styles.addToCartBtn}  px-2 py-1 sm:px-4 sm:py-2 rounded-3xl flex items-center gap-2`}
        onClick={available ? action : () => {}}
      >
        {available ? (
          <>
            Add to cart
            <FontAwesomeIcon icon={faCartPlus} className="icon" size="sm" />
          </>
        ) : (
          "Sold out"
        )}
      </button>
    </>
  );
}

export default ProductActions;
