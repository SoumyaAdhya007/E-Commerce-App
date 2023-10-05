import { createContext, useState } from "react";

export const CheckoutContext = createContext(null);
const CheckoutProvider = ({ children }) => {
  //   const [activeStep, setActiveStep] = useState(1);
  const [addressId, setAddressId] = useState("");
  // const [paymentId, setPaymentId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  return (
    <CheckoutContext.Provider
      value={{
        // activeStep,
        // setActiveStep,
        addressId,
        setAddressId,
        // paymentId,
        // setPaymentId,
        paymentStatus,
        setPaymentStatus,
        orderPlaced,
        setOrderPlaced,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutProvider;
