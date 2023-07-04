import React from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
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
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
  CloudUpload,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import FlexBetween from "./FlexBetween";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu  } from "react-pro-sidebar";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Members",
    icon: null,
  },
  {
    text: "Pending",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Approved",
    icon: <Groups2Outlined />,
  },
  {
    text: "Uploads",
    icon: <CloudUpload />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Pages",
    icon: null,
  },
  {
    text: "Events",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Gallery",
    icon: <TodayOutlined />,
  },
  {
    text: "News",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Notice",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

const SidebarComponent = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [active, setActive] = useState("");
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Sidebar className="app">
    <Menu>
      <MenuItem
        component={<Link to="/" className="link" />}
        className="menu1"
        icon={<MenuRoundedIcon />}
      >
        <h2>QUICKPAY</h2>
      </MenuItem>
      <MenuItem
        component={<Link to="dashboard" className="link" />}
        icon={<GridViewRoundedIcon />}
      >
        Dashboard
      </MenuItem>
      <MenuItem icon={<ReceiptRoundedIcon />}> Invoices </MenuItem>
      <SubMenu label="Charts" icon={<BarChartRoundedIcon />}>
        <MenuItem icon={<TimelineRoundedIcon />}> Timeline Chart </MenuItem>
        <MenuItem icon={<BubbleChartRoundedIcon />}>Bubble Chart</MenuItem>
      </SubMenu>
      <SubMenu label="Wallets" icon={<WalletRoundedIcon />}>
        <MenuItem icon={<AccountBalanceRoundedIcon />}>
          Current Wallet
        </MenuItem>
        <MenuItem icon={<SavingsRoundedIcon />}>Savings Wallet</MenuItem>
      </SubMenu>
      <MenuItem
        component={<Link to="transactions" className="link" />}
        icon={<MonetizationOnRoundedIcon />}
      >
        Transactions
      </MenuItem>
      <SubMenu label="Settings" icon={<SettingsApplicationsRoundedIcon />}>
        <MenuItem icon={<AccountCircleRoundedIcon />}> Account </MenuItem>
        <MenuItem icon={<ShieldRoundedIcon />}> Privacy </MenuItem>
        <MenuItem icon={<NotificationsRoundedIcon />}>
          Notifications
        </MenuItem>
      </SubMenu>
      <MenuItem icon={<LogoutRoundedIcon />}> Logout </MenuItem>
    </Menu>
  </Sidebar>
  );
};

export default SidebarComponent;
