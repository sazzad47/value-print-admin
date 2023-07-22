import React from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Manage from "./Manage";
import { useGetOrdersByStageQuery } from "../../../state/api/user";
import Header from "../../../components/Header";
import DataGridCustomToolbar from "../../../components/DataGridCustomToolbar";

const Orders = () => {
  const theme = useTheme();
  const { data, isLoading, isFetching, refetch } = useGetOrdersByStageQuery({stage: "approved"});

  console.log("data", data);

  // useEffect(() => {
  //   refetch();
  //   setGetData(false);
  //   dispatch({ type: GlobalTypes.LOADING, payload: false });
  // }, [getData]);

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
      <Grid className="w-full flex justify-between">
        <Header title="Approved Orders" />
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
          loading={isLoading || isFetching || !data}
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

export default Orders;
