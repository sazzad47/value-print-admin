import React from "react";
import InputField from "../../../../components/InputField";
import { Button, Grid, IconButton, Typography, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { handleFileLoading } from "../../../../state";
import { useDispatch } from "react-redux";
import { imageUpload } from "../../../../utils/imageUpload";

const Intro = ({
  productData,
  setProductData,
  errorMessage,
  setErrorMessage,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleChange = (event, index, field) => {
    const newData = { ...productData };
    newData.intro[index][field] = event.target.value;
    setProductData(newData);
  };

  const handleValueChange = (event, parentIndex, index, field) => {
    const newData = { ...productData };
    newData.intro[parentIndex].value[index][field] = event.target.value;
    setProductData(newData);
  };

  const handleValueFileChange = async (event, parentIndex, index, field) => {
    dispatch(handleFileLoading(true));
    const newData = { ...productData };
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const cloudinaryURL = await imageUpload([file]);
      newData.intro[parentIndex].value[index][field] = cloudinaryURL[0];
      setProductData(newData);
      dispatch(handleFileLoading(false));
    }
  };

  const deleteIntro = (index) => {
    const newData = { ...productData };
    newData.intro.splice(index, 1);
    setProductData(newData);
  };

  const deleteValue = (parentIndex, index) => {
    const newData = { ...productData };
    newData.intro[parentIndex].value.splice(index, 1);
    setProductData(newData);
  };

  const addMoreIntro = () => {
    const newData = { ...productData };
    const newIntro = {
      placeholder: "",
      value: [
        {
          photo: "",
          title: "",
          features: [""],
        },
      ],
    };
    newData.intro.push(newIntro);
    setProductData(newData);
  };

  const addMoreValue = (parentIndex) => {
    const newData = { ...productData };
    const newValue = {
      photo: "",
      title: "",
      features: [""],
    };
    newData.intro[parentIndex].value.push(newValue);
    setProductData(newData);
  };

  const handleFeatureChange = (
    event,
    parentIndex,
    valueIndex,
    featureIndex
  ) => {
    const newData = { ...productData };
    newData.intro[parentIndex].value[valueIndex].features[featureIndex] =
      event.target.value;
    setProductData(newData);
  };

  const addMoreFeature = (parentIndex, valueIndex) => {
    const newData = { ...productData };
    newData.intro[parentIndex].value[valueIndex].features.push("");
    setProductData(newData);
  };

  const deleteFeature = (parentIndex, valueIndex, featureIndex) => {
    const newData = { ...productData };
    newData.intro[parentIndex].value[valueIndex].features.splice(
      featureIndex,
      1
    );
    setProductData(newData);
  };


  return (
    <Grid className="mb-2 w-full">
      <div className="mb-5 w-full px-3 py-2 bg-gray-700 text-sm">
        {" "}
        In this section, you have to configure the product details that will be presented
        in the intro section of the product.
      </div>
      {productData.intro?.map((intro, index) => (
        <Grid container key={index} spacing={2} className="mb-3">
          <Grid item xs={12}>
            {index > 0 && (
              <Grid className="w-full flex justify-end text-white">
                <IconButton
                  onClick={() => deleteIntro(index)}
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
                  label: "Heading",
                  value: intro.placeholder,
                  onChange: (event) =>
                    handleChange(event, index, "placeholder"),
                  setErrorMessage,
                  errorMessages: errorMessage,
                }}
              />

              <Typography className="text-bold text-md mt-2">
                Set Options
              </Typography>
              {intro.value?.map((value, valueIndex) => (
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
                  {value.features?.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="mt-1 flex flex-col gap-2"
                    >
                      <div className="w-full flex justify-end -mb-2">
                        {featureIndex > 0 && (
                          <IconButton
                            onClick={() =>
                              deleteFeature(index, valueIndex, featureIndex)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </div>
                      <InputField
                        inputProps={{
                          type: "text",
                          name: `feature-${index}-${valueIndex}-${featureIndex}`,
                          id: `feature-${index}-${valueIndex}-${featureIndex}`,
                          label: "Feature",
                          value: feature,
                          onChange: (event) =>
                            handleFeatureChange(
                              event,
                              index,
                              valueIndex,
                              featureIndex
                            ),
                          setErrorMessage,
                          errorMessages: errorMessage,
                        }}
                      />
                    </div>
                  ))}
                  <Grid className="w-full flex justify-end">
                    <Button
                      onClick={() => addMoreFeature(index, valueIndex)}
                      variant="outlined"
                      startIcon={<AddCircleOutlineIcon />}
                      disableRipple
                      sx={{ color: theme.palette.text.primary }}
                      className="mt-2 focus:outline-none normal-case px-4"
                    >
                      Add {intro.value.length > 0 ? "another" : "a"} feature
                    </Button>
                  </Grid>
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
                  Add {intro.value.length > 0 ? "another" : "a"} option
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid container spacing={2}>
        <Grid item xs={12} className="w-full flex justify-start">
          <Button
            onClick={addMoreIntro}
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            disableRipple
            sx={{ color: theme.palette.text.primary }}
            className="mt-2 focus:outline-none normal-case px-4"
          >
            Add another section
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Intro;
