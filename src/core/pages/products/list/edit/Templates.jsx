import React from "react";
import InputField from "../../../../components/InputField";
import { Button, Grid, IconButton, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { handleFileLoading } from "../../../../state";
import { useDispatch } from "react-redux";
import { imageUpload } from "../../../../utils/imageUpload";

const Templates = ({
  productData,
  setProductData,
  errorMessage,
  setErrorMessage,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      templates: {
        ...prevData.templates,
        [name]: value,
      },
    }));
  };

  const handleContentChange = (event, index, field) => {
    const newData = { ...productData };
    newData.templates.content[index][field] = event.target.value;
    setProductData(newData);
  };

  const handleContentFileChange = async (event, index, field) => {
    dispatch(handleFileLoading(true));
    const newData = { ...productData };
     const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      const cloudinaryURL = await imageUpload([file]);
      newData.templates.content[index][field] = cloudinaryURL[0];
      setProductData(newData);
      dispatch(handleFileLoading(false));
    }
   
  };

  const deleteTemplate = (index) => {
    const newData = { ...productData };
    newData.templates.content.splice(index, 1);
    setProductData(newData);
  };

  const addMoreTemplate = () => {
    const newData = { ...productData };
    newData.templates.content.push({ title: "", description: "" });
    setProductData(newData);
  };

  return (
    <Grid className=" mb-2 w-full">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <InputField
            inputProps={{
              type: "text",
              name: "instruction",
              id: "instruction",
              label: "Instruction",
              value: productData.templates.instruction,
              onChange: handleChange,
              setErrorMessage,
              errorMessages: errorMessage,
            }}
          />
          {productData.templates.content.map((item, index) => (
            <Grid container key={index} spacing={2} className="mb-3 mt-1">
              <Grid item xs={12}>
                {index > 0 && (
                  <Grid className="w-full flex justify-end text-white">
                    <IconButton
                      onClick={() => deleteTemplate(index)}
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
                      name: `format-${index}`,
                      id: `format-${index}`,
                      label: "Format",
                      value: item.format,
                      onChange: (event) =>
                        handleContentChange(event, index, "format"),
                      setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                  <div className="block mb-1 text-sm font-semibold text-secondaryTheme">
                    Upload PDF
                  </div>
                  {item.pdf && (
                    <div>
                      {" "}
                      <a
                        className="text-white"
                        href={item.pdf}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Uploaded
                      </a>{" "}
                    </div>
                  )}
                   <label className="block">
                    <span className="sr-only">Upload a pdf</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      name="pdf"
                      onChange={(event) =>
                        handleContentFileChange(event, index, "pdf")
                      }
                      className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-[5px] file:rounded-r-none file:border-0 file:h-[56px] file:cursor-pointer file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-900/2 common-input cursor-pointer rounded-md text-secondaryTheme"
                    />
                  </label>
                  <div className="block mb-1 text-sm font-semibold text-secondaryTheme">
                    Upload Image
                  </div>
                  {item.image && (
                    <div className="w-[150px] h-[140px] relative">
                      {" "}
                      <img
                        className="text-white w-full h-full absolute"
                        src={item.image}
                        alt=""
                      />
                    </div>
                  )}
                   <label className="block">
                    <span className="sr-only">Upload an image</span>
                    <input
                      type="file"
                      accept="image/*"
                      name="image"
                      onChange={(event) =>
                        handleContentFileChange(event, index, "image")
                      }
                      className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-[5px] file:rounded-r-none file:border-0 file:h-[56px] file:cursor-pointer file:text-sm file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-900/2 common-input cursor-pointer rounded-md text-secondaryTheme"
                    />
                  </label>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} className="w-full flex justify-end">
          <Button
            onClick={addMoreTemplate}
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            disableRipple
            sx={{ color: theme.palette.text.primary }}
            className="mt-2 focus:outline-none normal-case px-4"
          >
            Add another template
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Templates;
