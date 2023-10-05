import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountProvider from "./context/context";
import CartProvider from "./context/cartContext";
import CheckoutProvider from "./context/checkoutContext";
import Home from "./components/User/Home/home";
import Login from "./components/Login/login";
import AllProducts from "./components/User/ProductCategoryPage/allProducts";
import ProductDetails from "./components/User/ProductDetailsPage/productDetails";
import PageNotFound from "./components/pageNotFound";
import Cart from "./components/User/Cart/cart";
import Account from "./components/User/Account/account";
import Profile from "./components/User/Account/Profile/profile";
import Address from "./components/User/Account/Address/address";
import Order from "./components/User/Account/Order/order";
import Dashboard from "./components/Seller/Dashboard/dashboard";
import SellerOrder from "./components/Seller/Order/sellerOrder";
import SellerProducts from "./components/Seller/Products/sellerProducts";
import AddProduct from "./components/Seller/Products/AddProduct/addProduct";
import SellerAllProducts from "./components/Seller/Products/sellerAllProducts";
import EditProduct from "./components/Seller/Products/editProduct";
import Checkout from "./components/User/Cart/Checkout/checkout";

function App() {
  return (
    <BrowserRouter>
      <AccountProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:category" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route
            path="/cart"
            element={
              <CartProvider>
                <Cart />
              </CartProvider>
            }
          />
          <Route
            path="/checkout"
            element={
              <CartProvider>
                <CheckoutProvider>
                  <Checkout />
                </CheckoutProvider>
              </CartProvider>
            }
          />

          {/* User Account Routes */}
          <Route path="/account">
            <Route path="myaccount" element={<Account />} />
            <Route path="order" element={<Order />} />
            <Route path="address" element={<Address />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Seller Routes */}
          <Route path="/seller">
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="order" element={<SellerOrder />} />
            <Route path="product" element={<SellerProducts />}>
              <Route path="products" element={<SellerAllProducts />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="editproduct" element={<EditProduct />} />
            </Route>
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AccountProvider>
    </BrowserRouter>
  );
}

export default App;
