import { createContext, useState } from "react";
import { useEffect } from "react";
import Cookie from "cookie-universal";
import { getUserDetails } from "../service/api";

export const CartContext = createContext(null);
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, settotalDiscount] = useState(0);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        totalPrice,
        setTotalPrice,
        totalDiscount,
        settotalDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
