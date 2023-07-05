import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetPendingsQuery } from "../../state/api";
import Header from "../../components/Header";
// import Manage from "./Manage";
import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";



const Pendings = () => {
  const theme = useTheme();
  // const [getData, setGetData] = useState(false);
  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const { data, isFetching } = useGetPendingsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
  });

  // useEffect(() => {
  //   refetch();
  //   setGetData(false);
  //   dispatch({ type: GlobalTypes.LOADING, payload: false });
  // }, [getData]);

  const columns = [
    {
      field: "createdAt",
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
      field: "userId",
      headerName: "Order ID",
      sortable: false,
      flex: 1,
    },
    {
      field: "subscription",
      headerName: "Category",
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
      field: "firstName",
      headerName: "Status",
      sortable: false,
      flex: 1,
    },
    {
      headerName: "Manage",
      sortable: false,
      disableColumnMenu: true,
      // renderCell: (params) => {
      //   return <Manage params={params} setGetData={setGetData} />;
      // },
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Pending Orders"
      />
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
          getRowId={(row) => row._id}
          rows={(data && data.pendingMembers) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          // componentsProps={{
          //   toolbar: { setGetData },
          // }}
        />
      </Box>
    </Box>
  );
};

export default Pendings;
