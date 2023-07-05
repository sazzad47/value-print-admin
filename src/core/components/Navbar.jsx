import React from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";
import { SettingsOutlined } from "@mui/icons-material";
import { setMode } from "../state";

import {
  AppBar,
  IconButton,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, isNonMobile }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        // position: "static",
        backgroundColor: theme.palette.background.alt,
        boxShadow: "none",
        width: !isNonMobile
          ? "100%"
          : isSidebarOpen
          ? "calc(100% - 250px)"
          : "100%",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
          {/* <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src="/user.jpg"
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween> */}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
