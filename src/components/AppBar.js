import { React, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import { Button, Link } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logout } from "../Redux/reducers/userReducer";
import { useNavigate } from "react-router";

const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Account", path: "/account" },
  { name: "Logout", path: "/api/logout" },
];

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user,accessToken, loading } = useSelector((state) => state.userReducer);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login");
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <HomeIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                fontSize: "xx-large",
              }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
                fontSize: "xx-large",
              }}
            >
              Teacher's Portal
            </Typography>
          </Box>
          {user && accessToken ? (
            <Box>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    {setting.name === "Logout" ? (
                      <Typography textAlign="center" onClick={handleLogout}>
                        {setting.name}
                      </Typography>
                    ) : (
                      <Link
                        to={setting.path}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : loading ? (
            <Box>
              {" "}
              <Button sx={{ mt: 1, color: "white" }}>Loading</Button>
            </Box>
          ) : (
            <Box>
              <Button
                onClick={() => navigate("/login")}
                sx={{ mt: 1, color: "white" }}
              >
                Log In
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                sx={{ mt: 1, color: "white" }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
