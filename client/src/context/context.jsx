import { createContext, useState } from "react";
import { useEffect } from "react";
import Cookie from "cookie-universal";
import { getUserDetails } from "../service/api";
import { useNavigate } from "react-router-dom";

export const AccountContext = createContext(null);
const AccountProvider = ({ children }) => {
  const cookies = Cookie();
  const token = cookies.get("token");
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [account, setAccount] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [onMarchantPage, setOnMarchantPage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      const fetchUserDetails = async () => {
        const response = await getUserDetails();
        if (response.status === 200) {
          setUserDetails(response.data);
          setIsLogedIn(true);
        }
        if (response.status !== 200) {
          cookies.remove("token");
          window.location.reload();
          // setIsLogedIn(false);
          // setUserDetails({});
          // navigate("/");
        }
      };
      fetchUserDetails();
    }
  }, [token]);

  return (
    <AccountContext.Provider
      value={{
        isLogedIn,
        setIsLogedIn,
        account,
        setAccount,
        userDetails,
        setUserDetails,
        onMarchantPage,
        setOnMarchantPage,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
