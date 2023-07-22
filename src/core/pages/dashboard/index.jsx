import React from "react";
import FlexBetween from "../../components/FlexBetween";
import Header from "../../components/Header";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ShopIcon from "@mui/icons-material/Shop";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Box, useTheme, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import StatBox from "../../components/StatBox";
import {
  useGetAdminOrdersQuery,
  useGetOrdersByStageQuery,
  useGetTransactionsQuery,
} from "../../state/api/user";
import Manage from "../orders/pendings/Manage";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data: pendingOrders, isLoading: isLoadingPendingOrders } =
    useGetOrdersByStageQuery({ stage: "pending" });
  const { data: completeOrders, isLoading: isLoadingCompleteOrders } =
    useGetOrdersByStageQuery({ stage: "completed" });
  const { data: allOrders, isLoading: isLoadingAllOrders } =
    useGetAdminOrdersQuery({ stage: "completed" });
  const { data: allTransactions, isLoading: isLoadingAllTransactions } =
    useGetTransactionsQuery({});
  console.log('pending', pendingOrders)
    const columns = [
      {
        field: "date",
        headerName: "Date",
        flex: 1,
      },
      {
        field: "id",
        headerName: "Order ID",
        sortable: false,
        flex: 1,
      },
      {
        field: "email",
        headerName: "Email",
        sortable: false,
        flex: 1,
      },
      {
        field: "stage",
        headerName: "Stage",
        sortable: false,
        flex: 1,
      },
      {
        headerName: "Manage",
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => {
          return <Manage params={params} />;
        },
        flex: 1,
        headerAlign: "center",
        align: "center",
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
          value={pendingOrders && pendingOrders.length}
          increase="200+"
          description="Pending orders"
          isLoading={isLoadingPendingOrders}
          icon={
            <PendingActionsIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Members"
          value={completeOrders && completeOrders.length}
          increase="200+"
          description="Complete orders"
          isLoading={isLoadingCompleteOrders}
          icon={
            <TaskAltIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Members"
          value={allOrders && allOrders.length}
          increase="200+"
          description="Total Orders"
          isLoading={isLoadingAllOrders}
          icon={
            <ShopIcon
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Members"
          value={allTransactions && allTransactions.length}
          increase="200+"
          description="Total Transactions"
          isLoading={isLoadingAllTransactions}
          icon={
            <MonetizationOnIcon
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
            loading={isLoadingPendingOrders|| !pendingOrders}
            rows={(pendingOrders && pendingOrders) || []}
            getRowId={(row) => row.id}
            columns={columns}
            rowCount={(pendingOrders && pendingOrders.length) || 0}
            rowsPerPageOptions={[10, 20, 100]}
            pagination
            paginationMode="client"
            sortingMode="client"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
