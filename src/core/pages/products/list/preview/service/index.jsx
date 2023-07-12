import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Ribbon from "../../../../../components/Ribbon";
import Placeholder from "../../../../../components/Placeholder";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const Service = ({ data, services, setServices }) => {
  const theme = useTheme();

  return (
    <Box
      position=""
      sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <div className="w-full z-10">
        <Ribbon content="Choose Service Type" />
      </div>

      <Box
        sx={{
          width: "100%",
          height: "auto",
          backgroundColor: theme.palette.primary[700],
          paddingBottom: "2rem",
        }}
      >
        <div className="relative h-[5rem] w-full p-5">
          <Placeholder text="Design Service Type" />
        </div>
        <FormControl className="w-full mt-[40px]">
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 px-5">
              {services.map((item, index) => (
                <Box
                  sx={{
                    border: `1px solid ${theme.palette.primary[400]}`,
                  }}
                  key={index}
                  className="w-full flex flex-col gap-5 p-5"
                >
                  <FormControlLabel
                    value={item.title}
                    control={<Radio />}
                   
                    label={<Typography className="font-bold text-sm"> {item.title}</Typography>}
                  />
                  <div className="w-full h-full flex flex-col justify-between px-5">

                  <ul className="m-0 p-0">
                    {item.services.map((item, index)=> (
                        <li key={index} className="w-full">
                          <Typography className="text-xs whitespace-normal">{item}</Typography>
                        </li>
                    ))}
                  </ul>
                  <Typography sx={{color: theme.palette.secondary[200], mt:2, fontWeight: "bold"}}>
                    Price: {item.price}
                  </Typography>
                  </div>
                </Box>
              ))}
            </div>
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Service;
