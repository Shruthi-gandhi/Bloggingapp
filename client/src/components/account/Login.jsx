import React, { useState, useContext } from "react";
import { Box, TextField, styled, Button, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { UserContext } from "../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)(({ theme }) => ({
  width: '400px',
  margin: 'auto',
  boxShadow: '5px 2px 5px 2px rgb(0 0 0 / 0.6)',
  [theme.breakpoints.down('sm')]: {
    width: '300px',
  },
  [theme.breakpoints.down('xs')]: {
    width: '100%',
    boxShadow: 'none', // Removing box shadow for very small screens
  },
}));

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  paddingTop: "50px",
});

const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '25px 35px',
  flex: 1,
  flexDirection: 'column',
  '& > div, & > button, & > p': {
    marginTop: '20px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 25px',
  },
  [theme.breakpoints.down('xs')]: {
    padding: '15px 20px',
  },
}));

const LoginButton = styled(Button)({
  background: '#fb641b',
  height: '48px',
  borderRadius: '10px',
});

const SignupButton = styled(Button)({
  background: '#fff',
  color: '#2874f0',
  height: '48px',
  boxShadow: '0 2px 4px 0 rgb(0 0 0 / 20%)',
});

const TextColour = styled(Typography)({
  fontSize: '16px',
  color: '#878787',
});

export function Login({ setAuthenticated }) {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);  // State to handle password visibility
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useContext(UserContext);
  const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
  const navigate = useNavigate();

  const handler = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/login", { userName, password });

      if (response && response.data) {
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        const userName = response.data.userName;
        const firstName = response.data.firstName;

        sessionStorage.setItem("accessToken", `Bearer ${accessToken}`);
        sessionStorage.setItem("refreshToken", `Bearer ${refreshToken}`);

        setUser({ userName, firstName });

        setAuthenticated(true);
        navigate("/home");
        alert("Login successful");
      }
    } catch (e) {
      setErrorMessage("Invalid username or password. Please try again.");
      console.error("Error while logging in, please try again later", e);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Component style={{ marginTop: "40px" }}>
      <Box>
        <Image src={imageURL} alt="Login" />
        <Wrapper>
          <TextField
            variant="standard"
            label="Enter Username"
            onChange={e => setUsername(e.target.value)}
            error={!!errorMessage}
          />
          <TextField
            variant="standard"
            label="Enter Password"
            type={showPassword ? "text" : "password"}
            onChange={e => setPassword(e.target.value)}
            error={!!errorMessage}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errorMessage && (
            <Typography color="error" style={{ marginTop: "10px" }}>
              {errorMessage}
            </Typography>
          )}
          <LoginButton variant="contained" onClick={handler}>
            Login
          </LoginButton>
          <TextColour style={{ textAlign: "center" }}>OR</TextColour>
          <SignupButton variant="text" onClick={() => navigate("/signup")}>
            Create an account
          </SignupButton>
        </Wrapper>
      </Box>
    </Component>
  );
}
