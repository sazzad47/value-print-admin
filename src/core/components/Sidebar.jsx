import React from "react";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import BubbleChartRoundedIcon from "@mui/icons-material/BubbleChartRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import { Box, useTheme } from "@mui/material";

import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const SidebarComponent = ({ isSidebarOpen }) => {
  const theme = useTheme();

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
              <SubMenu label="Orders" icon={<BarChartRoundedIcon />}>
                <MenuItem
                  active={
                    window.location.pathname === "/orders/pending"
                  }
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
                <MenuItem icon={<AccountBalanceRoundedIcon />}>Orders</MenuItem>
                <MenuItem icon={<SavingsRoundedIcon />}>
                  Savings Wallet
                </MenuItem>
              </SubMenu>
              <MenuItem
                active={window.location.pathname === "/transactions"}
                component={<Link to="/transactions" className="link" />}
                icon={<MonetizationOnRoundedIcon />}
              >
                Transactions
              </MenuItem>
              <SubMenu
                label="Settings"
                icon={<SettingsApplicationsRoundedIcon />}
              >
                <MenuItem icon={<AccountCircleRoundedIcon />}>
                  {" "}
                  Account{" "}
                </MenuItem>
                <MenuItem icon={<ShieldRoundedIcon />}> Privacy </MenuItem>
                <MenuItem icon={<NotificationsRoundedIcon />}>
                  Notifications
                </MenuItem>
              </SubMenu>
              <MenuItem icon={<LogoutRoundedIcon />}> Logout </MenuItem>
            </Menu>
          </Box>
        </Sidebar>
      )}
    </>
  );
};

export default SidebarComponent;
