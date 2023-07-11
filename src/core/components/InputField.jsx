import ErrorIcon from "@mui/icons-material/Error";
import { Grid, TextField, Typography } from "@mui/material";

const InputField = ({ inputProps }) => {
  const { type, name, id, label, value, onChange, setErrorMessage } =
    inputProps;

    const errorMessages = inputProps.errorMessages || {};

  return (
    <div>
      <TextField
        type={type}
        name={name}
        value={value}
        required
        fullWidth
        id={id}
        label={label}
        onChange={onChange}
        onFocus={() =>
          setErrorMessage((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }))
        }
        sx={{
          label: {
            color: "rgb(214 211 209)",
          },
          "& label.Mui-focused": {
            color: "rgb(214 211 209)",
          },
          "& .MuiOutlinedInput-root": {
            color: "white",
            "& fieldset": {
              color: "white",
              borderColor: "rgb(120 113 108)",
            },
            "&:hover fieldset": {
              borderColor: "rgb(168 162 158)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgb(214 211 209)",
            },
          },
        }}
      />
      {errorMessages[name] && errorMessages[name] !== "" && (
        <Grid className="flex items-center mt-2 gap-2 text-secondaryTheme">
          <ErrorIcon />
          <Typography className="p-0 text-sm">{errorMessages[name]}</Typography>
        </Grid>
      )}
    </div>
  );
};

export default InputField;
