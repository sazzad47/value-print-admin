import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import Header from "../../../components/Header";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import {
  useCreateCategoryMutation,
} from "../../../state/api/product";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { handleNotification, setCategory } from "../../../state";

const Create = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { access_token } = useSelector((state) => state.global);
 
  const [clientData, setClientData] = useState({name: ""});
  const [createCategory, { isLoading: isCreateCategoryLoading }] =
    useCreateCategoryMutation({ data: clientData, id, access_token });

  const [errorMessage, setErrorMessage] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setClientData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createCategory({
      data: clientData,
      id,
      access_token,
    });

    if ("error" in response) {
      if ("data" in response.error) {
        const errorData = response.error.data;
        if ("errors" in errorData) {
          setErrorMessage(errorData.errors);
        }
      }
    }

    if ("data" in response) {
      dispatch(setCategory({
        isCreated: true
      }))
      dispatch(
        handleNotification({
          show: true,
          message: "Category added successfully",
        })
      );
      setClientData({name: ""})
    }
  };
  
  return (
    <>
        <Box m="1.5rem 2.5rem">
          <Header title="Create Category" />
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
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <label
                  htmlFor="name"
                  className="block mb-3 text-sm font-semibold text-secondaryTheme"
                >
                  Name
                </label>
                <InputField
                  inputProps={{
                    type: "text",
                    name: "name",
                    id: "name",
                    value: clientData?.name,
                    onChange: handleChange,
                    setErrorMessage: setErrorMessage,
                    errorMessages: errorMessage,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Button
                  className="normal-case text-slate-200 bg-stone-500 hover:bg-stone-600"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSubmit}
                >
                  {isCreateCategoryLoading ? (
                    <ColorRing
                      visible={true}
                      height="30"
                      width="30"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={[
                        "#b8c480",
                        "#B2A3B5",
                        "#F4442E",
                        "#51E5FF",
                        "#429EA6",
                      ]}
                    />
                  ) : (
                    "Create"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </>
  );
};

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

export default Create;
