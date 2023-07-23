import * as React from "react";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { handleNotification } from "../../../../state";
import { initialProductData } from "./initState";
import Options from "./Options";
import DesignServices from "./DesignServices";
import Artwork from "./Artwork";
import Faq from "./Faq";
import Features from "./Features";
import Variants from "./Variants";
import General from "./General";
import { useState } from "react";
import {
  useCreateProductMutation,
} from "../../../../state/api/product";
import Templates from "./Templates";
import Price from "./Price";

export default function CreateProductPage() {
  const dispatch = useDispatch();
  const { fileLoading } = useSelector((state) => state.global);
  const { access_token } = useSelector((state) => state.global);

  const [createProduct, { isLoading: isCreatingProduct }] =
    useCreateProductMutation();

  const [productData, setProductData] = useState(initialProductData);
  const [errorMessage, setErrorMessage] = useState({});

  const steps = [
    {
      label: "General Information",
      content: (
        <General
          productData={productData}
          setProductData={setProductData}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ),
    },
    {
      label: "Options",
      content: (
        <Options
          productData={productData}
          setProductData={setProductData}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ),
    },
    {
      label: "Design Services",
      content: (
        <DesignServices
          productData={productData}
          setProductData={setProductData}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ),
    },
    {
      label: "Artwork",
      content: (
        <Artwork
          productData={productData}
          setProductData={setProductData}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ),
    },
    {
      label: "Templates",
      content: (
        <Templates
          productData={productData}
          setProductData={setProductData}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ),
    },
    {
      label: "FAQs",
      content: (
        <Faq
          productData={productData}
          setProductData={setProductData}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ),
    },
    {
      label: "Features",
      content: (
        <Features
          productData={productData}
          setProductData={setProductData}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ),
    },
    {
      label: "Variants",
      content: (
        <Variants
          productData={productData}
          setProductData={setProductData}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ),
    },
    {
      label: "Pricing",
      content: (
        <Price
          productData={productData}
          setProductData={setProductData}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ),
    },
  ];

  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createProduct({
      data: productData,
      access_token,
    });
   console.log('response', response)
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
          message: "Product published successfully",
        })
      );
      // setProductData(initialProductData);
    }
  };

  console.log("productData", productData);
  console.log("fileLoading", fileLoading);

  return (
    <div className="my-[1.5rem] mx-[2.5rem]">
      {fileLoading ? (
        <div className="w-full h-[70vh] flex items-center justify-center">
          Uploading to cloudinary...
        </div>
      ) : (
        <div className="mx-auto max-w-[500px] w-full">
         
          <h4 className="text-xl font-bold">{steps[activeStep].label}</h4>
          <div className="mt-5">
            {steps[activeStep].content}
          </div>
          <MobileStepper
            variant="text"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              background: "transparent",
              color: "white",
              marginTop: "3rem",
              padding: 0,
            }}
            nextButton={
              <Button
                variant="outlined"
                onClick={
                  activeStep === maxSteps - 1 ? handleSubmit : handleNext
                }
                className="focus:outline-none normal-case px-4 text-secondaryTheme"
              >
                {activeStep === maxSteps - 1 ? (
                  isCreatingProduct ? (
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
                    "Publish"
                  )
                ) : (
                  "Next"
                )}
              </Button>
            }
            backButton={
              <Button
                variant="outlined"
                className={`${
                  activeStep === 0 ? "hidden" : "d-flex"
                } focus:outline-none normal-case px-4 text-secondaryTheme`}
                onClick={handleBack}
                hidden={true}
                disabled={activeStep === 0}
              >
                Back
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}
