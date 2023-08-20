import * as React from "react";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { ColorRing, Oval } from "react-loader-spinner";
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
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../../../state/api/product";
import Templates from "./Templates";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Price from "./Price";

export default function CreateProductPage() {
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
    const response = await updateProduct({
      data: productData,
      id,
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

  console.log('productData', productData)

  return (
    <div className="my-[1.5rem] mx-[2.5rem]">
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
        <div className="mx-auto max-w-[500px] w-full">
          <h4 className="text-xl font-bold">{steps[activeStep].label}</h4>
          <div className="mt-5">{steps[activeStep].content}</div>
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
                  isUpdateProductLoading ? (
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
