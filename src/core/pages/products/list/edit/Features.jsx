import React from "react";
import InputField from "../../../../components/InputField";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { handleFileLoading } from "../../../../state";
import { useDispatch } from "react-redux";
import { imageUpload } from "../../../../utils/imageUpload";

const Features = ({
  productData,
  setProductData,
  errorMessage,
  setErrorMessage,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleChange = (event, index, field) => {
    const newData = { ...productData };
    newData.features[index][field] = event.target.value;
    setProductData(newData);
  };

  const handleValueChange = (event, parentIndex, index, field) => {
    const newData = { ...productData };
    newData.features[parentIndex].value[index][field] = event.target.value;
    setProductData(newData);
  };

  const handleValueFileChange = async (event, parentIndex, index, field) => {
    dispatch(handleFileLoading(true));
    const newData = { ...productData };
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const cloudinaryURL = await imageUpload([file]);
      newData.features[parentIndex].value[index][field] = cloudinaryURL[0];
      setProductData(newData);
      dispatch(handleFileLoading(false));
    }
  };

  const deleteFeature = (index) => {
    const newData = { ...productData };
    newData.features.splice(index, 1);
    setProductData(newData);
  };

  const deleteValue = (parentIndex, index) => {
    const newData = { ...productData };
    newData.features[parentIndex].value.splice(index, 1);
    setProductData(newData);
  };

  const addMoreFeature = () => {
    const newData = { ...productData };
    const newFeature = {
      placeholder: "",
      allow_customize: false,
      value: [
        {
          is_default: false,
          is_popular: false,
          photo: "",
          title: "",
          description: "",
        },
      ],
    };
    newData.features.push(newFeature);
    setProductData(newData);
  };

  const addMoreValue = (parentIndex) => {
    const newData = { ...productData };
    const newValue = {
      is_default: false,
      is_popular: false,
      photo: "",
      title: "",
      description: "",
    };
    newData.features[parentIndex].value.push(newValue);
    setProductData(newData);
  };

  return (
    <Grid className="mb-2 w-full">
      <div className="mb-2 w-full px-3 py-2 bg-gray-700 text-sm">
        {" "}
        In this section, you have to configure the feaures that doesn't cuase any variations
        in the pricing of the product.
      </div>
      {productData.features.map((feature, index) => (
        <Grid container key={index} spacing={2} className="mb-3">
          <Grid item xs={12}>
            {index > 0 && (
              <Grid className="w-full flex justify-end text-white">
                <IconButton
                  onClick={() => deleteFeature(index)}
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
                  name: `placeholder-${index}`,
                  id: `placeholder-${index}`,
                  label: "Placeholder",
                  value: feature.placeholder,
                  onChange: (event) =>
                    handleChange(event, index, "placeholder"),
                  setErrorMessage,
                  errorMessages: errorMessage,
                }}
              />

              <FormControl className="w-full">
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{
                    color: "rgb(214 211 209)",
                    "&.Mui-focused": {
                      color: "rgb(214 211 209)",
                    },
                  }}
                >
                  Allow customizing
                </InputLabel>
                <Select
                  fullWidth
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="allow_customize"
                  value={feature.allow_customize}
                  onChange={(event) =>
                    handleChange(event, index, "allow_customize")
                  }
                  sx={{
                    color: "white",
                    label: {
                      color: "darkred",
                      "&.Mui-focused": {
                        color: "darkred",
                      },
                    },
                    ".MuiOutlinedInput-notchedOutline": {
                      color: "rgb(214 211 209)",
                      borderColor: "rgb(120 113 108)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      color: "rgb(214 211 209)",
                      borderColor: "rgb(214 211 209)",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      color: "rgb(214 211 209)",
                      borderColor: "rgb(168 162 158)",
                    },
                    ".MuiSvgIcon-root ": {
                      fill: "rgb(214 211 209)",
                    },
                  }}
                  inputProps={{
                    MenuProps: {
                      MenuListProps: {
                        sx: {
                          backgroundColor: "rgb(63 63 70)",
                          color: "white",
                        },
                      },
                    },
                  }}
                  label="Allow customizing"
                  className="rounded-md"
                >
                  <MenuItem value={true}>true</MenuItem>
                  <MenuItem value={false}>false</MenuItem>
                </Select>
              </FormControl>
              <Typography className="text-bold text-md mt-2">
                Set Options
              </Typography>
              {feature.value.map((value, valueIndex) => (
                <div key={valueIndex} className="mt-1 flex flex-col gap-2">
                  <div className="w-full flex justify-end -mb-2">
                    {valueIndex > 0 && (
                      <IconButton
                        onClick={() => deleteValue(index, valueIndex)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </div>
                  <InputField
                    inputProps={{
                      type: "text",
                      name: `title-${index}-${valueIndex}`,
                      id: `title-${index}-${valueIndex}`,
                      label: "Title",
                      value: value.title,
                      onChange: (event) =>
                        handleValueChange(event, index, valueIndex, "title"),
                      setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                  <InputField
                    inputProps={{
                      type: "text",
                      name: `description-${index}-${valueIndex}`,
                      id: `description-${index}-${valueIndex}`,
                      label: "Description",
                      value: value.description,
                      onChange: (event) =>
                        handleValueChange(
                          event,
                          index,
                          valueIndex,
                          "description"
                        ),
                      setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                  <FormControl className="w-full">
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{
                        color: "rgb(214 211 209)",
                        "&.Mui-focused": {
                          color: "rgb(214 211 209)",
                        },
                      }}
                    >
                      Default
                    </InputLabel>
                    <Select
                      fullWidth
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="is_default"
                      value={value.is_default}
                      onChange={(event) =>
                        handleValueChange(
                          event,
                          index,
                          valueIndex,
                          "is_default"
                        )
                      }
                      sx={{
                        color: "white",
                        label: {
                          color: "darkred",
                          "&.Mui-focused": {
                            color: "darkred",
                          },
                        },
                        ".MuiOutlinedInput-notchedOutline": {
                          color: "rgb(214 211 209)",
                          borderColor: "rgb(120 113 108)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          color: "rgb(214 211 209)",
                          borderColor: "rgb(214 211 209)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          color: "rgb(214 211 209)",
                          borderColor: "rgb(168 162 158)",
                        },
                        ".MuiSvgIcon-root ": {
                          fill: "rgb(214 211 209)",
                        },
                      }}
                      inputProps={{
                        MenuProps: {
                          MenuListProps: {
                            sx: {
                              backgroundColor: "rgb(63 63 70)",
                              color: "white",
                            },
                          },
                        },
                      }}
                      label="Default"
                      className="rounded-md"
                    >
                      <MenuItem value={true}>true</MenuItem>
                      <MenuItem value={false}>false</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl className="w-full">
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{
                        color: "rgb(214 211 209)",
                        "&.Mui-focused": {
                          color: "rgb(214 211 209)",
                        },
                      }}
                    >
                      Popular
                    </InputLabel>
                    <Select
                      fullWidth
                      required
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="is_popular"
                      value={value.is_popular}
                      onChange={(event) =>
                        handleValueChange(
                          event,
                          index,
                          valueIndex,
                          "is_popular"
                        )
                      }
                      sx={{
                        color: "white",
                        label: {
                          color: "darkred",
                          "&.Mui-focused": {
                            color: "darkred",
                          },
                        },
                        ".MuiOutlinedInput-notchedOutline": {
                          color: "rgb(214 211 209)",
                          borderColor: "rgb(120 113 108)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          color: "rgb(214 211 209)",
                          borderColor: "rgb(214 211 209)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          color: "rgb(214 211 209)",
                          borderColor: "rgb(168 162 158)",
                        },
                        ".MuiSvgIcon-root ": {
                          fill: "rgb(214 211 209)",
                        },
                      }}
                      inputProps={{
                        MenuProps: {
                          MenuListProps: {
                            sx: {
                              backgroundColor: "rgb(63 63 70)",
                              color: "white",
                            },
                          },
                        },
                      }}
                      label="Popular"
                      className="rounded-md"
                    >
                      <MenuItem value={true}>true</MenuItem>
                      <MenuItem value={false}>false</MenuItem>
                    </Select>
                  </FormControl>
                  <div className="block mb-1 text-sm font-semibold text-secondaryTheme">
                    Upload photo
                  </div>
                  {value.photo && (
                    <div className="w-[150px] h-[140px] relative">
                    {" "}
                    <img
                      className="text-white w-full h-full absolute"
                      src={value.photo}
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
                      onChange={(event) =>
                        handleValueFileChange(event, index, valueIndex, "photo")
                      }
                      className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-[5px] file:rounded-r-none file:border-0 file:h-[56px] file:cursor-pointer file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-900/2 common-input cursor-pointer rounded-md text-secondaryTheme"
                    />
                  </label>
                </div>
              ))}
              <Grid className="w-full flex justify-end">
                <Button
                  onClick={() => addMoreValue(index)}
                  variant="outlined"
                  startIcon={<AddCircleOutlineIcon />}
                  disableRipple
                  sx={{ color: theme.palette.text.primary }}
                  className="mt-2 focus:outline-none normal-case px-4"
                >
                  Add {feature.value.length > 0 ? "another" : "a"} option
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={2}>
        <Grid item xs={12} className="w-full flex justify-start">
          <Button
            onClick={addMoreFeature}
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            disableRipple
            sx={{ color: theme.palette.text.primary }}
            className="mt-2 focus:outline-none normal-case px-4"
          >
            Add another feature
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Features;
