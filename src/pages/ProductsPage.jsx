import ReactPaginate from "react-paginate";
import styles from "../components/Product/Pagination.module.css";
import CategoriesList from "../components/Categories/CategoriesList";
import ProductList from "../components/Product/ProductList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import ProductListHeader from "../components/Product/ProductListHeader";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";
import { useEffect, useState } from "react";

function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [params, setParams] = useState(() => {
    const page = searchParams.get("page");
    const category = searchParams.get("category");
    const inStock = searchParams.get("inStock");
    const outOfStock = searchParams.get("outOfStock");
    const min = searchParams.get("min");
    const max = searchParams.get("max");
    return {
      page: page ? Number(page) : 1,
      category: category || "",
      inStock: inStock === "true",
      outOfStock: outOfStock === "true",
      min: min || null,
      max: max || null,
    };
  });

  const { numPages } = useProducts();
  const currentPage = Number(searchParams.get("page"));

  const handlePageChange = (e) => {
    setParams((prev) => ({ ...prev, page: e.selected + 1 }));
  };

  useEffect(() => {
    const { page, category, inStock, outOfStock, min, max } = params;

    const filters = {};
    if (page && page !== 1) filters.page = page.toString();
    if (category) filters.category = category;
    if (inStock) filters.inStock = "true";
    if (outOfStock) filters.outOfStock = "true";
    if (min) filters.min = min;
    if (max) filters.max = max;

    setSearchParams(filters);
  }, [params, searchParams, setSearchParams]);

  return (
    <>
      <CategoriesList params={params} setParams={setParams} />
      <ProductListHeader
        title="Products"
        params={params}
        setParams={setParams}
      />
      <ProductList params={params} />
      {numPages > 1 ? (
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
      ) : null}
    </>
  );
}

export default ProductsPage;
