import { Box, TextField, styled, Button, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { UserContext } from "../context/Context";
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
    boxShadow: "none",
  },
}));

const Image = styled('img')(({ theme }) => ({
  width: 100,
  margin: 'auto',
  display: 'flex',
  paddingTop: '50px',
  [theme.breakpoints.down('sm')]: {
    paddingTop: '30px',
  },
  [theme.breakpoints.down('md')]: {
    paddingTop: '40px',
  },
}));

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

const LoginButton = styled(Button)(({ theme }) => ({
  background: '#fb641b',
  height: '48px',
  borderRadius: '10px',
  
}));

const SignupButton = styled(Button)(({ theme }) => ({
  background: '#fff',
  color: '#2874f0',
  height: '48px',
  boxShadow: '0 2px 4px 0 rgb(0 0 0 / 20%)',
  
}));

const TextColour = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#878787',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
  },
  [theme.breakpoints.down('md')]: {
    fontSize: '15px',
  },
}));

export function Signup({setAuthenticated}) {
  
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const Navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";
  
  const onclickhandler = async () => {
    try {
      const response = await axios.post("http://localhost:3000/users/signup", {
        userName, // Remember to match these fields with your backend
        password,
        firstName,
      });
      if (response.status === 200) {
        const userName = response.data.userName;
        const firstName = response.data.firstName;
        const accessToken = response.data.accessToken;
        sessionStorage.setItem("accessToken", `Bearer ${accessToken}`);
        setUser({ userName, firstName });
        console.log(response.data); // Log the response data
        alert("User created successfully");
        setAuthenticated(true);
        Navigate("/home");
      }
    } catch (e) {
      console.error("Error during signup:", e.message);
      alert("Error creating user: " + e.message);
    }
  };
  sessionStorage.clear();

  return (
    <Component style={{marginTop: "40px"}}>
      <Box>
        <Image src={imageURL} alt="Login" />
        <Wrapper>
          <TextField
            variant="standard"
            onChange={(e) => setFirstname(e.target.value)}
            label="Enter Name"
            name="firstName"
          />
          <TextField
            variant="standard"
            onChange={(e) => setUsername(e.target.value)}
            label="Enter Username"
            name="username"
          />
          <TextField
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
            label="Enter Password"
            name="password"
            type="password" // Type password for security
          />
          <LoginButton variant="contained" onClick={onclickhandler}>
            Sign Up
          </LoginButton>
          <TextColour style={{ textAlign: "center" }}>OR</TextColour>
          <SignupButton
            variant="text"
            onClick={() => {
              Navigate("/login");
            }}
          >
            Already have an Account
          </SignupButton>
        </Wrapper>
      </Box>
    </Component>
  );
}
