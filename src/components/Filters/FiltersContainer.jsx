import styles from "./FiltersContainer.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filter from "./Filter";
import PriceFilter from "./PriceFilter";

const availabilityFilters = [
  {
    name: "In Stock",
    id: "inStock",
  },
  {
    name: "Out of Stock",
    id: "outOfStock",
  },
];

function FiltersContainer({ showFilters, setShowFilters, params, setParams }) {
  const handleCloseMenu = () => {
    setShowFilters((current) => !current);
  };

  const containerTranslateValue = {
    transform: showFilters ? "translateX(0)" : "translateX(200%)",
  };

  const clearFilters = () => {
    setParams({
      page: 1,
      category: "",
      inStock: false,
      outOfStock: false,
      min: null,
      max: null,
    });
  };

  return (
    <div
      className={`${styles.filtersContainer} ${
        showFilters ? "left-2/3" : "left-full"
      } flex flex-col items-center justify-around h-screen w-1/3 fixed z-30 top-0 text-black`}
      style={containerTranslateValue}
    >
      <button onClick={handleCloseMenu} className="absolute top-5 left-5">
        <FontAwesomeIcon icon={faXmark} className="icon" size="2xl" />
      </button>
      <Filter
        title="Availability"
        labels={availabilityFilters}
        params={params}
        setParams={setParams}
      />
      <PriceFilter params={params} setParams={setParams} />
      <button
        onClick={clearFilters}
        className="clear-filters-btn text-xs sm:text-sm md:text-base self-end mr-0 sm:mr-4 md:mr-8 px-2 py-1 sm:px-4 sm:py-2 border-2 rounded-full border-black hover:text-white mt-8"
      >
        Clear filters
      </button>
    </div>
  );
}

export default FiltersContainer;
