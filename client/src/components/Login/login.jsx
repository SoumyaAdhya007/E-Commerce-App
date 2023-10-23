import React, { useState, useContext } from "react";
import { Box, TextField, styled, Typography, Button } from "@mui/material"; // Material-UI components
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import axios from "axios"; // Axios for making HTTP requests
import { ToastContainer, toast } from "react-toastify"; // React toast notifications
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // React Router DOM for navigation
import Signup from "../Signup/signup"; // Signup component
import Cookie from "cookie-universal"; // Universal cookie manager
import { getUserDetails } from "../../service/api"; // API functions for user details
import { AccountContext } from "../../context/context"; // Account context for user information

const theme = createTheme();
const LoginForm = styled(Box)(({ theme }) => ({
  width: "100%",
  maxWidth: "500px",
  margin: "auto",
  textAlign: "center",
  padding: theme.spacing(2),
}));

const InputField = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(1, 0),
}));

const ChangeForm = styled(Button)(({ theme }) => ({
  margin: 0,
  padding: 0,
  color: "blue",
  textAlign: "center",
  textTransform: "none",
  textDecoration: "underline",
}));

const Login = () => {
  // Cookie manager
  const cookies = Cookie();

  // React Router's navigate function for handling navigation
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  // State variables for login form and others
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [changeToSignUp, setChangeToSignUp] = useState(false);

  // User context and state variables
  const { isLogedIn, setIsLogedIn, setUserDetails } =
    useContext(AccountContext);

  // Toast notifications configuration
  const toastifyEmitter = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8080/user/login`,
        loginFormData
      );
      if (response.status === 200) {
        cookies.set("token", response.data.token, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
        setIsLogedIn(true);
        await getUserDetails();
        toast.success("Login Successfully", toastifyEmitter);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        setLoading(false);

        return;
      }
    } catch (error) {
      toast.error(error.response.data.message, toastifyEmitter);
      console.error("Error while Login", error.message);
      setLoading(false);

      return;
    }
  };

  return changeToSignUp ? (
    <Signup setChangeToSignUp={setChangeToSignUp} />
  ) : (
    <>
      <ThemeProvider theme={theme}>
        <LoginForm>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Login your account
          </Typography>
          <form style={{ width: "100%" }} onSubmit={handleLogin}>
            <InputField
              id="email"
              label="Email"
              name="email"
              type="email"
              variant="standard"
              required={true}
              autoComplete="false"
              onChange={handleInputChange}
              value={loginFormData.email}
            />
            <InputField
              id="password"
              label="Password"
              name="password"
              type="password"
              variant="standard"
              autoComplete="current-password"
              required={true}
              value={loginFormData.password}
              onChange={handleInputChange}
            />
            <ChangeForm onClick={() => setChangeToSignUp(true)}>
              Create an account? SignUp
            </ChangeForm>

            <Button
              type="submit"
              isLoading={loading}
              isDisabled={loading}
              sx={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#307676",
                color: "#fff",
                ":hover": {
                  backgroundColor: "#42A2A2",
                },
              }}
            >
              Login
            </Button>
          </form>
          <ToastContainer />
        </LoginForm>
      </ThemeProvider>
    </>
  );
};

export default Login; // Export the Login component
