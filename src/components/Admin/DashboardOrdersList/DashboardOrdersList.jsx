import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";
import ReactPaginate from "react-paginate";
import Spinner from "../../Spinner/Spinner";
import HorizontalLine from "../DashboardNavbar/HorizontalLine";
import OrderCard from "./OrderCard";
import styles from "../../Product/Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";

function DashboardOrdersList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [orders, setOrders] = useState([]);
  const [shownOrders, setShownOrders] = useState([]);
  const { loadAllOrders, isLoading } = useUser();
  const currentPage = searchParams.get("page");

  useEffect(() => {
    const getOrders = async () => {
      const data = await loadAllOrders();
      setOrders(data);
    };
    getOrders();
  }, [loadAllOrders]);

  useEffect(() => {
    const page = searchParams.get("page") ? searchParams.get("page") : 1;
    const paginatedOrders = orders.slice((page - 1) * 8, (page - 1) * 8 + 8);
    setShownOrders(paginatedOrders);
  }, [searchParams, orders]);

  const handlePageChange = (e) => {
    if (e.selected === 0) setSearchParams({});
    else setSearchParams({ page: e.selected + 1 });
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
                Orders List
              </span>
              <span className="text-base">{orders.length}</span>
            </div>
          </div>
          <HorizontalLine width="100%" />
          {shownOrders.map((order, i) => {
            return <OrderCard order={order} key={i} />;
          })}

          {Math.ceil(orders.length / 8) > 1 ? (
            <ReactPaginate
              pageCount={Math.ceil(orders.length / 8)}
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
      )}
    </div>
  );
}

export default DashboardOrdersList;
