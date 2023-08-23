import React, { useEffect, useState } from "react";
import InputField from "../../../../components/InputField";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { handleFileLoading } from "../../../../state";
import { useDispatch } from "react-redux";
import { imageUpload } from "../../../../utils/imageUpload";

const Variants = ({
  productData,
  setProductData,
  errorMessage,
  setErrorMessage,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [isPresentSubvariant, setIsPresentSubvariant] = useState(false);

  const handleChange = (event, index, field) => {
    const newData = { ...productData };
    newData.variants.value[index][field] = event.target.value;
    setProductData(newData);
  };

  const handleFileChange = async (event, index, field) => {
    dispatch(handleFileLoading(true));
    const newData = { ...productData };
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const cloudinaryURL = await imageUpload([file]);
      newData.variants.value[index][field] = cloudinaryURL[0];
      setProductData(newData);
      dispatch(handleFileLoading(false));
    }
  };

  const handlePriceChange = (event, parentIndex, index, field) => {
    const newData = { ...productData };
    newData.variants.value[parentIndex].price[index][field] =
      event.target.value;
    setProductData(newData);
  };

  const handleSubVariantChange = (event, parentIndex, index, field) => {
    const newData = { ...productData };
    newData.variants.value[parentIndex].subvariant.value[index][field] =
      event.target.value;
    setProductData(newData);
  };

  const handleSubVariantFileChange = async (
    event,
    parentIndex,
    index,
    field
  ) => {
    dispatch(handleFileLoading(true));
    const newData = { ...productData };
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const cloudinaryURL = await imageUpload([file]);
      newData.variants.value[parentIndex].subvariant.value[index][field] =
        cloudinaryURL[0];
      setProductData(newData);
      dispatch(handleFileLoading(false));
    }
  };

  const handleSubVariantPriceChange = (
    event,
    parentIndex,
    subIndex,
    index,
    field
  ) => {
    const newData = { ...productData };
    newData.variants.value[parentIndex].subvariant.value[subIndex].price[index][
      field
    ] = event.target.value;
    setProductData(newData);
  };

  const deleteVariant = (index) => {
    const newData = { ...productData };
    newData.variants.value.splice(index, 1);
    setProductData(newData);
  };

  const deletePrice = (parentIndex, index) => {
    const newData = { ...productData };
    newData.variants.value[parentIndex].price.splice(index, 1);
    setProductData(newData);
  };

  const deleteSubVariant = (parentIndex, index) => {
    const newData = { ...productData };
    newData.variants.value[parentIndex].subvariant.value.splice(index, 1);
    setProductData(newData);
  };

  const deleteSubVariantPrice = (parentIndex, subIndex, index) => {
    const newData = { ...productData };
    newData.variants.value[parentIndex].subvariant.value[subIndex].price.splice(
      index,
      1
    );
    setProductData(newData);
  };

  const addMoreVariant = () => {
    const newData = { ...productData };
    const newVariant = {
      is_default: false,
      is_popular: false,
      photo: "",
      title: "",
      description: "",
      subvariant: {
        placeholder: "",
        value: [
          {
            is_default: false,
            is_popular: false,
            photo: "",
            title: "",
            description: "",
            rp: "",
            dp: "",
            price: [
              {
                quantity: "",
                price: "",
                is_best_seller: false,
              },
            ],
          },
        ],
      },
      rp: "",
      dp: "",
      price: [
        {
          quantity: "",
          price: "",
          is_best_seller: false,
        },
      ],
    };
    newData.variants.value.push(newVariant);
    setProductData(newData);
  };

  const addMorePrice = (parentIndex) => {
    const newData = { ...productData };
    const newPrice = {
      quantity: "",
      price: "",
      is_best_seller: false,
    };
    newData.variants.value[parentIndex].price.push(newPrice);
    setProductData(newData);
  };

  const addMoreSubVariant = (parentIndex) => {
    const newData = { ...productData };
    const newSubVariant = {
      is_default: false,
      is_popular: false,
      photo: "",
      title: "",
      description: "",
      rp: "",
      dp: "",
      price: [
        {
          quantity: "",
          price: "",
          is_best_seller: false,
        },
      ],
    };
    newData.variants.value[parentIndex].subvariant.value.push(newSubVariant);
    setProductData(newData);
  };

  const addMoreSubVariantPrice = (parentIndex, subIndex) => {
    const newData = { ...productData };
    const newPrice = {
      quantity: "",
      price: "",
      is_best_seller: false,
    };
    newData.variants.value[parentIndex].subvariant.value[subIndex].price.push(
      newPrice
    );
    setProductData(newData);
  };

  useEffect(() => {
    const isSubvariantNotEmpty = productData?.variants?.value?.some(
      (variant) => {
        return (
          variant?.subvariant &&
          variant?.subvariant?.value &&
          variant?.subvariant?.value?.some((subvariant) => {
            return Object.values(subvariant).some(
              (value) => value !== false && value !== "" && value.length > 1
            );
          })
        );
      }
    );

    setIsPresentSubvariant(isSubvariantNotEmpty);
  }, [productData.variants]);

  return (
    <Grid className="mb-2 w-full">
      <div className="mb-2 w-full px-3 py-2 bg-gray-700 text-sm">
        {" "}
        In this section, you have to configure the feaures that cuase variations
        in the pricing of the product.
      </div>
      <InputField
        inputProps={{
          type: "text",
          name: "placeholder",
          id: "placeholder",
          label: "Placeholder",
          value: productData.variants.placeholder,
          onChange: (event) =>
            setProductData({
              ...productData,
              variants: {
                ...productData.variants,
                placeholder: event.target.value,
              },
            }),
          setErrorMessage,
          errorMessages: errorMessage,
        }}
      />
      <Typography className="text-md font-bold mt-3 mb-2"> Options </Typography>
      {productData?.variants?.value?.map((variant, index) => (
        <Grid container key={index} spacing={2} className="mb-3">
          <Grid item xs={12}>
            {index > 0 && (
              <Grid className="w-full flex justify-end text-white">
                <IconButton
                  onClick={() => deleteVariant(index)}
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
                  value: variant.title,
                  onChange: (event) => handleChange(event, index, "title"),
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
                  value: variant.description,
                  onChange: (event) =>
                    handleChange(event, index, "description"),
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
                  value={variant.is_default}
                  onChange={(event) => handleChange(event, index, "is_default")}
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
                  value={variant.is_popular}
                  onChange={(event) => handleChange(event, index, "is_popular")}
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
              {variant.photo && (
                <div className="w-[150px] h-[140px] relative">
                  {" "}
                  <img
                    className="text-white w-full h-full absolute"
                    src={variant.photo}
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
                  onChange={(event) => handleFileChange(event, index, "photo")}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-[5px] file:rounded-r-none file:border-0 file:h-[56px] file:cursor-pointer file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-900/2 common-input cursor-pointer rounded-md text-secondaryTheme"
                />
              </label>

              <Typography className="mt-2">
                {" "}
                Does this variant have any subvariant?{" "}
              </Typography>
              <FormControl className="w-full">
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  value={isPresentSubvariant}
                  onChange={() => setIsPresentSubvariant(!isPresentSubvariant)}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    sx={{
                      "& .MuiButtonBase-root": {
                        color: "white",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                    }}
                    label="Yes"
                    className="text-white"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    sx={{
                      "& .MuiButtonBase-root": {
                        color: "white",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "white",
                      },
                    }}
                    label="No"
                    className="text-white"
                  />
                </RadioGroup>
              </FormControl>

              {isPresentSubvariant && (
                <>
                  <Typography className="text-lg font-bold">
                    {" "}
                    Subvariant{" "}
                  </Typography>
                  <InputField
                    inputProps={{
                      type: "text",
                      name: `subvariant-placeholder-${index}`,
                      id: `subvariant-placeholder-${index}`,
                      label: "placeholder",
                      value: variant.subvariant.placeholder,
                      onChange: (event) => {
                        const newData = { ...productData };
                        newData.variants.value[index].subvariant.placeholder =
                          event.target.value;
                        setProductData(newData);
                      },
                      setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                  <Typography className="text-md font-bold mt-3 mb-1">
                    {" "}
                    Options{" "}
                  </Typography>
                  {variant.subvariant.value.map(
                    (subvariant, subvariantIndex) => (
                      <div
                        key={subvariantIndex}
                        className="flex flex-col gap-2"
                      >
                        {subvariantIndex > 0 && (
                          <Grid className="w-full flex justify-end text-white -mb-2">
                            <IconButton
                              onClick={() =>
                                deleteSubVariant(index, subvariantIndex)
                              }
                              className="text-inherit flex justify-start p-0 focus:outline-none normal-case mb-1"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Grid>
                        )}
                        <InputField
                          inputProps={{
                            type: "text",
                            name: `subvariant-title-${index}-${subvariantIndex}`,
                            id: `subvariant-title-${index}-${subvariantIndex}`,
                            label: "Title",
                            value: subvariant.title,
                            onChange: (event) =>
                              handleSubVariantChange(
                                event,
                                index,
                                subvariantIndex,
                                "title"
                              ),
                            setErrorMessage,
                            errorMessages: errorMessage,
                          }}
                        />
                        <InputField
                          inputProps={{
                            type: "text",
                            name: `subvariant-description-${index}-${subvariantIndex}`,
                            id: `subvariant-description-${index}-${subvariantIndex}`,
                            label: "Description",
                            value: subvariant.description,
                            onChange: (event) =>
                              handleSubVariantChange(
                                event,
                                index,
                                subvariantIndex,
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
                            value={subvariant.is_default}
                            onChange={(event) =>
                              handleSubVariantChange(
                                event,
                                index,
                                subvariantIndex,
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
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
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
                            value={subvariant.is_popular}
                            onChange={(event) =>
                              handleSubVariantChange(
                                event,
                                index,
                                subvariantIndex,
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
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
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
                        {subvariant.photo && (
                          <div className="w-[150px] h-[140px] relative">
                            {" "}
                            <img
                              className="text-white w-full h-full absolute"
                              src={subvariant.photo}
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
                              handleSubVariantFileChange(
                                event,
                                index,
                                subvariantIndex,
                                "photo"
                              )
                            }
                            className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-[5px] file:rounded-r-none file:border-0 file:h-[56px] file:cursor-pointer file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-900/2 common-input cursor-pointer rounded-md text-secondaryTheme"
                          />
                        </label>
                        <InputField
                          inputProps={{
                            type: "number",
                            name: `subvariant-rp-${index}-${subvariantIndex}`,
                            id: `subvariant-rp-${index}-${subvariantIndex}`,
                            label: "Root price of the product",
                            value: subvariant.rp,
                            onChange: (event) =>
                              handleSubVariantChange(
                                event,
                                index,
                                subvariantIndex,
                                "rp"
                              ),
                            setErrorMessage,
                            errorMessages: errorMessage,
                          }}
                        />
                        <InputField
                          inputProps={{
                            type: "number",
                            name: `subvariant-dp-${index}-${subvariantIndex}`,
                            id: `subvariant-dp-${index}-${subvariantIndex}`,
                            label:
                              "Discounted Percentage Per Quantiy Increament",
                            value: subvariant.dp,
                            onChange: (event) =>
                              handleSubVariantChange(
                                event,
                                index,
                                subvariantIndex,
                                "dp"
                              ),
                            setErrorMessage,
                            errorMessages: errorMessage,
                          }}
                        />
                        {subvariant.price.map((subPrice, subPriceIndex) => (
                          <div
                            key={subPriceIndex}
                            className="flex flex-col gap-2"
                          >
                            {subPriceIndex > 0 && (
                              <Grid className="w-full flex justify-end text-white -mb-2">
                                <IconButton
                                  onClick={() =>
                                    deleteSubVariantPrice(
                                      index,
                                      subvariantIndex,
                                      subPriceIndex
                                    )
                                  }
                                  className="text-inherit flex justify-start p-0 focus:outline-none normal-case mb-1"
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Grid>
                            )}
                            <InputField
                              inputProps={{
                                type: "number",
                                name: `subvariant-price-quantity-${index}-${subvariantIndex}-${subPriceIndex}`,
                                id: `subvariant-price-quantity-${index}-${subvariantIndex}-${subPriceIndex}`,
                                label: "Quantity",
                                value: subPrice.quantity,
                                onChange: (event) =>
                                  handleSubVariantPriceChange(
                                    event,
                                    index,
                                    subvariantIndex,
                                    subPriceIndex,
                                    "quantity"
                                  ),
                                setErrorMessage,
                                errorMessages: errorMessage,
                              }}
                            />
                            <InputField
                              inputProps={{
                                type: "number",
                                name: `subvariant-price-value-${index}-${subvariantIndex}-${subPriceIndex}`,
                                id: `subvariant-price-value-${index}-${subvariantIndex}-${subPriceIndex}`,
                                label: "Price",
                                value: subPrice.price,
                                onChange: (event) =>
                                  handleSubVariantPriceChange(
                                    event,
                                    index,
                                    subvariantIndex,
                                    subPriceIndex,
                                    "price"
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
                                Best Seller
                              </InputLabel>
                              <Select
                                fullWidth
                                required
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="is_best_seller"
                                value={subPrice.is_best_seller}
                                onChange={(event) =>
                                  handleSubVariantPriceChange(
                                    event,
                                    index,
                                    subvariantIndex,
                                    subPriceIndex,
                                    "is_best_seller"
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
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
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
                                label="Best Seller"
                                className="rounded-md"
                              >
                                <MenuItem value={true}>true</MenuItem>
                                <MenuItem value={false}>false</MenuItem>
                              </Select>
                            </FormControl>
                          </div>
                        ))}
                        <div className="w-full flex justify-end">
                          <Button
                            onClick={() =>
                              addMoreSubVariantPrice(index, subvariantIndex)
                            }
                            variant="outlined"
                            startIcon={<AddCircleOutlineIcon />}
                            disableRipple
                            sx={{ color: theme.palette.text.primary }}
                            className="mt-2 focus:outline-none normal-case px-4"
                          >
                            Add another quantity
                          </Button>
                        </div>
                      </div>
                    )
                  )}
                  <div className="w-full flex justify-start">
                    <Button
                      onClick={() => addMoreSubVariant(index)}
                      variant="outlined"
                      startIcon={<AddCircleOutlineIcon />}
                      disableRipple
                      sx={{ color: theme.palette.text.primary }}
                      className="mt-2 focus:outline-none normal-case px-4"
                    >
                      Add another subvariant
                    </Button>
                  </div>
                </>
              )}
            </Grid>
            {!isPresentSubvariant && (
              <div className="mt-2 flex flex-col gap-2 ">
                <InputField
                  inputProps={{
                    type: "number",
                    name: `rp-${index}`,
                    id: `rp-${index}`,
                    label: "Root price of the product",
                    value: variant.rp,
                    onChange: (event) => handleChange(event, index, "rp"),
                    setErrorMessage,
                    errorMessages: errorMessage,
                  }}
                />
                <InputField
                  inputProps={{
                    type: "number",
                    name: `dp-${index}`,
                    id: `dp-${index}`,
                    label: "Discounted Percentage Per Quantiy Increament",
                    value: variant.dp,
                    onChange: (event) => handleChange(event, index, "dp"),
                    setErrorMessage,
                    errorMessages: errorMessage,
                  }}
                />
                {variant.price.map((price, priceIndex) => (
                  <div key={priceIndex} className="flex flex-col gap-2">
                    {priceIndex > 0 && (
                      <Grid className="w-full flex justify-end text-white -mb-2">
                        <IconButton
                          onClick={() => deletePrice(index)}
                          className="text-inherit flex justify-start p-0 focus:outline-none normal-case mb-1"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    )}
                    <InputField
                      inputProps={{
                        type: "number",
                        name: `price-quantity-${index}-${priceIndex}`,
                        id: `price-quantity-${index}-${priceIndex}`,
                        label: "Quantity",
                        value: price.quantity,
                        onChange: (event) =>
                          handlePriceChange(
                            event,
                            index,
                            priceIndex,
                            "quantity"
                          ),
                        setErrorMessage,
                        errorMessages: errorMessage,
                      }}
                    />
                    <InputField
                      inputProps={{
                        type: "number",
                        name: `price-value-${index}-${priceIndex}`,
                        id: `price-value-${index}-${priceIndex}`,
                        label: "Price",
                        value: price.price,
                        onChange: (event) =>
                          handlePriceChange(event, index, priceIndex, "price"),
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
                        Best Seller
                      </InputLabel>
                      <Select
                        fullWidth
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="is_best_seller"
                        value={price.is_best_seller}
                        onChange={(event) =>
                          handlePriceChange(
                            event,
                            index,
                            priceIndex,
                            "is_best_seller"
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
                        label="Best Seller"
                        className="rounded-md"
                      >
                        <MenuItem value={true}>true</MenuItem>
                        <MenuItem value={false}>false</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                ))}
                <div className="w-full flex justify-end">
                  <Button
                    onClick={() => addMorePrice(index)}
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    disableRipple
                    sx={{ color: theme.palette.text.primary }}
                    className="mt-2 focus:outline-none normal-case px-4"
                  >
                    Add another quantity
                  </Button>
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      ))}
      <Button
        onClick={addMoreVariant}
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        disableRipple
        sx={{ color: theme.palette.text.primary }}
        className="mt-2 focus:outline-none normal-case px-4"
      >
        Add Another Variant
      </Button>
    </Grid>
  );
};

export default Variants;
