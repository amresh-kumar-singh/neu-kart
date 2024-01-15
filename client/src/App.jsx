import { React } from "react";
import "@/App.css";
import { Routes, Route } from "react-router-dom";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import ProtectedComp from "@/components/auth/ProtectedComp";
import SingleProduct from "@/components/products/SingleProduct";
import Payment from "@/pages/checkout/Payment";
import NotFound from "@/components/NotFound";
import Unauthorized from "./components/Unauthorized";
import NavBar from "./components/NavBar";
import { Box } from "@mui/material";
import Invoice from "@/pages/checkout/Invoice";
import AddAndListDiscountCode from "@/pages/admin/AddAndListDiscountCode";
import SoldProducts from "@/pages/admin/SoldProducts";
import Products from "@/pages/products";

function App() {
  return (
    <Box justifyContent="center">
      <NavBar />
      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<ProtectedComp allowedRoles="user" />}>
          <Route path="products" element={<Products />} />
        </Route>
        <Route element={<ProtectedComp allowedRoles="user" />}>
          <Route path="checkout" element={<Payment />} />
        </Route>
        <Route element={<ProtectedComp allowedRoles="user" />}>
          <Route path="invoice" element={<Invoice />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedComp allowedRoles="admin" />}>
          <Route path="/code" element={<AddAndListDiscountCode />} />
        </Route>
        <Route element={<ProtectedComp allowedRoles="admin" />}>
          <Route path="/details" element={<SoldProducts />} />
        </Route>

        {/* 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
