import React from "react";
import InputField from "../../../../components/InputField";
import { Button, Grid, IconButton, Tooltip, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { imageUpload } from "../../../../utils/imageUpload";
import { handleFileLoading } from "../../../../state";
import { useDispatch } from "react-redux";

const Ideas = ({
  productData,
  setProductData,
  errorMessage,
  setErrorMessage,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleIdeasChange = (event, index) => {
    const newData = [...productData.ideas];
    newData[index] = {
      ...newData[index],
      [event.target.name]: event.target.value,
    };
    setProductData((prevData) => ({
      ...prevData,
      ideas: newData,
    }));
  };

  const handleIdeaFileChange = async (event, index) => {
    dispatch(handleFileLoading(true));
    const newData = { ...productData };
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const cloudinaryURL = await imageUpload([file]);
      newData.ideas[index].photo = cloudinaryURL[0];
      setProductData(newData);
      dispatch(handleFileLoading(false));
    }
  };

  const deleteField = (index) => {
    const updatedData = [...productData.ideas];
    updatedData.splice(index, 1);
    setProductData((prevData) => ({
      ...prevData,
      ideas: updatedData,
    }));
  };

  const addMore = () => {
    const newIdea = {
      title: "",
      description: "",
    };
    setProductData((prevData) => ({
      ...prevData,
      ideas: [...prevData.ideas, newIdea],
    }));
  };
  return (
    <Grid className="mb-2 w-full">
      {productData.ideas.map((item, index) => (
        <Grid container key={index} spacing={2} className="mb-3">
          <Grid item xs={12}>
            {index > 0 && (
              <Grid className="w-full flex justify-end text-white">
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => deleteField(index)}
                    className="text-inherit flex justify-start p-0 focus:outline-none normal-case mb-1"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            )}
            <Grid className="flex flex-col w-full gap-2">
              <InputField
                inputProps={{
                  type: "text",
                  name: "title",
                  id: "title",
                  label: "Title",
                  value: item.title,
                  onChange: (event) => handleIdeasChange(event, index),
                  setErrorMessage,
                  errorMessages: errorMessage,
                }}
              />
              <div className="block mb-1 text-sm font-semibold text-secondaryTheme">
                Upload photo
              </div>
              {item.photo && (
                <div className="w-[150px] h-[140px] relative">
                  {" "}
                  <img
                    className="text-white w-full h-full absolute"
                    src={item.photo}
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
                  onChange={(event) => handleIdeaFileChange(event, index)}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-[5px] file:rounded-r-none file:border-0 file:h-[56px] file:cursor-pointer file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-900/2 common-input cursor-pointer rounded-md text-secondaryTheme"
                />
              </label>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={2}>
        <Grid item xs={12} className="w-full flex justify-end">
          <Button
            onClick={addMore}
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            disableRipple
            sx={{ color: theme.palette.text.primary }}
            className="mt-2 focus:outline-none normal-case px-4"
          >
            Add another idea
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Ideas;
