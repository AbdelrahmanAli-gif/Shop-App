import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Category.module.css";

function Category({ category, params, setParams }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = () => {
    if (pathname === "/") navigate(`/products?category=${category.name}`);
    else {
      const tempParams = { ...params, category: category.name };
      setParams(tempParams);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.category} text-base text-center shrink-0 basis-1/2 sm:basis-auto flex flex-col items-center justify-center cursor-pointer`}
    >
      <img
        src={category.image}
        alt={category.name}
        className="rounded-full w-20 h-20 md:w-28 md:h-28"
      />
      <p>{category.name}</p>
    </div>
  );
}

export default Category;
