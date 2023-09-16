import Swal from "sweetalert2";

// Reusable function for displaying a confirmation dialog
export const showConfirmationDialog = (props, theme) => {
  const { title, text, preConfirm, successMsg, cancelMsg } = props;
  Swal.fire({
    title: title,
    text: text,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: "No",
    icon: "warning",
    background: theme.palette.primary.light,
    color: theme.palette.secondary[100],
    customClass: {
      actions: "my-actions",
      cancelButton: "order-1 right-gap",
      confirmButton: "order-3",
      denyButton: "order-2",
    },
    preConfirm: preConfirm,
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: successMsg,
        icon: "success",
        background: theme.palette.primary.light,
        color: theme.palette.secondary[100],
      });
    } else if (result.isDenied) {
      Swal.fire({
        title: cancelMsg,
        icon: "info",
        background: theme.palette.primary.light,
        color: theme.palette.secondary[100],
      });
    }
  });
};
