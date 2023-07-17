import React from "react";
import InputField from "../../../../components/InputField";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";
import { imageUpload } from "../../../../utils/imageUpload";
import { handleFileLoading } from "../../../../state";
import { useDispatch } from "react-redux";
import { useGetCategoriesQuery } from "../../../../state/api/product";
import { Oval } from "react-loader-spinner";

const ratingData = [1, 2, 4, 5];
const General = ({
  productData,
  setProductData,
  errorMessage,
  setErrorMessage,
}) => {
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
                Upload cover photo
              </div>
              {productData.cover && (
                <div className="w-[150px] h-[140px] relative">
                {" "}
                <img
                  className="text-white w-full h-full absolute"
                  src={productData.cover}
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
                  Select rating
                </InputLabel>
                <Select
                  fullWidth
                  required
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="rating"
                  type="number"
                  value={productData.rating}
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
                  label="Select rating"
                  className="rounded-md"
                >
                  {ratingData.map((item, i) => (
                    <MenuItem key={i} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "number",
                  name: "starting_quantity",
                  id: "starting_quantity",
                  label: "Starting Quantity",
                  value: productData.starting_quantity,
                  onChange: handleTextInputChange,
                  setErrorMessage,
                  errorMessages: errorMessage,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                inputProps={{
                  type: "number",
                  name: "starting_price",
                  id: "starting_price",
                  label: "Starting Price",
                  value: productData.starting_price,
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
                  multiline: true,
                  minRows: 3,
                  name: "information",
                  id: "information",
                  label: "Product Information",
                  value: productData.information,
                  onChange: handleTextInputChange,
                  setErrorMessage,
                  errorMessages: errorMessage,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default General;
