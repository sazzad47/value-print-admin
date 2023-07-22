import React from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";
// import Manage from "./Manage";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";
import { useGetTransactionsQuery } from "../../state/api/user";
import Manage from "./Manage";



const Transactions = () => {
  const theme = useTheme();
  const {data, isFetching, refetch} = useGetTransactionsQuery({});

  const columns = [
    {
      field: "created_at",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        const date = new Date(params.value);
        return (
          date.getDate() +
          " " +
          date.toLocaleString("default", { month: "long" }) +
          " " +
          date.getFullYear()
        );
      },
    },
    {
      field: "id",
      headerName: "Transaction ID",
      sortable: false,
      flex: 1,
    },
    {
      field: "payment_id",
      headerName: "Payment ID",
      sortable: false,
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      sortable: false,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
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
    <Grid className="w-full flex justify-between">
     <Header title="Transactions" />
   </Grid>
   <Box
     height="80vh"
     sx={{
       mt: "1rem",
       "& .MuiDataGrid-root": {
         border: "none",
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
         backgroundColor: theme.palette.primary.light,
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
       loading={isFetching || !data}
       // loading={isFetching || loading || !data}
       getRowId={(row) => row.id}
       rows={(data && data) || []}
       columns={columns}
       rowCount={(data && data.length) || 0}
       rowsPerPageOptions={[10, 20, 100]}
       pagination
       paginationMode="client"
       sortingMode="client"
       components={{ Toolbar: DataGridCustomToolbar }}
       componentsProps={{
         toolbar: { refetch },
       }}
       initialState={{
         columns: {
           columnVisibilityModel: {
             id: false,
           },
         },
       }}
     />
   </Box>
 </Box>
  );
};

export default Transactions;
