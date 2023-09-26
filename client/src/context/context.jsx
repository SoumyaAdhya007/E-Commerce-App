import { createContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AccountContext = createContext(null);
const AccountProvider = ({ children }) => {
  const [isLogedIn, setIsLogedIn] = useState(true);
  const [account, setAccount] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   const navigateToDashboard = () => {
  //     if (isSeller) {
  //       navigate("/seller/dashboard"); // Navigate to "/seller/dashboard" if isSeller is true.
  //     } else {
  //       navigate("/");
  //     }
  //   };
  //   navigateToDashboard();
  // }, [isSeller]);
  return (
    <AccountContext.Provider
      value={{
        isLogedIn,
        setIsLogedIn,
        account,
        setAccount,
        userDetails,
        setUserDetails,
        isSeller,
        setIsSeller,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
