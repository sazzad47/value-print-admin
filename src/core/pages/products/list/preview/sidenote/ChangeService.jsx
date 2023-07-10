import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AiOutlineSketch, AiOutlineCloudUpload } from "react-icons/ai";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary[500],
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.primary[600],
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;
  const theme = useTheme();

  return (
    <DialogTitle
      sx={{ m: 0, p: 2, backgroundColor: theme.palette.primary[600] }}
      {...other}
    >
      <Typography className="text-xl">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ChangeService({ pathname }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        onClick={handleClickOpen}
        style={{ backgroundColor: theme.palette.primary[700] }}
        className="rounded-md px-3 py-2 text-center cursor-pointer"
      >
        Switch to another service
      </div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Select Option Below to Check Price
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="flex justify-center items-center gap-5">
            <Box
              sx={{
                bgcolor: theme.palette.primary[700],
                "&:hover": {
                  backgroundColor: theme.palette.primary[800],
                },
              }}
              onClick={() => {
                navigate(`${pathname}?service=upload_design`);
                handleClose();
              }}
              className="p-5 rounded-md cursor-pointer flex flex-col gap-3 items-center justify-between"
            >
              <AiOutlineCloudUpload className="text-4xl" />
              <Typography align="center" className="font-bold text-xl">
                Upload Your Design
              </Typography>
              <Typography align="center" className="text-sm">
                Click here to select your product options and to upload your
                print-ready artwork.
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: theme.palette.primary[700],
                "&:hover": {
                  backgroundColor: theme.palette.primary[800],
                },
              }}
              onClick={() => {
                navigate(`${pathname}?service=let_us_design`);
                handleClose();
              }}
              className="p-5 rounded-md cursor-pointer flex flex-col gap-3 items-center justify-between"
            >
              <AiOutlineSketch className="text-4xl" />
              <Typography align="center" className="font-bold text-xl">
                Let Us Design
              </Typography>
              <Typography align="center" className="text-sm">
                Click here to select your product options and to upload your
                print-ready artwork.
              </Typography>
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ backgroundColor: theme.palette.primary[700] }}
            autoFocus
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
