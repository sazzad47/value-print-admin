import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Ribbon from "../../../../../components/Ribbon";
import Placeholder from "../../../../../components/Placeholder";
import Customize from "./Customize";
import { AiOutlineFileImage } from "react-icons/ai";
import { Collapse } from "react-collapse";

const Features = ({ features, setFeatures, featuresState, setFeaturesState }) => {
  const theme = useTheme();
  
  const handleBoxClick = (placeholder, title, index) => {
    setFeaturesState((prevFeaturesState) => ({
      ...prevFeaturesState,
      [placeholder]: title,
    }));

    const nextPlaceholderIndex = index + 1;
    const nextOptionsContainer = document.getElementById(
      `options-container-${nextPlaceholderIndex}`
    );

    if (nextOptionsContainer) {
      nextOptionsContainer.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
          width: "100%",
          minHeight: "400px",
          backgroundColor: theme.palette.primary[700],
          paddingBottom: "2rem"
        }}
      >
        {features?.map((item, placholderIndex) => {
          const isOpen =
            placholderIndex === 0 ||
            featuresState[features[placholderIndex - 1]?.placeholder];

          return (
            <div
              key={placholderIndex}
              id={`options-container-${placholderIndex}`}
              className="flex flex-col gap-3"
            > 
             <div className="relative h-[5rem]">
              <Placeholder text={item.placeholder} />
             </div>
              <Collapse isOpened={isOpen}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5">
                  {item.value.map((option, index) => (
                    <Box
                      key={index}
                      sx={{
                        bgcolor: theme.palette.primary[600],
                        "&:hover": {
                          backgroundColor: theme.palette.primary[800],
                        },
                        color: "white",
                      }}
                      onClick={() =>
                        handleBoxClick(
                          item.placeholder,
                          option.title,
                          placholderIndex
                        )
                      }
                      className="relative p-5 rounded-md cursor-pointer flex flex-col gap-1 items-center"
                    >
                      {option.is_popular && (
                        <span
                          style={{
                            color: theme.palette.text.primary,
                            background: theme.palette.secondary[700],
                          }}
                          className="absolute h-auto w-auto px-2 py-1 text-xs rounded-full top-2 right-2"
                        >
                          Popular
                        </span>
                      )}
                      <div className="w-[100px] h-[100px] relative">
                        {option.photo ? (
                          <img
                            src={option.photo}
                            alt="format"
                            className="w-full h-full absolute"
                          />
                        ) : (
                          <AiOutlineFileImage className="w-full h-full" />
                        )}
                      </div>

                      <Typography align="center" className="font-bold text-lg">
                        {option.title}
                      </Typography>
                      <Typography align="center" className="text-xs">
                        {option.description}
                      </Typography>
                    </Box>
                  ))}
                  {item.allow_customize && (
                    <Customize
                      placeholder={item.placeholder}
                      setFeatures={setFeatures}
                    />
                  )}
                </div>
              </Collapse>
            </div>
          );
        })}
      </Box>
    </Box>
  );
};

export default Features;
