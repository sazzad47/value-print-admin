import React from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ShopIcon from '@mui/icons-material/Shop';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDashboardQuery } from "../../state/api";
import StatBox from "../../components/StatBox";


const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "products",
      headerName: "Status",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Manage",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" />
      </FlexBetween>
      <Box
        m="1.5rem 0"
        display="grid"
        gridTemplateColumns={`repeat(${isNonMediumScreens ? 4 : 12}, 1fr)`}
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? "span 1" : "span 12" },
        }}
      >
        <StatBox
          title="Members"
          value={data && data.totalCustomers}
          increase="200+"
          description="Pending orders"
          icon={
            <PendingActionsIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Members"
          value={data && data.totalCustomers}
          increase="200+"
          description="Total users"
          icon={
            <TaskAltIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Members"
          value={data && data.totalCustomers}
          increase="200+"
          description="Total transactions"
          icon={
            <MonetizationOnIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Members"
          value={data && data.totalCustomers}
          increase="200+"
          description="Total sales"
          icon={
            <ShopIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
      </Box>
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
        
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
