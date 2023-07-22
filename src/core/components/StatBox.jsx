import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import { Oval } from "react-loader-spinner";

const StatBox = ({ isLoading, value, increase, icon, description }) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <FlexBetween>

      {isLoading ? (
        <div className="">
          <Oval
            height={25}
            width={25}
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
        <Typography
          variant="h3"
          fontWeight="600"
          sx={{ color: theme.palette.secondary[200] }}
        >
          {value}
        </Typography>
      )}
              {icon}
      </FlexBetween>

      <FlexBetween gap="1rem">
        <Typography className="mt-5">{description}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default StatBox;
