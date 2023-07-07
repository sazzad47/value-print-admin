import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import { useChangePasswordMutation } from "../../../state/api/user";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { handleNotification } from "../../../state";

export default function ChangePassword() {
 
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const { access_token } = useSelector((state) => state.global);
  const dispatch = useDispatch();
 
  const initState = {
    password: "",
    password2: "",
  };

  const [userData, setUserData] = useState(initState);
  const [errorMessage, setErrorMessage] = useState({});

  const { password, password2 } = userData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await changePassword({ userData, access_token });
    if ("error" in response) {
      if ("data" in response.error) {
        const errorData = response.error.data;
        if ("errors" in errorData) {
          setErrorMessage(errorData.errors);
        }
      }
    }

    if ("data" in response) {
      setUserData(initState);
      setErrorMessage({});
      dispatch(handleNotification({ show: true, message: "Password changed successfully" }));
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="flex flex-col items-center w-full">
        {errorMessage.non_field_errors && (
          <Grid className="w-full p-4 my-4 bg-zinc-500 flex flex-col gap-3">
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
          className="w-full"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "password",
                  name: "password",
                  id: "password",
                  label: "New Password",
                  value: password,
                  onChange: handleChange,
                  setErrorMessage: setErrorMessage,
                  errorMessages: errorMessage,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "password",
                  name: "password2",
                  id: "password2",
                  label: "Confirm your password",
                  value: password2,
                  onChange: handleChange,
                  setErrorMessage: setErrorMessage,
                  errorMessages: errorMessage,
                }}
              />
            </Grid>
          </Grid>
          <Button
            className="normal-case text-slate-200 bg-stone-500 hover:bg-stone-600"
            type="submit"
            disabled={!password || !password2}
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#b8c480", "#B2A3B5", "#F4442E", "#51E5FF", "#429EA6"]}
              />
            ) : (
              "Save"
            )}
          </Button>
        </Box>
      </div>
    </div>
  );
}

const InputField = ({ inputProps }) => {
  const { type, name, id, label, value, onChange, setErrorMessage } =
    inputProps;

  const errorMessages = inputProps.errorMessages || {};

  return (
    <div>
      <TextField
        type={type}
        name={name}
        value={value}
        required
        fullWidth
        id={id}
        label={label}
        onChange={onChange}
        onFocus={() =>
          setErrorMessage((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }))
        }
        sx={{
          label: {
            color: "rgb(214 211 209)",
          },
          "& label.Mui-focused": {
            color: "rgb(214 211 209)",
          },
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              color: "white",
              borderColor: "rgb(120 113 108)",
            },
            "&:hover fieldset": {
              borderColor: "rgb(168 162 158)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgb(214 211 209)",
            },
          },
        }}
      />
      {errorMessages[name] && errorMessages[name] !== "" && (
        <Grid className="flex items-center mt-2 gap-2 text-secondaryTheme">
          <ErrorIcon />
          <Typography className="p-0 text-sm">{errorMessages[name]}</Typography>
        </Grid>
      )}
    </div>
  );
};
