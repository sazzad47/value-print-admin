import { Button, useTheme} from "@mui/material";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useDeleteTransactionMutation } from "../../state/api/user";


export default function Manage({ params }) {
  const theme = useTheme();
  const [deleteTransaction, { isLoading }] = useDeleteTransactionMutation()
  const { access_token } = useSelector((state) => state.global);
 
  const handleDelete = async () => {
     const response = await deleteTransaction({id: params.row.id, access_token});
     console.log('respone', response)
  };
  
  const handleConfirm = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Are you sure you want to delete this transaction?",
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
          onClick={handleConfirm}
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
        >
          Delete
        </Button>
      </strong>
    </>
  );
}
