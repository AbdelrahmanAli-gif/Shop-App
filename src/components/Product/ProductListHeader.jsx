import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FiltersContainer from "../Filters/FiltersContainer";
import { useState } from "react";

function ProductListHeader({ title, params, setParams }) {
  const [showFilters, setShowFilters] = useState(false);

  const handleShowFilters = () => {
    setShowFilters((current) => !current);
  };

  return (
    <div className="flex w-full px-8 items-center justify-between flex-wrap">
      <p className="text-black text-lg md:text-2xl shrink-0">{title}</p>
      <button
        onClick={handleShowFilters}
        className="text-black text-base md:text-lg flex gap-4 shrink-0"
      >
        Filter Products
        <FontAwesomeIcon icon={faSliders} className="icon" size="lg" />
      </button>
      <FiltersContainer
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        params={params}
        setParams={setParams}
      />
    </div>
  );
}

export default ProductListHeader;
