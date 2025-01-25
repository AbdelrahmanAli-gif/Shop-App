import { Outlet } from "react-router-dom";
import Footer from "../components/Common/Footer/Footer";
import Navbar from "../components/Common/Navbar/Navbar";

function UserAppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserAppLayout;
