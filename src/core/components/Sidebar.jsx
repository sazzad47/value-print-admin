import React from "react";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReviewsIcon from '@mui/icons-material/Reviews';
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CategoryIcon from "@mui/icons-material/Category";
import InventoryIcon from "@mui/icons-material/Inventory";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
// import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AssistantIcon from '@mui/icons-material/Assistant';
import { Box, useTheme } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useDispatch } from "react-redux";
import { unSetUserToken } from "../state";
import { removeToken } from "../state/localStorage";

const SidebarComponent = ({ isSidebarOpen }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate("/login");
  };

  return (
    <>
      {isSidebarOpen && (
        <Sidebar>
          <Box
            sx={{
              height: "100vh",
              backgroundColor: theme.palette.background.alt,
            }}
          >
            <Menu
              menuItemStyles={{
                button: ({ active }) => {
                  return {
                    color: theme.palette.secondary[100],
                    backgroundColor: active
                      ? theme.palette.primary.main
                      : theme.palette.background.alt,
                    "&:hover": {
                      backgroundColor: `${theme.palette.primary.main} !important`,
                      color: theme.palette.secondary[100],
                    },
                  };
                },
              }}
            >
              <MenuItem
                component={<Link to="/" className="link" />}
                className="menu1"
                // icon={<MenuRoundedIcon />}
              >
                <h2>Value Printing Pte Ltd</h2>
                {/* <h2>IT</h2> */}
              </MenuItem>
              <MenuItem
                active={
                  window.location.pathname === "/" ||
                  window.location.pathname === "/dashboard"
                }
                component={<Link to="/dashboard" className="link" />}
                icon={<GridViewRoundedIcon />}
              >
                Dashboard
              </MenuItem>
              {/* <MenuItem icon={<ReceiptRoundedIcon />}> Orders </MenuItem> */}
              <SubMenu label="Products" icon={<InventoryIcon />}>
                <MenuItem
                  active={window.location.pathname === "/products/categories"}
                  component={
                    <Link to="/products/categories" className="link" />
                  }
                  icon={<CategoryIcon />}
                >
                  Categories
                </MenuItem>
                {/* <MenuItem
                  active={window.location.pathname === "/products"}
                  component={<Link to="/products" className="link" />}
                  icon={<FeaturedPlayListIcon />}
                >
                  Products
                </MenuItem> */}
                <MenuItem
                  active={window.location.pathname === "/products/variants"}
                  component={<Link to="/products/variants" className="link" />}
                  icon={<AssistantIcon />}
                >
                  Variants
                </MenuItem>
              </SubMenu>
              <SubMenu label="Orders" icon={<LocalGroceryStoreIcon />}>
                <MenuItem
                  active={window.location.pathname === "/orders/pending"}
                  component={<Link to="/orders/pending" className="link" />}
                  icon={<TimelineRoundedIcon />}
                >
                  {" "}
                  Pending{" "}
                </MenuItem>
                <MenuItem icon={<BubbleChartRoundedIcon />}>
                  Processing
                </MenuItem>
                <MenuItem icon={<AllInboxIcon />}>All</MenuItem>
              </SubMenu>
              <SubMenu label="Pages" icon={<WalletRoundedIcon />}>
                <MenuItem icon={<HomeIcon />}>Home</MenuItem>
                <MenuItem icon={<InfoIcon />}>About</MenuItem>
                <MenuItem icon={<ContactMailIcon />}>Contact</MenuItem>
                <MenuItem icon={<AttachMoneyIcon />}>Payment</MenuItem>
              </SubMenu>
              <MenuItem
                active={window.location.pathname === "/transactions"}
                component={<Link to="/transactions" className="link" />}
                icon={<MonetizationOnRoundedIcon />}
              >
                Transactions
              </MenuItem>
              <MenuItem
                active={window.location.pathname === "/reviews"}
                component={<Link to="/reviews" className="link" />}
                icon={<ReviewsIcon />}
              >
                Reviews
              </MenuItem>
              <MenuItem
                active={window.location.pathname === "/settings"}
                component={<Link to="/settings" className="link" />}
                icon={<SettingsApplicationsRoundedIcon />}
              >
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout} icon={<LogoutRoundedIcon />}>
                {" "}
                Logout{" "}
              </MenuItem>
            </Menu>
          </Box>
        </Sidebar>
      )}
    </>
  );
};

export default SidebarComponent;
