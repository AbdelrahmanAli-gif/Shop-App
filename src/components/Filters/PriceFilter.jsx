import { useEffect, useState } from "react";
import styles from "./PriceFilter.module.css";
import Slider from "react-slider";
import { useProducts } from "../../contexts/ProductsContext";

function PriceFilter({ params, setParams }) {
  const { getMinMaxValues } = useProducts();
  const { min, max } = getMinMaxValues();
  const [values, setValues] = useState(() => {
    if (params.min && params.max)
      return [Number(params.min), Number(params.max)];
    return [0, 0];
  });

  useEffect(() => {
    const getRange = () => {
      if (!params.min && !params.max) setValues([min, max]);
    };
    getRange();
  }, [params.min, params.max, min, max]);

  const handleClick = () => {
    const tempParams = { ...params, min: values[0], max: values[1] };
    setParams(tempParams);
  };

  return (
    <div className="w-3/4 flex flex-col">
      <p className="text-sm sm:text-l md:text-xl">Price</p>
      <div className="text-xs sm:text-sm md:text-base">
        ${values[0]} - ${values[1]}
      </div>
      <Slider
        className={`${styles.slider} w-full mt-5`}
        thumbClassName={`${styles.thumb}`}
        onChange={setValues}
        value={values}
        min={min}
        max={max}
      />
      <button
        onClick={handleClick}
        className={`${styles.filterBtn} text-xs sm:text-sm md:text-base self-end mr-0 sm:mr-4 md:mr-8 px-2 py-1 sm:px-4 sm:py-2 border-2 rounded-full border-black hover:text-white mt-8`}
      >
        Filter
      </button>
    </div>
  );
}

export default PriceFilter;
