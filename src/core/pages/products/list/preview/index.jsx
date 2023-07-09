import React from "react";
import Header from "../../../../components/Header";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useGetProductQuery } from "../../../../state/api/product";
import { Oval } from "react-loader-spinner";
import Description from "./description";

const Preview = () => {
  const params = useParams();
  const { id } = params;
  const { data, isLoading: isGetProductLoading } = useGetProductQuery({ id });

  return (
    <>
      {isGetProductLoading ? (
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
        <div className="my-[1.5rem] mx-[2.5rem]">
          <div className="w-full flex justify-between">
            <Header title={`${data.name}`} />
            <Link to={`/products/list/${id}/edit`}>
              <Button
                className="text-white"
                startIcon={<EditIcon />}
                variant="contained"
              >
                Edit
              </Button>
            </Link>
          </div>
          <div className="mt-[1rem] flex flex-col gap-5">
            <div className="grid grid-cols-2 h-[25rem]">
              <div className="h-full w-full bg-red-200">
                <Description data={data} />
              </div>
              <div className="w-full h-full relative">
                <div className="absolute w-full h-full flex items-center justify-center">
                <img
                  src={data.cover}
                  alt="cover"
                  className="object-contain w-auto h-auto max-w-full max-h-full"
                />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Preview;
