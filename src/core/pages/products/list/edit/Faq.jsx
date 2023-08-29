import React from "react";
import InputField from "../../../../components/InputField";
import { Button, Grid, IconButton, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const Faq = ({
  productData,
  setProductData,
  errorMessage,
  setErrorMessage,
}) => {
  const theme = useTheme();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      faq: {
        ...prevData.faq,
        [name]: value,
      },
    }));
  };

  const handleContentChange = (event, index, field) => {
    const newData = { ...productData };
    newData.faq.content[index][field] = event.target.value;
    setProductData(newData);
  };

  const deleteFaq = (index) => {
    const newData = { ...productData };
    newData.faq.content.splice(index, 1);
    setProductData(newData);
  };

  const addMoreFaq = () => {
    const newData = { ...productData };
    newData.faq.content.push({ question: "", answer: "" });
    setProductData(newData);
  };
  
  return (
    <Grid className="mb-2 w-full">
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <InputField
            inputProps={{
              type: "text",
              name: "instruction",
              id: "instruction",
              label: "Instruction",
              value: productData.faq.instruction,
              onChange: handleChange,
              setErrorMessage,
              errorMessages: errorMessage,
            }}
          />
          {productData.faq.content.map((item, index) => (
            <Grid container key={index} spacing={2} className="mb-3 mt-1">
              <Grid item xs={12}>
                {index > 0 && (
                  <Grid className="w-full flex justify-end text-white">
                    <IconButton
                      onClick={() => deleteFaq(index)}
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
                      name: `question-${index}`,
                      id: `question-${index}`,
                      label: "Question",
                      value: item.question,
                      onChange: (event) =>
                        handleContentChange(event, index, "question"),
                      setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                  <InputField
                    inputProps={{
                      type: "text",
                      name: `answer-${index}`,
                      id: `answer-${index}`,
                      label: "Answer",
                      value: item.answer,
                      onChange: (event) =>
                        handleContentChange(event, index, "answer"),
                      setErrorMessage,
                      errorMessages: errorMessage,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} className="w-full flex justify-end">
          <Button
            onClick={addMoreFaq}
            variant="outlined"
            startIcon={<AddCircleOutlineIcon />}
            disableRipple
            sx={{ color: theme.palette.text.primary }}
            className="mt-2 focus:outline-none normal-case px-4"
          >
            Add another FAQ
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Faq;
