import { AppBar, Toolbar, styled, Box, Typography, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from '../context/Context';
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Component = styled(AppBar)`
  background: #ffffff;
  color: #000;
`;

const Container = styled(Toolbar)`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const NavLinks = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexGrow: 1,
  [theme.breakpoints.down('md')]: {
    display: "none",
  },
  '& > a': {
    padding: 20,
    color: "#000",
    fontWeight: "bold",
    textDecoration: "none",
    fontFamily: "Roboto, sans-serif",
  }
}));

const WelcomeMessage = styled(Typography)`
  position: absolute;
  left: 20px;
  color: #2e2b28;
  font-family: Roboto, sans-serif;
`;

const HamburgerMenu = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: "30px",
  display: "none",
  [theme.breakpoints.down('md')]: {
    display: "block",
    right: "60px",  // Adjust the value as needed for medium screens
  },
  [theme.breakpoints.down('sm')]: {
    display: "block",
    right: "30px",  // Adjust the value as needed for small screens
  }
}));


export const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    console.log('Session storage cleared');
    console.log("logged out");
    to("/"); 
  };
  const handleLogout1=()=>{
    sessionStorage.clear();
    console.log('Session storage cleared');
    console.log("logged out");
    navigate("/");
  }

  const capitalizeFirstName = (name) => name.charAt(0).toUpperCase() + name.slice(1);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const menuItems = (
    <List>
      <ListItem button component={Link} to="/home" onClick={toggleDrawer(false)}>
        <ListItemText primary="HOME" />
      </ListItem>
      <ListItem button component={Link} to="/about" onClick={toggleDrawer(false)}>
        <ListItemText primary="ABOUT" />
      </ListItem>
      <ListItem button component={Link} to="/contact" onClick={toggleDrawer(false)}>
        <ListItemText primary="CONTACT" />
      </ListItem>
      <ListItem button onClick={handleLogout1}>
        <ListItemText primary="LOGOUT" />
      </ListItem>
    </List>
  );

  return (
    <Component>
      <Container>
        <WelcomeMessage variant="h6">
          Hey, {capitalizeFirstName(user.firstName)}
        </WelcomeMessage>
        <NavLinks>
          <Link to="/home">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/contact">CONTACT</Link>
          <Link onClick={handleLogout} style={{ cursor: 'pointer' }}>LOGOUT</Link>
        </NavLinks>
        <HamburgerMenu onClick={toggleDrawer(true)}>
          <MenuIcon />
        </HamburgerMenu>
      </Container>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <IconButton onClick={toggleDrawer(false)} sx={{ justifyContent: 'flex-end' }}>
            <CloseIcon />
          </IconButton>
          {menuItems}
        </Box>
      </Drawer>
    </Component>
  );
};
