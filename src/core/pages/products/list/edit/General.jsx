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
  useTheme,
} from "@mui/material";
import { imageUpload } from "../../../../utils/imageUpload";
import { handleFileLoading } from "../../../../state";
import { useDispatch } from "react-redux";
import { useGetCategoriesQuery } from "../../../../state/api/product";
import { Oval } from "react-loader-spinner";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import TextEditor from "../../../../components/TextEditor";
import ImageUploader from "../../../../components/ImageUploader";

// const ratingData = [1, 2, 4, 5];
const General = ({
  productData,
  setProductData,
  errorMessage,
  setErrorMessage,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { data, isLoading } = useGetCategoriesQuery({});

  const handleTextInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileInputChange = async (event) => {
    dispatch(handleFileLoading(true));
    const { name, files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const cloudinaryURL = await imageUpload([file]);
      setProductData((prevData) => ({
        ...prevData,
        [name]: cloudinaryURL[0],
      }));
      dispatch(handleFileLoading(false));
    }
  };

  const handleChangeCause = (event, index) => {
    const updatedData = [...productData.perfect_for];
    updatedData[index] = event.target.value;
    setProductData((prevData) => ({
      ...prevData,
      perfect_for: updatedData,
    }));
  };

  const deleteCauses = (index) => {
    const updatedData = [...productData.perfect_for];
    updatedData.splice(index, 1); // Use splice to remove the element at the specified index
    setProductData((prevData) => ({
      ...prevData,
      perfect_for: updatedData,
    }));
  };

  const addMoreCause = () => {
    const updatedData = [...productData.perfect_for];
    updatedData.push("");
    setProductData((prevData) => ({
      ...prevData,
      perfect_for: updatedData,
    }));
  };

  console.log("productData.information", productData);

  return (
    <>
      {isLoading ? (
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
      ) : (
        <Grid className="mb-2 w-full">
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
                  Select category
                </InputLabel>
                <Select
                  fullWidth
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="category"
                  value={productData.category}
                  onChange={handleTextInputChange}
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
                  label="Select category"
                  className="rounded-md"
                >
                  {data.map((item, i) => (
                    <MenuItem key={i} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "text",
                  name: "name",
                  id: "name",
                  label: "Name",
                  value: productData.name,
                  onChange: handleTextInputChange,
                  setErrorMessage,
                  errorMessages: errorMessage,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "text",
                  name: "slogan",
                  id: "slogan",
                  label: "Slogan",
                  value: productData.slogan,
                  onChange: handleTextInputChange,
                  setErrorMessage,
                  errorMessages: errorMessage,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="block mb-3 text-sm font-semibold text-secondaryTheme">
                Upload photo
              </div>
              {productData.photo && (
                <div className="w-[150px] h-[140px] relative">
                  {" "}
                  <img
                    className="text-white w-full h-full absolute"
                    src={productData.photo}
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
            <Grid item xs={12}>
              <div className="block mb-3 text-sm font-semibold text-secondaryTheme">
                Upload intro photo
              </div>
              {productData.intro_photo && (
                <div className="w-[150px] h-[140px] relative">
                  {" "}
                  <img
                    className="text-white w-full h-full absolute"
                    src={productData.intro_photo}
                    alt=""
                  />
                </div>
              )}

              <label className="block">
                <span className="sr-only">Upload a photo</span>
                <input
                  type="file"
                  accept="image/*"
                  name="intro_photo"
                  onChange={handleFileInputChange}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-[5px] file:rounded-r-none file:border-0 file:h-[56px] file:cursor-pointer file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-900/2 common-input cursor-pointer rounded-md text-secondaryTheme"
                />
              </label>
            </Grid>
            <Grid item xs={12}>
              <ImageUploader
                userData={productData}
                setUserData={setProductData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                label="Upload cover photo"
                name="cover_photo"
                multiple={true}
              />
            </Grid>

            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "text",
                  multiline: true,
                  minRows: 3,
                  name: "short_description",
                  id: "short_description",
                  label: "Short Description",
                  value: productData.short_description,
                  onChange: handleTextInputChange,
                  setErrorMessage,
                  errorMessages: errorMessage,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div className="block mb-3 text-sm font-semibold text-secondaryTheme">
                Perfect for
              </div>
              {productData?.perfect_for?.map((cause, causeIndex) => (
                <div key={causeIndex}>
                  <div className="w-full flex justify-end">
                    {causeIndex > 0 && (
                      <IconButton onClick={() => deleteCauses(causeIndex)}>
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </div>
                  <InputField
                    inputProps={{
                      type: "text",
                      name: "causes",
                      id: `causes-${causeIndex}`,
                      label: "Cause",
                      value: cause,
                      onChange: (event) => handleChangeCause(event, causeIndex),
                      setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                </div>
              ))}
            </Grid>
            <Grid className="w-full flex justify-end">
              <Button
                onClick={() => addMoreCause()}
                variant="outlined"
                startIcon={<AddCircleOutlineIcon />}
                disableRipple
                sx={{ color: theme.palette.text.primary }}
                className="mt-2 focus:outline-none normal-case px-4"
              >
                Add {productData?.perfect_for?.length > 0 ? "another" : "a"}{" "}
                cause
              </Button>
            </Grid>

            <Grid item xs={12}>
              <label
                htmlFor="information"
                className="block mb-3 text-sm font-semibold text-secondaryTheme"
              >
                Information
              </label>
              <TextEditor
                value={productData.information}
                state="information"
                setState={setProductData}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default General;
