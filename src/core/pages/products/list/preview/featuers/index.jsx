import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Ribbon from "../../../../../components/Ribbon";
import Placeholder from "../../../../../components/Placeholder";
import nameCard from "../../../../../assets/name-card.png";
const Features = ({ data }) => {
  console.log("data", data);
  const theme = useTheme();
  return (
    <Box
      position=""
      sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}
    >
      <div className="w-full z-10">
        <Ribbon content="Choose Your Options" />
      </div>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          minHeight: "400px",
          backgroundColor: theme.palette.primary[700],
        }}
      >
        <div className="flex flex-col gap-3">
          <Placeholder text="Choose Format" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-[100px] p-5">
            <Box
              sx={{
                bgcolor: theme.palette.primary[600],
                "&:hover": {
                  backgroundColor: theme.palette.primary[800],
                },
              }}
              onClick={() => {}}
              className="p-5 rounded-md cursor-pointer flex flex-col gap-1 items-center justify-between"
            >
              <div className="w-[100px] h-[100px] relative">
                <img
                  src={nameCard}
                  alt="format"
                  className="w-full h-full absolute"
                />
              </div>

              <Typography align="center" className="font-bold text-lg">
                9 x 5.4 cm
              </Typography>
              <Typography align="center" className="text-xs">
                Standard business card / loyalty card format
              </Typography>
            </Box>
            <Box
              sx={{
                bgcolor: theme.palette.primary[600],
                "&:hover": {
                  backgroundColor: theme.palette.primary[800],
                },
              }}
              onClick={() => {}}
              className="p-5 rounded-md cursor-pointer flex flex-col gap-1 items-center justify-between"
            >
              <div className="w-[100px] h-[100px] relative">
                <img
                  src={nameCard}
                  alt="format"
                  className="w-full h-full absolute"
                />
              </div>

              <Typography align="center" className="font-bold text-lg">
                9 x 5.4 cm
              </Typography>
              <Typography align="center" className="text-xs">
                Standard business card / loyalty card format
              </Typography>
            </Box>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Features;
