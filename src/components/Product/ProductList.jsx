import { memo, useEffect } from "react";
import Product from "./Product";
import { useProducts } from "../../contexts/ProductsContext";
import Spinner from "../Spinner/Spinner";

function ProductList({ params }) {
  const { products, loadProducts, isLoading } = useProducts();

  useEffect(() => {
    loadProducts(params ? params : {});
  }, [params, loadProducts]);

  return (
    <div className="w-full flex items-center justify-around flex-wrap mb-14 px-2">
      {isLoading ? (
        <Spinner />
      ) : (
        products.map((product, i) => {
          return <Product product={product} key={i} />;
        })
      )}
    </div>
  );
}

export default memo(ProductList);
