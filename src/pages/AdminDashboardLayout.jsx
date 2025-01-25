import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/Admin/DashboardNavbar/DashboardNavbar";

function AdminDashboardLayout() {
  return (
    <div className="flex">
      <DashboardNavbar />
      <Outlet />
    </div>
  );
}

export default AdminDashboardLayout;
