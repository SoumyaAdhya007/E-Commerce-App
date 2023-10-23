import { createContext, useEffect, useState } from "react";
import { getMerchantOrders, getAllMerchantProducts } from "../service/api";
export const MerchantContext = createContext(null);
const MerchantProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  // Function to fetch seller orders and products
  const fetchSellerOrdersAndProducts = async () => {
    const [orderResponse, productResponse] = await Promise.all([
      getMerchantOrders(),
      getAllMerchantProducts(),
    ]);

    if (orderResponse.status === 200 && productResponse.status === 200) {
      setOrders(orderResponse.data);
      setProducts(productResponse.data);
    }
  };
  useEffect(() => {
    fetchSellerOrdersAndProducts();
  }, []);
  return (
    <MerchantContext.Provider
      value={{ orders, setOrders, products, setProducts }}
    >
      {children}
    </MerchantContext.Provider>
  );
};
export default MerchantProvider;
