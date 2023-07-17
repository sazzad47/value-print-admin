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
  Tooltip,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Price = ({
  productData,
  setProductData,
  errorMessage,
  setErrorMessage,
}) => {
  const theme = useTheme();

  const handleTextInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChange = (event, index, field) => {
    const newData = [...productData.price];
    newData[index] = {
      ...newData[index],
      [field]: event.target.value,
    };
    setProductData((prevData) => ({
      ...prevData,
      price: newData,
    }));
  };


  const deletePrice = (index) => {
    const updatedData = [...productData.price];
    updatedData.splice(index, 1);
    setProductData((prevData) => ({
      ...prevData,
      price: updatedData,
    }));
  };

  const addMorePrice = () => {
    const newOption = {
      title: "",
      price: null,
      services: [{ content: "" }],
    };
    setProductData((prevData) => ({
      ...prevData,
      price: [...prevData.price, newOption],
    }));
  };

  return (
    <Grid className="mb-2 w-full">
      <div className="mb-2 w-full px-3 py-2 bg-gray-700 text-sm">
        {" "}
        In this section, you have to configure the general pricing of the
        product. Please skip this section if you already set the pricinig in the
        variant section.{" "}
      </div>
      <Grid className="flex flex-col w-full gap-2">
        <InputField
          inputProps={{
            type: "number",
            name: "rp",
            id: "rp",
            label: "Root price of the product",
            value: productData.rp,
            onChange: handleTextInputChange,
            setErrorMessage,
            errorMessages: errorMessage,
          }}
        />
        <InputField
          inputProps={{
            type: "number",
            name: "dp",
            id: "dp",
            label: "Discounted Percentage Per Quantiy Increament",
            value: productData.dp,
            onChange: handleTextInputChange,
            setErrorMessage,
            errorMessages: errorMessage,
          }}
        />{" "}
      </Grid>
      {productData.price.map((item, index) => (
        <Grid container key={index} spacing={2} className="mb-3 mt-4">
          <Grid item xs={12}>
            {index > 0 && (
              <Grid className="w-full flex justify-end text-white">
                <Tooltip title="Delete">
                  <IconButton
                    onClick={() => deletePrice(index)}
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
                  type: "number",
                  name: "quantity",
                  id: "quantity",
                  label: "Quantity",
                  value: item.quantity,
                  onChange: (event) => handleChange(event, index, "quantity"),
                  setErrorMessage,
                  errorMessages: errorMessage,
                }}
              />
              <InputField
                inputProps={{
                  type: "number",
                  name: "price",
                  id: "price",
                  label: "Price",
                  value: item.price,
                  onChange: (event) => handleChange(event, index, "price"),
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
                  value={item.is_best_seller}
                  onChange={(event) =>
                    handleChange(event, index, "is_best_seller")
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
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Button
        onClick={addMorePrice}
        variant="outlined"
        startIcon={<AddCircleOutlineIcon />}
        disableRipple
        sx={{ color: theme.palette.text.primary }}
        className="mt-2 focus:outline-none normal-case px-4"
      >
        Add another price
      </Button>
    </Grid>
  );
};

export default Price;
