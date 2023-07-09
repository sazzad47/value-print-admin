import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import { BsCardImage } from "react-icons/bs";

const Templates = ({ setOpenDialog, data }) => {
  const theme = useTheme();

  return (
    <div className="w-fll h-full flex flex-col justify-between">
      <Box className="fade h-[80%] text-white">
        <Typography> {data.templates.instruction} </Typography>
        <div className="mt-3">
          {data.templates.content.map((item, index) => (
            <TemplateContent key={index} item={item} />
          ))}
        </div>
      </Box>
      <div className="w-full flex items-center justify-center">
        <Button
          onClick={() => setOpenDialog(true)}
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

const TemplateContent = ({ item }) => {
  const handleDownloadPdf = () => {
    window.open(item.pdf, "_blank");
  };

  const handleDownloadImage = () => {
    window.open(item.image, "_blank");
  };

  return (
    <div className="flex flex-col">
      <Divider />
      <div className="flex items-center justify-between pt-3 pb-3 px-4">
        <Typography className="font-bold">{item.format}</Typography>
        <div>
          <FaFilePdf className="cursor-pointer text-lg" onClick={handleDownloadPdf} />
        </div>
        <div>
          <BsCardImage className="cursor-pointer text-lg" onClick={handleDownloadImage} />
        </div>
      </div>
    </div>
  );
};

export default Templates;
