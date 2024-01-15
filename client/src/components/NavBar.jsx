import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import useAuth from "../hooks/useAuth";
import useGetData from "../hooks/useGetData";
import { Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

const pageRoute = {
  Products: "products",
  Cart: "checkout",
  "Sold Products": "details",
  "Discount Codes": "code",
};
const pages = ["Products", "Cart"];
const adminPage = ["Sold Products", "Discount Codes"];
const settings = ["Logout"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState();
  const [anchorElUser, setAnchorElUser] = React.useState();
  const { auth, setAuth } = useAuth();
  const { data, setData } = useGetData();
  const navigate = useNavigate();

  const cartLength = data.orders?.cart?.items.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
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
            }}
          >
            Neu Kart
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {auth.user?.name && (
              <>
                {" "}
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {[...(auth.user.isAdmin ? adminPage : pages)].map((page) => (
                    <MenuItem
                      key={page}
                      onClick={() => navigate(`/${pageRoute[page]}`)}
                    >
                      {page !== "Cart" ? (
                        <Typography textAlign="center">{page}</Typography>
                      ) : (
                        <Badge badgeContent={cartLength} color="primary">
                          <Typography textAlign="center">{page}</Typography>
                        </Badge>
                      )}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Neu Kart
          </Typography>
          {auth.user?.name && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {[...(auth.user.isAdmin ? adminPage : pages)].map((page) => (
                <Button
                  key={page}
                  onClick={() => navigate(`/${pageRoute[page]}`)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page !== "Cart" ? (
                    <Typography textAlign="center">{page}</Typography>
                  ) : (
                    <Badge badgeContent={cartLength} color="primary">
                      <Typography textAlign="center">{page}</Typography>
                    </Badge>
                  )}
                </Button>
              ))}
            </Box>
          )}

          {auth.user?.name && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="User Logged In!">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={auth.user.name}
                    src="/static/images/avatar/2.jpg"
                  />
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
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      setAuth({});
                    }}
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
