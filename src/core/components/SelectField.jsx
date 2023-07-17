import React from 'react'

const SelectField = () => {
  return (
    <FormControl className="w-full">
    <InputLabel
      id="demo-simple-select-label"
      sx={{
        color:
           "rgb(214 211 209)",
        "&.Mui-focused": {
          color:
          
              "rgb(214 211 209)"
             
        },
      }}
    >
      Select membership
    </InputLabel>
    <Select
      fullWidth
      required
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      name="membership"
      value={userData.membership}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={(event) =>
        setUserData({ ...userData, membership: event.target.value })
      }
      sx={{
        color: "white" ,
        label: {
          color: "darkred",
          "&.Mui-focused": {
            color: "darkred",
          },
        },
        ".MuiOutlinedInput-notchedOutline": {
          color:
           
             "rgb(214 211 209)",
            
          borderColor: "rgb(120 113 108)" ,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          color:
           "rgb(214 211 209)"
     ,
          borderColor:
           "rgb(214 211 209)"
             ,
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          color:
           "rgb(214 211 209)"
         ,
          borderColor: "rgb(168 162 158)" ,
        },
        ".MuiSvgIcon-root ": {
          fill:
"rgb(214 211 209)"
           ,
        },
      }}
      inputProps={{
        MenuProps: {
          MenuListProps: {
            sx: {
              backgroundColor:
                "rgb(63 63 70)"
                 ,
              color:  "white",
            },
          },
        },
      }}
      label="Select membership"
      className="rounded-md"
    >
      {contents.map((item, i) => (
        <MenuItem key={i} value={item.title}>
          {item.title}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
  )
}

export default SelectField