import { useEffect } from "react";
import { useProducts } from "../../../contexts/ProductsContext";
import { Link, useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard";
import Spinner from "../../Spinner/Spinner";
import HorizontalLine from "../DashboardNavbar/HorizontalLine";
import styles from "../../Product/Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function DashboardProductsList() {
  const { products, loadProducts, isLoading, productsCount, numPages } =
    useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page");

  useEffect(() => {
    loadProducts({ page: currentPage ? currentPage : 1 });
  }, [currentPage, loadProducts]);

  const handlePageChange = (e) => {
    if (e.selected !== 0) setSearchParams({ page: e.selected + 1 });
    else setSearchParams({});
  };

  return (
    <div
      className={`${
        isLoading ? "items-center justify-center" : "items-start justify-start"
      } p-10 flex flex-col max-h-screen overflow-y-auto w-full md:w-3/4`}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg md:text-2xl text-black">
                Products List
              </span>
              <span className="text-base">{productsCount}</span>
            </div>
            <Link to="add">
              <FontAwesomeIcon icon={faPlus} size="xl" className="icon" />
            </Link>
          </div>
          <HorizontalLine width="100%" />
          {products.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}

          <ReactPaginate
            pageCount={numPages}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            previousLabel={<FontAwesomeIcon icon={faArrowLeftLong} />}
            nextLabel={
              <FontAwesomeIcon icon={faArrowRightLong} className="icon" />
            }
            containerClassName="flex w-full items-center justify-center gap-2 mb-6"
            initialPage={currentPage ? currentPage - 1 : 0}
            pageClassName={`${styles.pageBtn} w-6 h-6 rounded-full flex items-center justify-center p-4 text-black`}
            previousClassName={`${styles.pageBtn} w-6 h-6 rounded-full flex items-center justify-center p-4 text-black`}
            nextClassName={`${styles.pageBtn} w-6 h-6 rounded-full flex items-center justify-center p-4 text-black`}
            activeClassName={`${styles.activePage} text-white`}
            disabledClassName={`${styles.disabledPageBtn}`}
            onPageChange={(e) => handlePageChange(e)}
            disableInitialCallback
            renderOnZeroPageCount={null}
          />
        </>
      )}
    </div>
  );
}

export default DashboardProductsList;
