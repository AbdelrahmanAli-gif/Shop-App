import { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import Spinner from "../../Spinner/Spinner";
import HorizontalLine from "../DashboardNavbar/HorizontalLine";
import { useSearchParams } from "react-router-dom";
import styles from "../../Product/Pagination.module.css";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeftLong,
  faArrowRightLong,
} from "@fortawesome/free-solid-svg-icons";
import UserCard from "./UserCard";

function DashboardUsersList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loadAllUsers, isLoading } = useUser();
  const [users, setUsers] = useState([]);
  const [shownUsers, setShownUsers] = useState([]);
  const currentPage = searchParams.get("page");

  useEffect(() => {
    const getOrders = async () => {
      const data = await loadAllUsers();
      setUsers(data);
    };
    getOrders();
  }, [loadAllUsers]);

  useEffect(() => {
    const page = searchParams.get("page") ? searchParams.get("page") : 1;
    const paginatedUsers = users.slice((page - 1) * 8, (page - 1) * 8 + 8);
    setShownUsers(paginatedUsers);
  }, [searchParams, users]);

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
              <span className="text-base">{users.length}</span>
            </div>
          </div>
          <HorizontalLine width="100%" />
          {shownUsers.map((user, i) => {
            return <UserCard user={user} key={i} />;
          })}

          {Math.ceil(users.length / 8) > 1 ? (
            <ReactPaginate
              pageCount={Math.ceil(users.length / 8)}
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

export default DashboardUsersList;
