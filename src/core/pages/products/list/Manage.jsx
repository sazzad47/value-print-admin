import { Button, Menu, MenuItem, useTheme} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDeleteCategoryMutation } from "../../../state/api/product";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../../state";


export default function Manage({ params }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation()
  const { access_token } = useSelector((state) => state.global);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleDelete = async () => {
    const response = await deleteCategory({id: params.row.id, access_token});

    if ("data" in response) {
      dispatch(setCategory({
        isDeleted: true
      }))
    }
  };
  
  const handleConfirm = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this category?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `${isLoading ? "Deleting..." : "Delete"}`,
      denyButtonText: 'No',
      icon: "warning",
      background: theme.palette.primary.light,
      color: theme.palette.secondary[100],
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-3',
        denyButton: 'order-2',
      },
      preConfirm: handleDelete,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted successfully!',
          icon: "success",
          background: theme.palette.primary.light,
          color: theme.palette.secondary[100],
        })
      } else if (result.isDenied) {
        Swal.fire({
          title: "Category wasn't deleted!",
          icon: "info",
          background: theme.palette.primary.light,
          color: theme.palette.secondary[100],
        })
      }
    })
    
  };
 

  return (
    <>
      <strong>
        <Button
          onClick={handleClick}
          aria-controls={openMenu ? "manage-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
        >
          Manage
        </Button>
      </strong>
      <Menu
        anchorEl={anchorEl}
        id="manage-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            boxShadow: "0px 0px 25px 25px rgba(0,0,0,0.2)",
            backgroundColor: "",
            color: "",
            overflow: "visible",
            mt: 1,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem
          component={Link}
          to={`/products/list/${params.row.id}/preview`}
        >
          Preview
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/products/list/${params.row.id}/edit`}
        >
          Edit
        </MenuItem>

        <MenuItem onClick={handleConfirm} className="">
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}
