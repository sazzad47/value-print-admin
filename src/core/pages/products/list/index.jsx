import React, { useEffect } from "react";
import { Box, Button, Grid, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../../components/Header";
import DataGridCustomToolbar from "../../../components/DataGridCustomToolbar";
import { useGetProductsQuery } from "../../../state/api/product";
import Manage from "./Manage";
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";


const CategoriesPage = () => {
  const theme = useTheme();
  const { category } = useSelector((state) => state.global) || [];
  const { data, isFetching, refetch } = useGetProductsQuery({});
  
  const {isCreated, isDeleted, isEdited} = category;

  useEffect(() => {
    refetch();
  }, [isDeleted, isEdited, isCreated, refetch]);

  const columns = [
    {
      sortable: true,
      field: 'lineNo',
      headerName: '#',
      flex: 0,
      editable: false,
      renderCell: (params) =>
      params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1,
    },
    {
      field: "id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "category_name",
      headerName: "Category Name",
      sortable: false,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Product Name",
      sortable: false,
      flex: 1,
    },
    {
      field: "starting_quantity",
      headerName: "SQ",
      sortable: false,
      flex: 1,
    },
    {
      field: "starting_price",
      headerName: "SP",
      sortable: false,
      flex: 1,
    },
    { 
      field: "manage",
      headerName: "Action",
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
        <Header title="Products" />
        <Link to="/products/list/create" ><Button className='text-white' startIcon={<AddIcon/>} variant="contained">Create</Button></Link> 
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

export default CategoriesPage;
