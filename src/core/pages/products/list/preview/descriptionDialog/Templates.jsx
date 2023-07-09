import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import { BsCardImage } from "react-icons/bs";

const Templates = ({ data }) => {

  return (
    <div className="w-fll h-full flex flex-col justify-between">
      <Box className="text-white">
        <Typography> {data.templates.instruction} </Typography>
        <div className="mt-3">
          {data.templates.content.map((item, index) => (
            <TemplateContent key={index} item={item} />
          ))}
        </div>
      </Box>
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
