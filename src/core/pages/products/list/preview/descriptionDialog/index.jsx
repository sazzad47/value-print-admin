import * as React from "react";
import Dialog from "@mui/material/Dialog";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Information from "./Information";
import Templates from "./Templates";
import Artwork from "./Artwork";
import Faqs from "./Faqs";
import { useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DescriptionDialog({ openDialog, setOpenDialog, data }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <div className="p-5 pb-0 flex justify-between">
          <Typography className="text-2xl">{data.name}</Typography>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </div>

        <div className="mt-5 p-5">
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
      </Dialog>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div className="p-3 w-full">{children}</div>}
    </div>
  );
}
