import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Image from "next/image";
import logo from "../../../public/logo.svg";


const drawerWidth = 240;
const navItemsLeft = ["Confirm Attendance", "Gifts", "Location"];
const navItemsRight = ["When", "Our Story", "Our Memories"];

export const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "#FCFFF7", height: "100%" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0.5rem ",
        }}
      >
        <Image height="50%" src={logo} alt="Logo" />
      </Box>
      <Divider />
      <List>
        {navItemsRight.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Typography
                key={item}
                component="a"
                href={`#${item}`}
                variant="p"
                sx={{ display: { sm: "block", md: "none" } }}
              >
                {item}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <List>
        {navItemsLeft.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <Typography
                key={item}
                component="a"
                href={`#${item}`}
                variant="p"
                sx={{ display: { sm: "block", md: "none" } }}
              >
                {item}
              </Typography>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <AppBar
        component="nav"
        sx={{
          boxShadow: "0 2px 2px -2px rgba(0,0,0,.2)",
          backgroundColor: "#FCFFF7",
          overflow: "hidden",
          position: "fixed",
          top: "0",
          width: "100%",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ width: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" }, color: "#212B36" }}
            >
              <MenuIcon />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
                {navItemsRight.map((item) => (
                  <Typography
                    key={item}
                    component="a"
                    href={`#${item}`}
                    sx={{
                      display: { sm: "none", md: "block" },
                      ml: "35px",
                      color: "#212B36",
                    }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>

              <Box
                sx={{
                  display: { xs: "none", sm: "none", md: "block" },
                  width: "100px",
                  ml: "35px",
                  mt: "10px",
                }}
              >
                <Image src={logo} alt="Logo" />
              </Box>
              <Box sx={{ display: { xs: "none", sm: "none", md: "flex" } }}>
                {navItemsLeft.map((item) => (
                  <Typography
                    key={item}
                    component="a"
                    href={`#${item}`}
                    sx={{ ml: "35px", color: "#212B36" }}
                  >
                    {item}
                  </Typography>
                ))}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { sm: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
