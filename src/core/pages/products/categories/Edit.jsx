import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../state/api/product";
import { ColorRing, Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFileLoading,
  handleNotification,
  setCategory,
} from "../../../state";
import { imageUpload } from "../../../utils/imageUpload";
import InputField from "../../../components/InputField";

const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fileLoading } = useSelector((state) => state.global);
  const params = useParams();
  const { id } = params;
  const { access_token } = useSelector((state) => state.global);
  const {
    data,
    isLoading: isGetCategoryLoading,
    refetch,
    isFetching,
  } = useGetCategoryQuery({ id });
  const [clientData, setClientData] = useState({
    name: "",
    photo: "",
    cover: "",
    information: "",
  });
  const [updateCategory, { isLoading: isUpdateCategoryLoading }] =
    useUpdateCategoryMutation({ data: clientData, id, access_token });

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
    const response = await updateCategory({
      data: clientData,
      id,
      access_token,
    });

    console.log('respone', response)

    if ("error" in response) {
      if ("data" in response.error) {
        const errorData = response.error.data;
        setErrorMessage(errorData);
      }
    }

    if ("data" in response) {
      await refetch();
      dispatch(
        setCategory({
          isEdited: true,
        })
      );
      dispatch(
        handleNotification({
          show: true,
          message: "Category saved successfully",
        })
      );
      navigate("/products/categories");
    }
  };

  useEffect(() => {
    if (data) {
      setClientData(data);
    }
  }, [data, dispatch, id]);

  return (
    <>
      {isGetCategoryLoading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Oval
            height={30}
            width={30}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      ) : fileLoading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          Uploading to cloudinary...
        </div>
      ) : (
        <Box m="1.5rem 2.5rem">
          <Header title="Edit Category" />
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
                 {errorMessage.name && (
                  <Grid className="flex items-center mt-2 gap-2 text-white">
                    <ErrorIcon />
                    <Typography className="p-0 text-sm">
                      {errorMessage.name}
                    </Typography>
                  </Grid>
                )}
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
                {errorMessage.photo && (
                  <Grid className="flex items-center mt-2 gap-2 text-white">
                    <ErrorIcon />
                    <Typography className="p-0 text-sm">
                      {errorMessage.photo}
                    </Typography>
                  </Grid>
                )}
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
                {errorMessage.cover && (
                  <Grid className="flex items-center mt-2 gap-2 text-white">
                    <ErrorIcon />
                    <Typography className="p-0 text-sm">
                      {errorMessage.cover}
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
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
                 {errorMessage.information && (
                  <Grid className="flex items-center mt-2 gap-2 text-white">
                    <ErrorIcon />
                    <Typography className="p-0 text-sm">
                      {errorMessage.information}
                    </Typography>
                  </Grid>
                )}
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
                  {isUpdateCategoryLoading || isFetching ? (
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
                    "Save"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      )}
    </>
  );
};



export default Edit;
