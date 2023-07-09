import { Box, Button, useTheme } from "@mui/material";
import React from "react";

const Information = ({setOpenDialog, data}) => {
  const theme = useTheme();

  return (
    <div className="w-fll h-full flex flex-col justify-between">
      <Box className="fade h-[80%] text-white">
        {data.information}
      </Box>
      <div className="w-full flex items-center justify-center">
        <Button
         onClick={()=> setOpenDialog(true)}
          sx={{
            bgcolor: theme.palette.primary[700],
            color: theme.palette.text.primary,
            "&:hover": {
              backgroundColor: theme.palette.primary[800],
              color: theme.palette.text.primary,
            },
          }}
          variant="outlined"
        >
          See More
        </Button>
      </div>
    </div>
  );
};

export default Information;
