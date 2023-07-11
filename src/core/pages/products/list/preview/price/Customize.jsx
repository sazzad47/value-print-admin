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
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { BsFillPenFill } from "react-icons/bs";
import ErrorIcon from "@mui/icons-material/Error";
import InputField from "../../../../../components/InputField";

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

export default function Customize({ placeholder, setFeatures }) {
  const theme = useTheme();
  const [newValue, setNewValue] = React.useState({
    title: "",
    description: "",
  });
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState({});
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new value object with the title and description
    const valueToAdd = {
      photo:
        "https://res.cloudinary.com/dhhn4nlmq/image/upload/v1688882717/WhatsApp-Image-2021-12-30-at-10.51.43-PM-removebg-preview_kug1hf.png",
      title: newValue.title,
      is_default: false,
      is_popular: false,
      description: newValue.description.substring(0, 100),
    };

    // Update the features state with the new value
    setFeatures((prevFeatures) =>
      prevFeatures.map((feature) => {
        if (feature.placeholder === placeholder) {
          return {
            ...feature,
            value: [...feature.value, valueToAdd],
          };
        }
        return feature;
      })
    );

    // Perform any additional logic or API calls with the updated features data

    // Reset the new value state
    setNewValue({ title: "", description: "" });

    // Close the dialog
    handleClose();
  };

  return (
    <div>
      <Box
        sx={{
          bgcolor: theme.palette.primary[600],
          "&:hover": {
            backgroundColor: theme.palette.primary[800],
          },
          color: "white",
        }}
        onClick={handleClickOpen}
        className="w-full h-full relative p-5 rounded-md cursor-pointer flex flex-col gap-5 items-center justify-center"
      >
        <div className="w-[50px] h-[50px] relative">
          <BsFillPenFill className="w-full h-full" />
        </div>
        <Typography align="center" className="font-bold text-lg">
          Customize your choice
        </Typography>
      </Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Customize {placeholder}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="w-[25rem] max-w-full flex flex-col justify-center items-center gap-5">
            {errorMessage.non_field_errors && (
              <Grid className="w-full p-4 mt-4 bg-zinc-500 flex flex-col gap-3">
                <Grid className="flex items-center gap-2">
                  <ErrorIcon />
                  <Typography className="p-0 text-sm">
                    {errorMessage.non_field_errors}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Box
              component="form"
              onSubmit={handleSubmit}
              autoComplete="off"
              mt="1rem"
              className="w-full"
            >
              <div>
                <div>
                  <label
                    htmlFor={placeholder}
                    className="block mb-3 text-sm font-semibold text-secondaryTheme"
                  >
                    {placeholder}
                  </label>
                  <InputField
                    inputProps={{
                      type: "text",
                      name: "title",
                      id: "title",
                      value: newValue.title,
                      onChange: handleChange,
                      setErrorMessage: setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                </div>
                <div className="mt-3">
                  <label
                    htmlFor="description"
                    className="block mb-3 text-sm font-semibold text-secondaryTheme"
                  >
                    Description
                  </label>
                  <InputField
                    inputProps={{
                      type: "text",
                      name: "description",
                      id: "description",
                      value: newValue.description,
                      onChange: handleChange,
                      setErrorMessage: setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                </div>
                <Button
                  disabled={!newValue.title || !newValue.description}
                  className="normal-case text-slate-200 bg-stone-500 hover:bg-stone-600"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  Set
                </Button>
              </div>
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
