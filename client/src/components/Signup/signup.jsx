import {
  Box,
  TextField,
  styled,
  Typography,
  useTheme,
  InputAdornment,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { passwordStrength } from "check-password-strength";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { tostErrorMessage, tostSuccessMessage } from "../../service/tost";
const theme = createTheme();

const SignupForm = styled(Box)(({ theme }) => ({
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
const Signup = ({ setChangeToSignUp }) => {
  const [loading, setLoading] = useState(false);

  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const passwordRequirements = [
    "Password Length: At least 8 characters long.",
    "Should contain at least one uppercase letter (A-Z), one lowercase letter (a-z), at least one numeric digit (0–9), and one special character (e.g., @, $,!, etc.).",
    "Should not contain any spaces.",
  ];

  const handelChange = (e) => {
    const { name, value } = e.target;

    setSignupFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handelSignup = async (e) => {
    e.preventDefault();

    if (passwordStrength(e.target.password.value).id < 2) {
      return toast.info(
        "Password you entered is not strong enough",
        toastifyEmitter
      );
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8080/user/signup`,
        signupFormData
      );
      if (response.status === 201) {
        tostSuccessMessage("Signup Successfully");
        setTimeout(() => {
          setChangeToSignUp(false);
        }, 2000);
        setLoading(false);

        return;
      }
    } catch (error) {
      tostErrorMessage(error.response.data.message);
      console.error("Error while signing up", error.message);
      setLoading(false);

      return;
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <SignupForm>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Create your account
          </Typography>
          <form style={{ width: "100%" }} onSubmit={handelSignup}>
            <InputField
              id="name"
              label="Name"
              variant="standard"
              required={true}
              autoComplete="flase"
              name="name"
              value={signupFormData.name}
              onChange={handelChange}
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              variant="standard"
              required={true}
              autoComplete="flase"
              name="email"
              value={signupFormData.email}
              onChange={handelChange}
            />
            <InputField
              id="phone"
              label="Number"
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                minLength: 10,
                maxLength: 10,
              }}
              required={true}
              name="phone"
              value={signupFormData.phone}
              onChange={handelChange}
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              variant="standard"
              autoComplete="current-password"
              required={true}
              name="password"
              value={signupFormData.password}
              onChange={handelChange}
            />
            <List>
              {passwordRequirements.map((req, i) => {
                return (
                  <ListItem
                    sx={{ margin: "0px", padding: "0px", color: "#9B9E9A" }}
                    key={i}
                  >
                    <ListItemText primary={i + 1 + ")" + req} />
                  </ListItem>
                );
              })}
            </List>
            <ChangeForm onClick={() => setChangeToSignUp(false)}>
              Already have an account?Signin
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
              Signup
            </Button>
          </form>
          <ToastContainer />
        </SignupForm>
      </ThemeProvider>
    </>
  );
};

export default Signup;
