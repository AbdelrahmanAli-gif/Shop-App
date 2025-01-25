import ProductActions from "./ProductActions";
import styles from "./Product.module.css";
import { useProducts } from "../../contexts/ProductsContext";

function Product({ product }) {
  const { addToCart } = useProducts();

  const handleAdd = async () => {
    await addToCart(product);
  };

  return (
    <div className="w-1/2 sm:w-1/3 md:w-1/4 text-center text-xs sm:text-sm p-5 text-black">
      <img
        src={product.images[0].url}
        alt={product.name}
        className={`${styles.productImg} w-full h-72 cursor-pointer`}
      />
      <div className="flex items-center justify-between my-2 flex-wrap">
        <span>{product.name}</span>
        <span>{`$${product.price.toFixed(2)}`}</span>
      </div>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <ProductActions
          id={product.id}
          available={product.available}
          action={handleAdd}
        />
      </div>
    </div>
  );
}

export default Product;
