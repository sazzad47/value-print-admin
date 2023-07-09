import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Information from "./Information";
import Templates from "./Templates";
import Artwork from "./Artwork";
import Faqs from "./Faqs";
import { useTheme } from "@mui/material";
import DescriptionDialog from "../descriptionDialog";

const Description = ({data}) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="h-full">
      <DescriptionDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        data={data}
      />
      <Tabs
        TabIndicatorProps={{
          sx: {
            backgroundColor: "green",
          },
        }}
        sx={{
          "& button": { color: "#00f6ff", textTransform: "capitalize" },
          "& button:focus": { outline: "none" },
          "& button.Mui-selected": {
            color: theme.palette.secondary[500],
          },
          backgroundColor: theme.palette.background.alt,
          height: "3rem",
          display: "flex",
          alignItems: "center"
        }}
        value={value}
        onChange={handleChange}
        variant="fullWidth"
      >
        <Tab label="Description" />
        <Tab label="Templates" />
        <Tab label="Artwork" />
        <Tab label="FAQs" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Information setOpenDialog={setOpenDialog} data={data} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Templates setOpenDialog={setOpenDialog} data={data} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Artwork setOpenDialog={setOpenDialog} data={data} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Faqs setOpenDialog={setOpenDialog} data={data} />
      </TabPanel>
    </div>
  );
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const theme = useTheme();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{ backgroundColor: theme.palette.primary[400] }}
      {...other}
    >
      {value === index && <div className="p-3 w-full h-[22rem]">{children}</div>}
    </div>
  );
}

export default Description;
