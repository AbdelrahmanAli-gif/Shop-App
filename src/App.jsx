import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import SingleProductPage from "./pages/SingleProductPage";
import { ProductsProvider } from "./contexts/ProductsContext";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { UserProvider } from "./contexts/UserContext";
import CartPage from "./pages/CartPage";
import AuthenticatedProtectedRoute from "./pages/AuthenticatedProtectedRoute";
import UserAppLayout from "./pages/UserAppLayout";
import AdminDashboardLayout from "./pages/AdminDashboardLayout";
import RoleProtectedRoute from "./pages/RoleProtectedRoute";
import DashboardProductsList from "./components/Admin/DashboardProductsList/DashboardProductsList";
import DashboardOrdersList from "./components/Admin/DashboardOrdersList/DashboardOrdersList";
import DashboardUsersList from "./components/Admin/DashboardUsersList/DashboardUsersList";
import AddProductForm from "./components/Admin/AddProduct/AddProductForm";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <UserProvider>
      <ProductsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<UserAppLayout />}>
              <Route path="/" element={<Homepage />}>
                <Route path=":id" element={<Navigate to="products/:id" />} />
              </Route>
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/:id" element={<SingleProductPage />} />
              <Route
                path="cart"
                element={
                  <AuthenticatedProtectedRoute>
                    <CartPage />
                  </AuthenticatedProtectedRoute>
                }
              />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route
              path="dashboard"
              element={
                <RoleProtectedRoute>
                  <AdminDashboardLayout />
                </RoleProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="products" />} />
              <Route path="products" element={<DashboardProductsList />} />
              <Route path="products/add" element={<AddProductForm />} />
              <Route path="users" element={<DashboardUsersList />} />
              <Route path="orders" element={<DashboardOrdersList />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </ProductsProvider>
    </UserProvider>
  );
}

export default App;
