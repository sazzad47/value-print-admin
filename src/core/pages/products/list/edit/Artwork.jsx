import React from "react";
import InputField from "../../../../components/InputField";
import { Button, Grid, IconButton, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Artwork = ({
  productData,
  setProductData,
  errorMessage,
  setErrorMessage,
}) => {
  const theme = useTheme();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      artwork: {
        ...prevData.artwork,
        [name]: value,
      },
    }));
  };

  const handleContentChange = (event, index, field) => {
    const newData = { ...productData };
    newData.artwork.content[index][field] = event.target.value;
    setProductData(newData);
  };

  const deleteArtwork = (index) => {
    const newData = { ...productData };
    newData.artwork.content.splice(index, 1);
    setProductData(newData);
  };

  const addMoreArtwork = () => {
    const newData = { ...productData };
    newData.artwork.content.push({ title: "", description: "" });
    setProductData(newData);
  };

  return (
    <Grid className=" mb-2 w-full">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField
            inputProps={{
              type: "text",
              name: "instruction",
              id: "instruction",
              label: "Instruction",
              value: productData.artwork.instruction,
              onChange: handleChange,
              setErrorMessage,
              errorMessages: errorMessage,
            }}
          />
          {productData.artwork.content.map((item, index) => (
            <Grid container key={index} spacing={2} className="mb-3 mt-1">
              <Grid item xs={12}>
                {index > 0 && (
                  <Grid className="w-full flex justify-end text-white">
                    <IconButton
                      onClick={() => deleteArtwork(index)}
                      className="text-inherit flex justify-start p-0 focus:outline-none normal-case mb-1"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                )}
                <Grid className="flex flex-col w-full gap-2">
                  <InputField
                    inputProps={{
                      type: "text",
                      name: `title-${index}`,
                      id: `title-${index}`,
                      label: "Title",
                      value: item.title,
                      onChange: (event) =>
                        handleContentChange(event, index, "title"),
                      setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                  <InputField
                    inputProps={{
                      type: "text",
                      name: `description-${index}`,
                      id: `description-${index}`,
                      label: "Description",
                      value: item.description,
                      onChange: (event) =>
                        handleContentChange(event, index, "description"),
                      setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} className="w-full flex justify-end">
          <Button
            onClick={addMoreArtwork}
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            disableRipple
            sx={{ color: theme.palette.text.primary }}
            className="mt-2 focus:outline-none normal-case px-4"
          >
            Add another artwork
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Artwork;
