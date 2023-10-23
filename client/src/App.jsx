import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccountProvider from "./context/context";
import CartProvider from "./context/cartContext";
import CheckoutProvider from "./context/checkoutContext";
import MerchantProvider from "./context/merchantContext";
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
import SellerProducts from "./components/Seller/Products/sellerActions";
import AddProduct from "./components/Seller/Products/AddProduct/addProduct";
import SellerAllProducts from "./components/Seller/Products/sellerAllProducts";
import EditProduct from "./components/Seller/Products/EditProduct/editProduct";
import Checkout from "./components/User/Cart/Checkout/checkout";
import Footer from "./components/User/Footer/footer";
import Navbar from "./components/Navbar/navbar";
function App() {
  return (
    <BrowserRouter>
      <AccountProvider>
        <Navbar />
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
            <Route
              path="dashboard"
              element={
                <MerchantProvider>
                  <Dashboard />
                </MerchantProvider>
              }
            />
            <Route
              path="order"
              element={
                <MerchantProvider>
                  <SellerOrder />
                </MerchantProvider>
              }
            />
            <Route
              path="products"
              element={
                <MerchantProvider>
                  <SellerAllProducts />
                </MerchantProvider>
              }
            />
            <Route
              path="product/:id"
              element={
                <MerchantProvider>
                  <ProductDetails />
                </MerchantProvider>
              }
            />
            <Route path="product/addproduct" element={<AddProduct />} />
            <Route path="product/edit/:id" element={<EditProduct />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </AccountProvider>
    </BrowserRouter>
  );
}

export default App;
