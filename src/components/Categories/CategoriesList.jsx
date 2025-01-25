import { useEffect } from "react";
import Category from "./Category";
import { useProducts } from "../../contexts/ProductsContext";
import Spinner from "../Spinner/Spinner";

function CategoriesList({ params, setParams }) {
  const { categories, loadCategories, isLoading } = useProducts();

  useEffect(() => {
    const getCategories = async () => {
      await loadCategories();
    };
    getCategories();
  }, [loadCategories]);

  return (
    <div className="w-full flex justify-center items-center sm:gap-10 my-12  flex-wrap">
      {isLoading ? (
        <Spinner />
      ) : (
        categories.map((category) => {
          return (
            <Category
              category={category}
              params={params}
              setParams={setParams}
              key={category.id}
            />
          );
        })
      )}
    </div>
  );
}

export default CategoriesList;
