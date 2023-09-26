import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountProvider from "./context/context";
import { useContext } from "react";
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
function App() {
  return (
    <BrowserRouter>
      <AccountProvider>
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:category" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders" element={<Order />} />
          <Route path="/account/addresses" element={<Address />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/seller/dashboard" element={<Dashboard />} />
          <Route path="/seller/order" element={<SellerOrder />} />
          <Route path="/seller/product" element={<SellerProducts />} />
          <Route path="*" element={<PageNotFound />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:category" element={<AllProducts />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account">
            <Route path="myaccount" element={<Account />} />
            <Route path="orders" element={<Order />} />
            <Route path="addresses" element={<Address />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/seller">
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="order" element={<SellerOrder />} />
            <Route path="product" element={<SellerProducts />}>
              <Route path="products" element={<SellerAllProducts />} />
              <Route path="addproduct" element={<AddProduct />} />
              <Route path="editproduct" element={<EditProduct />} />
            </Route>
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AccountProvider>
    </BrowserRouter>
  );
}

export default App;
