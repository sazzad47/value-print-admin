import React from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import Ribbon from "../../../../../components/Ribbon";
import Placeholder from "../../../../../components/Placeholder";
import { BsInfoCircle } from "react-icons/bs";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const Price = ({ price, setPrice, priceState, setPriceState }) => {
  const theme = useTheme();

  const data = [
    {
      price: "500",
      quantity: "50",
      is_best_seller: true,
    },
    {
      price: "600",
      quantity: "60",
      is_best_seller: true,
    },
    {
      price: "700",
      quantity: "70",
      is_best_seller: false,
    },
    {
      price: "800",
      quantity: "80",
      is_best_seller: false,
    },
    {
      price: "900",
      quantity: "90",
      is_best_seller: false,
    },
    {
      price: "1000",
      quantity: "100",
      is_best_seller: false,
    },

    // Add more objects to the data array if needed
  ];

  const splitData = (data, numArrays) => {
    const dataLength = Object.keys(data).length;
    const itemsPerArray = Math.floor(dataLength / numArrays);

    const arrays = Array.from({ length: numArrays }, (_, index) => {
      const startIndex = index * itemsPerArray;
      const endIndex = startIndex + itemsPerArray;
      return Object.values(data).slice(startIndex, endIndex);
    });

    return {
      array1: arrays[0],
      array2: arrays[1],
      array3: arrays[2],
    };
  };

  const { array1, array2, array3 } = splitData(data, 3);

  return (
    <Box
      position=""
      sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <div className="w-full z-10">
        <Ribbon content="Choose Price & Quantity" />
      </div>

      <Box
        sx={{
          width: "100%",
          minHeight: "400px",
          backgroundColor: theme.palette.primary[700],
        }}
      >
        <div className="relative w-full flex items-center justify-end p-5">
          <Placeholder text="Quantity" />
          <Button
            sx={{
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[200],
            }}
            className="mt-[30px]"
          >
            Customize Quantity
          </Button>
        </div>
        <Box className="p-5">
          <Box
            sx={{
              bgcolor: theme.palette.primary[400],
              color: theme.palette.secondary[200],
            }}
            className="flex items-start text-sm gap-2 px-3 py-2 rounded-lg"
          >
            <BsInfoCircle className="text-lg" />
            <Typography>
              Prices quoted are for one design only. Should you have multiple
              designs, add multiple items to your cart before checkout.
            </Typography>
          </Box>
        </Box>
        <FormControl className="w-full">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 p-5">
              <div className="">
                {array1.map((item, index) => (
                  <Box
                    sx={{
                      border: `1px solid ${theme.palette.primary[400]}`,
                      borderBottom: 0,
                      "&:last-child": {
                        borderBottom: `1px solid ${theme.palette.primary[400]}`,
                      },
                    }}
                    key={index}
                    className="w-full flex items-start justify-between p-5"
                  >
                    <FormControlLabel
                      value={item.quantity}
                      control={<Radio />}
                      sx={{
                        "& .MuiButtonBase-root": {
                          margin: 0,
                          padding: 0,
                          marginRight: "7px",
                        },
                      }}
                      label={item.quantity}
                    />

                    <div className="flex flex-col gap-2">
                      <Typography className="font-bold">
                        {" "}
                        ${item.price}
                      </Typography>
                      <Typography className="text-xs"> $10/pc </Typography>
                    </div>
                  </Box>
                ))}
              </div>

              {/* Render the second container */}
              <div className="">
                {array2.map((item, index) => (
                  <Box
                    sx={{
                      border: `1px solid ${theme.palette.primary[400]}`,
                      borderBottom: 0,
                      "&:last-child": {
                        borderBottom: `1px solid ${theme.palette.primary[400]}`,
                      },
                    }}
                    key={index}
                    className="w-full flex justify-between p-5"
                  >
                    <FormControlLabel
                      value={item.quantity}
                      control={<Radio />}
                      sx={{
                        "& .MuiButtonBase-root": {
                          margin: 0,
                          padding: 0,
                          marginRight: "7px",
                        },
                      }}
                      label={item.quantity}
                    />

                    <div className="flex flex-col gap-2">
                      <Typography className="font-bold">
                        {" "}
                        ${item.price}
                      </Typography>
                      <Typography className="text-xs"> $10/pc </Typography>
                    </div>
                  </Box>
                ))}
              </div>

              {/* Render the third container */}
              <div className="">
                {array3.map((item, index) => (
                  <Box
                    sx={{
                      border: `1px solid ${theme.palette.primary[400]}`,
                      borderBottom: 0,
                      "&:last-child": {
                        borderBottom: `1px solid ${theme.palette.primary[400]}`,
                      },
                    }}
                    key={index}
                    className="w-full flex justify-between p-5"
                  >
                    <FormControlLabel
                      value={item.quantity}
                      control={<Radio />}
                      sx={{
                        "& .MuiButtonBase-root": {
                          margin: 0,
                          padding: 0,
                          marginRight: "7px",
                        },
                      }}
                      label={item.quantity}
                    />

                    <div className="flex flex-col gap-2">
                      <Typography className="font-bold">
                        {" "}
                        ${item.price}
                      </Typography>
                      <Typography className="text-xs"> $10/pc </Typography>
                    </div>
                  </Box>
                ))}
              </div>
            </div>
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Price;
