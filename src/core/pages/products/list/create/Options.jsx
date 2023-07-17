import React from "react";
import InputField from "../../../../components/InputField";
import {
  Button,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Options = ({
  productData,
  setProductData,
  errorMessage,
  setErrorMessage,
}) => {
  const theme = useTheme();
  const handleOptionsChange = (event, index) => {
    const newData = [...productData.options];
    newData[index] = {
      ...newData[index],
      [event.target.name]: event.target.value,
    };
    setProductData((prevData) => ({
      ...prevData,
      options: newData,
    }));
  };

  const deleteField = (index) => {
    const updatedData = [...productData.options];
    updatedData.splice(index, 1);
    setProductData((prevData) => ({
      ...prevData,
      options: updatedData,
    }));
  };

  const addMore = () => {
    const newOption = {
      title: "",
      description: "",
    };
    setProductData((prevData) => ({
      ...prevData,
      options: [...prevData.options, newOption],
    }));
  };
  return (
    <Grid className="mb-2 w-full">
          {productData.options.map((item, index) => (
            <Grid container key={index} spacing={2} className="mb-3" >
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
                      onChange: (event) => handleOptionsChange(event, index),
                      setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                  <InputField
                    inputProps={{
                      multiline: true,
                      minRows: 3,
                      type: "text",
                      name: "description",
                      id: "description",
                      label: "Description",
                      value: item.description,
                      onChange: (event) => handleOptionsChange(event, index),
                      setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
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
            Add another option
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Options;
