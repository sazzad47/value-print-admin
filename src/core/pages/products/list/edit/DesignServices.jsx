import React from "react";
import InputField from "../../../../components/InputField";
import {
  Button,
  Grid,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const DesignServices = ({
  productData,
  setProductData,
  errorMessage,
  setErrorMessage,
}) => {
  const theme = useTheme();

  const handleChange = (event, index, field) => {
    const newData = [...productData.design_services];
    newData[index] = {
      ...newData[index],
      [field]: event.target.value,
    };
    setProductData((prevData) => ({
      ...prevData,
      design_services: newData,
    }));
  };

  const handleChangeService = (event, parentIndex, index) => {
    const updatedData = [...productData.design_services];
    updatedData[parentIndex].services[index].content = event.target.value;
    setProductData((prevData) => ({
      ...prevData,
      design_services: updatedData,
    }));
  };

  const deleteDesignServices = (index) => {
    const updatedData = [...productData.design_services];
    updatedData.splice(index, 1);
    setProductData((prevData) => ({
      ...prevData,
      design_services: updatedData,
    }));
  };

  const deleteServices = (parentIndex, index) => {
    const updatedData = [...productData.design_services];
    updatedData[parentIndex].services.splice(index, 1);
    setProductData((prevData) => ({
      ...prevData,
      design_services: updatedData,
    }));
  };

  const addMoreDesignServices = () => {
    const newOption = {
      title: "",
      price: null,
      services: [{ content: "" }],
    };
    setProductData((prevData) => ({
      ...prevData,
      design_services: [...prevData.design_services, newOption],
    }));
  };

  const addMoreServices = (parentIndex) => {
    const updatedData = [...productData.design_services];
    updatedData[parentIndex].services.push({ content: "" });
    setProductData((prevData) => ({
      ...prevData,
      design_services: updatedData,
    }));
  };

  return (
    <Grid className="mb-2 w-full">
     
          {productData.design_services.map((item, index) => (
            <Grid container key={index} spacing={2} className="mb-3">
              <Grid item xs={12}>
                {index > 0 && (
                  <Grid className="w-full flex justify-end text-white">
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => deleteDesignServices(index)}
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
                      type: "text",
                      name: "title",
                      id: "title",
                      label: "Title",
                      value: item.title,
                      onChange: (event) => handleChange(event, index, "title"),
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
                  {item.services.map((service, serviceIndex) => (
                    <div key={serviceIndex}>
                      <div className="w-full flex justify-end">
                        {serviceIndex > 0 && (
                          <IconButton
                            onClick={() => deleteServices(index, serviceIndex)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </div>
                      <InputField
                        inputProps={{
                          type: "text",
                          name: "services",
                          id: `services-${index}-${serviceIndex}`,
                          label: "Service",
                          value: service.content,
                          onChange: (event) =>
                            handleChangeService(event, index, serviceIndex),
                          setErrorMessage,
                          errorMessages: errorMessage,
                        }}
                      />
                    </div>
                  ))}
                  <Grid className="w-full flex justify-end">
                    <Button
                      onClick={() => addMoreServices(index)}
                      variant="outlined"
                      startIcon={<AddCircleOutlineIcon />}
                      disableRipple
                      sx={{ color: theme.palette.text.primary }}
                      className="mt-2 focus:outline-none normal-case px-4"
                    >
                      Add {item.services.length > 0 ? "another" : "a"} service
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))}
          <Button
            onClick={addMoreDesignServices}
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            disableRipple
            sx={{ color: theme.palette.text.primary }}
            className="mt-2 focus:outline-none normal-case px-4"
          >
            Add another design service
          </Button>
    </Grid>
  );
};

export default DesignServices;
