import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ErrorIcon from "@mui/icons-material/Error";
import {
  useCreateBillingAddressMutation,
  useGetBillingAddressQuery,
  useUpdateBillingAddressMutation,
} from "../../../state/api/user";
import { ColorRing, Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { countries } from "countries-list";
import { handleNotification } from "../../../state";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";

export default function BillingAddress() {
  const { access_token } = useSelector((state) => state.global);

  const [createBillingAddress, { isLoading: isCreatingBillingAddress }] =
    useCreateBillingAddressMutation();

  const [updateBillingAddress, { isLoading: isUpdatingBillingAddress }] =
    useUpdateBillingAddressMutation();

  const { data, isLoading: isFetchingBillingAddress } =
    useGetBillingAddressQuery({ access_token });

  const dispatch = useDispatch();

  const getAllCountries = () => {
    const countryNames = Object.values(countries).map(
      (country) => country.name
    );
    return countryNames;
  };

  const countryArray = getAllCountries();

  const options = countryArray.map((country) => ({
    value: country,
    label: country,
  }));

  const initState = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    province: "",
    city: "",
    zip: "",
    address: "",
  };

  const [userData, setUserData] = useState(initState);
  const [errorMessage, setErrorMessage] = useState({});

  const {
    first_name,
    last_name,
    email,
    phone,
    country,
    province,
    city,
    zip,
    address,
  } = userData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = data
      ? await updateBillingAddress({ userData, access_token })
      : await createBillingAddress({ userData, access_token });
    if ("error" in response) {
      if ("data" in response.error) {
        const errorData = response.error.data;
        setErrorMessage(errorData);
      }
    }

    if ("data" in response) {
      setErrorMessage({});
      dispatch(
        handleNotification({
          show: true,
          message: "Address saved successfully",
        })
      );
    }
  };

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  return (
    <div className="w-full flex items-center justify-center">
      {isFetchingBillingAddress ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          <Oval
            height={30}
            width={30}
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
        <div className="flex flex-col items-center w-full">
          {errorMessage.non_field_errors && (
            <Grid className="w-full p-4 my-4 bg-zinc-500 flex flex-col gap-3">
              <Grid className="flex items-center gap-2">
                <ErrorIcon />
                <Typography className="p-0 text-sm">
                  {errorMessage.non_field_errors}
                </Typography>
              </Grid>
            </Grid>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            className="w-full"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputField
                  inputProps={{
                    type: "first_name",
                    name: "first_name",
                    id: "first_name",
                    label: "First Name",
                    value: first_name,
                    onChange: handleChange,
                    setErrorMessage: setErrorMessage,
                    errorMessages: errorMessage,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  inputProps={{
                    type: "text",
                    name: "last_name",
                    id: "last_name",
                    label: "Last Name",
                    value: last_name,
                    onChange: handleChange,
                    setErrorMessage: setErrorMessage,
                    errorMessages: errorMessage,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  inputProps={{
                    type: "email",
                    name: "email",
                    id: "email",
                    label: "Email",
                    value: email,
                    onChange: handleChange,
                    setErrorMessage: setErrorMessage,
                    errorMessages: errorMessage,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <label
                  htmlFor="phone"
                  className="block mb-3 text-sm font-semibold text-secondaryTheme"
                >
                  Phone
                </label>
                <PhoneInput
                  country={"us"}
                  inputClass="common-input"
                  dropdownClass="phone-input-dropdown"
                  enableSearch={true}
                  value={phone}
                  onFocus={() =>
                    setErrorMessage((prevErrors) => ({
                      ...prevErrors,
                      phone: "",
                    }))
                  }
                  onChange={(phone) =>
                    setUserData((prevData) => ({ ...prevData, phone }))
                  }
                />
                {errorMessage.phone && errorMessage.phone !== "" && (
                  <Grid className="flex items-center mt-2 gap-2 text-secondaryTheme">
                    <ErrorIcon />
                    <Typography className="p-0 text-sm">
                      {errorMessage.phone}
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <label
                  htmlFor="country"
                  className="block mb-3 text-sm font-semibold text-secondaryTheme"
                >
                  Country
                </label>
                <Select
                  placeholder="Search country..."
                  defaultValue={country}
                  onChange={(value) =>
                    setUserData((prevData) => ({
                      ...prevData,
                      country: value.value,
                    }))
                  }
                  options={options}
                  isSearchable={true}
                  styles={customStyles}
                  onFocus={() =>
                    setErrorMessage((prevErrors) => ({
                      ...prevErrors,
                      country: "",
                    }))
                  }
                />
                {errorMessage.country && errorMessage.country !== "" && (
                  <Grid className="flex items-center mt-2 gap-2 text-secondaryTheme">
                    <ErrorIcon />
                    <Typography className="p-0 text-sm">
                      {errorMessage.country}
                    </Typography>
                  </Grid>
                )}
              </Grid>
              <Grid item xs={12}>
                <InputField
                  inputProps={{
                    type: "text",
                    name: "province",
                    id: "province",
                    label: "State/Province",
                    value: province,
                    onChange: handleChange,
                    setErrorMessage: setErrorMessage,
                    errorMessages: errorMessage,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  inputProps={{
                    type: "text",
                    name: "city",
                    id: "city",
                    label: "City",
                    value: city,
                    onChange: handleChange,
                    setErrorMessage: setErrorMessage,
                    errorMessages: errorMessage,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField
                  inputProps={{
                    type: "text",
                    name: "zip",
                    id: "zip",
                    label: "Zip Code",
                    value: zip,
                    onChange: handleChange,
                    setErrorMessage: setErrorMessage,
                    errorMessages: errorMessage,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <InputField
                  inputProps={{
                    type: "textarea",
                    multiline: true,
                    minRows: 3,
                    name: "address",
                    id: "address",
                    label: "Address",
                    value: address,
                    onChange: handleChange,
                    setErrorMessage: setErrorMessage,
                    errorMessages: errorMessage,
                  }}
                />
              </Grid>
            </Grid>
            <Button
              className="normal-case text-slate-200 bg-stone-500 hover:bg-stone-600"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handleSubmit}
            >
              {isCreatingBillingAddress || isUpdatingBillingAddress ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    "#b8c480",
                    "#B2A3B5",
                    "#F4442E",
                    "#51E5FF",
                    "#429EA6",
                  ]}
                />
              ) : (
                "Save"
              )}
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
}

const InputField = ({ inputProps }) => {
  const {
    type,
    name,
    id,
    label,
    value,
    onChange,
    setErrorMessage,
    multiline,
    minRows,
  } = inputProps;

  const errorMessages = inputProps.errorMessages || {};

  return (
    <div>
      <label
        htmlFor="firstName"
        className="block mb-3 text-sm font-semibold text-secondaryTheme"
      >
        {label}
      </label>
      <TextField
        multiline={multiline}
        minRows={minRows}
        type={type}
        name={name}
        value={value}
        required
        fullWidth
        id={id}
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

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "transparent",
    borderColor: state.isFocused ? "rgb(214 211 209)" : "rgb(120 113 108)",
    minHeight: "56px",
    height: "56px",
    color: "white",
    boxShadow: state.isFocused ? null : null,
  }),
  option: (provided, state) => ({
    ...provided,
    color: "white",
    backgroundColor: state.isFocused ? "#0a295c" : "",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "56px",
    padding: "0 6px",
    color: "#fff !important",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
    color: "#fff !important",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "56px",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    background: "#053075",
  }),
};
