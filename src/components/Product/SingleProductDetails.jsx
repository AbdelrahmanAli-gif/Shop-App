import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "../Common/PrimaryButton/PrimaryButton";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useProducts } from "../../contexts/ProductsContext";

function SingleProductDetails({ product }) {
  const { addToCart } = useProducts();

  const handleAdd = async () => {
    await addToCart(product);
  };

  return (
    <div className="flex flex-col w-full md:w-1/3 h-full justify-center px-8 md:justify-around items-start gap-6">
      <p className="text-black text-sm sm:text-base md:text-xl">
        {product.name}
      </p>
      <p className="text-xs sm:text-sm md:text-base">{product.description}</p>
      <p className="text-black text-sm sm:text-base md:text-xl">
        ${product.price}
      </p>
      {product.available ? (
        <PrimaryButton onClick={handleAdd}>
          Add to cart{" "}
          <span>
            <FontAwesomeIcon icon={faCartPlus} className="icon" />
          </span>
        </PrimaryButton>
      ) : null}
    </div>
  );
}

export default SingleProductDetails;
