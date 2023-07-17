import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import Header from "../../../components/Header";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import {
  useCreateCategoryMutation,
} from "../../../state/api/product";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { handleFileLoading, handleNotification, setCategory } from "../../../state";
import { imageUpload } from "../../../utils/imageUpload";
import InputField from "../../../components/InputField";

const Create = () => {
  const dispatch = useDispatch();
  const { fileLoading } = useSelector((state) => state.global);
  const params = useParams();
  const { id } = params;
  const { access_token } = useSelector((state) => state.global);
 
  const [clientData, setClientData] = useState({name: "", photo: "", cover: "", information: ""});
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

  const handleFileInputChange = async (event) => {
    dispatch(handleFileLoading(true));
    const { name, files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const cloudinaryURL = await imageUpload([file]);
      setClientData((prevData) => ({
        ...prevData,
        [name]: cloudinaryURL[0],
      }));
      dispatch(handleFileLoading(false));
    }
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
    {fileLoading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          Uploading to cloudinary...
        </div>
      ) : (
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
              <Grid item xs={12}>
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
              <Grid item xs={12} md={6}>
              <div className="block mb-3 text-sm font-semibold text-secondaryTheme">
                Upload photo
              </div>
              {clientData.photo && (
                <div className="w-[150px] h-[140px] relative mb-2">
                  {" "}
                  <img
                    className="text-white w-full h-full absolute"
                    src={clientData.photo}
                    alt=""
                  />
                </div>
              )}

              <label className="block">
                <span className="sr-only">Upload a photo</span>
                <input
                  type="file"
                  accept="image/*"
                  name="photo"
                  onChange={handleFileInputChange}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-[5px] file:rounded-r-none file:border-0 file:h-[56px] file:cursor-pointer file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-900/2 common-input cursor-pointer rounded-md text-secondaryTheme"
                />
              </label>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className="block mb-3 text-sm font-semibold text-secondaryTheme">
                Upload cover photo
              </div>
              {clientData.cover && (
                <div className="w-[150px] h-[140px] relative mb-2">
                {" "}
                <img
                  className="text-white w-full h-full absolute"
                  src={clientData.cover}
                  alt=""
                />
              </div>
              )}

              <label className="block">
                <span className="sr-only">Upload a photo</span>
                <input
                  type="file"
                  accept="image/*"
                  name="cover"
                  onChange={handleFileInputChange}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-[5px] file:rounded-r-none file:border-0 file:h-[56px] file:cursor-pointer file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-900/2 common-input cursor-pointer rounded-md text-secondaryTheme"
                />
              </label>
            </Grid>
            <Grid item xs={12} >
                <label
                  htmlFor="information"
                  className="block mb-3 text-sm font-semibold text-secondaryTheme"
                >
                  Information
                </label>
                <InputField
                  inputProps={{
                    multiline: true,
                    minRows: 3,
                    type: "text",
                    name: "information",
                    id: "information",
                    value: clientData?.information,
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
        </Box>)}
    </>
  );
};



export default Create;
