import {
  Box,
  TextField,
  styled,
  Typography,
  useTheme,
  Button,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { useState, useContext } from "react";
import { AccountContext } from "../../context/context";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "../Signup/signup";
import Navbar from "../Navbar/navbar";
const theme = createTheme();
const LoginForm = styled(Box)(({ theme }) => ({
  width: "100%", // Set the form width to 100% for all screen sizes
  maxWidth: "500px", // Optional: Limit the maximum width to 500px (or adjust as needed)
  margin: "auto",
  textAlign: "center",
  padding: theme.spacing(2), // Add padding to the form
}));

const InputField = styled(TextField)(({ theme }) => ({
  width: "100%",
  margin: theme.spacing(1, 0), // Use theme spacing to create consistent margins
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
  const [logiInFormData, setLogInFormData] = useState({
    email: "",
    password: "",
  });
  const [changeToSignUp, setChangeToSignUp] = useState(false);
  const { isLogedIn, setIsLogedIn, setUserDetails } =
    useContext(AccountContext);

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

  const handelChange = (e) => {
    const { name, value } = e.target;
    setLogInFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:8080/user/login`,
        logiInFormData
      );
      if (response.status === 200) {
        setIsLogedIn(true);
        console.log(response.data.userInfo);
        setUserDetails(response.data.userInfo);
        return toast.success("Login Successfully", toastifyEmitter);
      }
    } catch (error) {
      toast.error(error.response.data.message, toastifyEmitter);
      console.error("Error while Login", error.message);
      return;
    }
  };
  return changeToSignUp ? (
    <Signup setChangeToSignUp={setChangeToSignUp} />
  ) : (
    <>
      <Navbar />

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
          <form style={{ width: "100%" }} onSubmit={handelLogin}>
            <InputField
              id="email"
              label="Email"
              name="email"
              type="email"
              variant="standard"
              required={true}
              autoComplete="flase"
              onChange={handelChange}
              value={logiInFormData.email}
            />
            <InputField
              id="password"
              label="Password"
              name="password"
              type="password"
              variant="standard"
              autoComplete="current-password"
              required={true}
              value={logiInFormData.password}
              onChange={handelChange}
            />
            <ChangeForm onClick={() => setChangeToSignUp(true)}>
              Create an account?SignUp
            </ChangeForm>
            <Button
              type="submit"
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
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </LoginForm>
      </ThemeProvider>
    </>
  );
};

export default Login;
