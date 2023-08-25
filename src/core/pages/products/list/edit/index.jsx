import * as React from "react";
import Button from "@mui/material/Button";
import { ColorRing, Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { handleNotification } from "../../../../state";
import { initialProductData } from "./initState";
import Options from "./Options";
import DesignServices from "./DesignServices";
import Artwork from "./Artwork";
import Faq from "./Faq";
import Features from "./Intro";
import Variants from "./Variants";
import General from "./General";
import { useState } from "react";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../../../state/api/product";
import Templates from "./Templates";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import Price from "./Price";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { tabsClasses } from "@mui/material/Tabs";
import { useTheme } from "@mui/material";
import Ideas from "./Ideas";


export default function EditProductPage() {
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const params = useParams();
  const { id } = params;
  const { access_token } = useSelector((state) => state.global);
  const [productData, setProductData] = useState(initialProductData);
  const { data, isLoading: isGetProductLoading } = useGetProductQuery({ id });
  const [updateProduct, { isLoading: isUpdateProductLoading }] =
    useUpdateProductMutation({ data: productData, id, access_token });
  const dispatch = useDispatch();
  const { fileLoading } = useSelector((state) => state.global);

  const [errorMessage, setErrorMessage] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateProduct({
      data: productData,
      id,
      access_token,
    });
    console.log("response", response);
    if ("error" in response) {
      if ("data" in response.error) {
        const errorData = response.error.data;
        if ("errors" in errorData) {
          setErrorMessage(errorData.errors);
        }
      }
    }

    if ("data" in response) {
      dispatch(
        handleNotification({
          show: true,
          message: "Product updated successfully",
        })
      );
    }
  };

  useEffect(() => {
    if (data) {
      const dataCopy = JSON.parse(JSON.stringify(data));
      setProductData(dataCopy);
    }
  }, [data]);

  return (
    <>
      <div className="py-[4rem] px-[2.5rem]">
        {fileLoading ? (
          <div className="w-full h-[70vh] flex items-center justify-center">
            Uploading to cloudinary...
          </div>
        ) : isGetProductLoading ? (
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
         
             <Box
          sx={{
            flexGrow: 1,
            width: "700px",
            maxWidth: "100%",
            margin: "0 auto"
           
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            aria-label="visible arrows tabs example"
            TabIndicatorProps={{
              sx: {
                backgroundColor: "transparent",
              },
            }}
            sx={{
              "& button": {
                color: "white",
                textTransform: "capitalize",
                fontSize: "1rem",
                backgroundColor: theme.palette.grey[600],
                margin: "0.7rem",
                borderRadius: "40px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.25)",
              },
              "& button:focus": { outline: "none" },
              "& button.Mui-selected": {
                backgroundColor: theme.palette.secondary[600],
                color: "white",
              },
              backgroundColor: "transparent",
              borderTop: 0,
              height: "5rem",
              display: "flex",
              alignItems: "center",
              [`& .${tabsClasses.scrollButtons}`]: {
                color: theme.palette.secondary[400],
                "&.Mui-disabled": { opacity: 0.3, color: theme.palette.secondary[400] },
              },
            }}
          >
            <Tab label="General Information" />
              <Tab label="Options" />
              <Tab label="Design Services" />
              <Tab label="Artwork" />
              <Tab label="Templates" />
              <Tab label="Faqs" />
              <Tab label="Intro" />
              <Tab label="Ideas" />
              <Tab label="Pricing" />
          </Tabs>
         
          <div className="mx-auto max-w-[500px] w-full mt-[2rem]">
            <TabPanel value={value} index={0}>
              <General
                productData={productData}
                setProductData={setProductData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Options
                productData={productData}
                setProductData={setProductData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <DesignServices
                productData={productData}
                setProductData={setProductData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <Artwork
                productData={productData}
                setProductData={setProductData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <Templates
                productData={productData}
                setProductData={setProductData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <Faq
                productData={productData}
                setProductData={setProductData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </TabPanel>
            <TabPanel value={value} index={6}>
              <Features
                productData={productData}
                setProductData={setProductData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </TabPanel>
            <TabPanel value={value} index={7}>
              <Ideas
                productData={productData}
                setProductData={setProductData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </TabPanel>
            <TabPanel value={value} index={8}>
              <Variants
                productData={productData}
                setProductData={setProductData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </TabPanel>
            {/* <TabPanel value={value} index={8}>
              <Price
                productData={productData}
                setProductData={setProductData}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
              />
            </TabPanel> */}

            <Button
              className="mt-5"
              variant="outlined"
              color="secondary"
              onClick={handleSubmit}
            >
              {isUpdateProductLoading ? (
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
                "Update"
              )}
            </Button>
          </div>
        </Box>
        
        
        )}
      </div>
    </>
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
      {value === index && <div className="">{children}</div>}
    </div>
  );
}
