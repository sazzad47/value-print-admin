import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { MdOutlineManageHistory } from "react-icons/md";
import { ColorRing, Oval } from "react-loader-spinner";
import {
  useGetOrderDetailsQuery,
  useUpdateOrderStageMutation,
} from "../../state/api/user";
import Header from "../../components/Header";
import { handleNotification } from "../../state";

const View = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const { access_token } = useSelector((state) => state.global);
  const { data, isLoading } = useGetOrderDetailsQuery({ id, access_token });
  const [updateOrderStage, { isLoading: isHandlingOrder }] =
    useUpdateOrderStageMutation();

  const cartItems = data?.order_details;

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOrder = async (stage) => {
    const response = await updateOrderStage({ stage, order_id: id });

   if ("data" in response) {
      dispatch(
        handleNotification({
          show: true,
          message: `Order ${stage} successfully`,
        })
      );
    }
  };

  return (
    <div>
      {isLoading ? (
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
        <div className="flex flex-col relative my-[1.5rem] mx-[2.5rem]">
          <div className="w-full flex flex-col gap-5 items-center">
            <div className="w-full text-center">
              <Grid className="w-full flex justify-between">
                <Header title="Order Details" />
                <Button
                  onClick={handleClick}
                  aria-controls={openMenu ? "manage-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  sx={{ color: theme.palette.text.primary }}
                  startIcon={<MdOutlineManageHistory />}
                  variant="contained"
                >
                  {isHandlingOrder ? (
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
                    "Manage"
                  )}
                </Button>
              </Grid>
            </div>
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                className="flex justify-center items-center w-full h-full"
              >
                <div
                  style={{ backgroundColor: theme.palette.primary[500] }}
                  className="w-full p-5"
                >
                  {cartItems.map((item, index) => (
                    <div
                      style={{ backgroundColor: theme.palette.primary[600] }}
                      key={index}
                      className="my-5"
                    >
                      <Grid
                        sx={{ color: theme.palette.text.primary }}
                        container
                        spacing={1}
                        className=""
                      >
                        <Grid item xs={12} md={3}>
                          <div className="w-full h-full flex justify-start items-start">
                            <img
                              src={item.photo}
                              alt="product"
                              className="w-full h-[100px]"
                            />
                          </div>
                        </Grid>
                        <Grid item xs={12} md={9} className="p-2">
                          <div className="w-full flex flex-col">
                            <div className="flex flex-col md:flex-row justify-between md:justify-between items-center">
                              <h3 className="font-bold text-md text-start  mt-0">
                                {item.name}
                              </h3>
                              <div className="flex gap-3 items-center">
                                <h3 className="font-bold text-md">
                                  S${item.total_amount}
                                </h3>
                                <h3 className=" font-bold text-md">
                                  {data.stage}
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className="w-full flex flex-col gap-5 md:gap-0 md:flex-row px-5 md:px-0">
                            <div className="w-full md:w-[50%] flex flex-col">
                              <div className="mb-2 md:mb-0 font-bold text-sm text-center md:text-start">
                                Configuration
                              </div>
                              {Object.entries(item).map(([key, value]) => {
                                if (
                                  key !== "name" &&
                                  key !== "photo" &&
                                  key !== "price" &&
                                  key !== "quantity" &&
                                  key !== "delivery_type" &&
                                  key !== "deliver_charge" &&
                                  key !== "total_amount"
                                ) {
                                  return (
                                    <div key={key}>
                                      <span className=" text-xs font-medium">
                                        {key}:
                                      </span>{" "}
                                      <span className=" text-xs">{value}</span>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                            <div className="w-full md:w-[50%] flex pl-0 md:pl-2">
                              <div className="w-full md:w-[60%] flex flex-col gap-2">
                                <Typography className=" whitespace-nowrap font-bold text-sm text-start">
                                  Quantity
                                </Typography>
                                <Typography className=" whitespace-nowrap font-bold text-sm text-start">
                                  Subtotal
                                </Typography>
                                <Typography className=" whitespace-nowrap font-bold text-sm text-start">
                                  Delivery Charge
                                </Typography>
                                <Typography className=" whitespace-nowrap font-bold text-sm text-start">
                                  Total
                                </Typography>
                              </div>
                              <div className="w-full md:w-[40%] flex flex-col gap-2">
                                <Typography className=" text-end pr-2 font-bold">
                                  {item.quantity}
                                </Typography>
                                <Typography className=" text-end pr-2 font-bold">
                                  S${item.price}
                                </Typography>
                                <Typography className=" text-end pr-2 font-bold">
                                  S${item.deliver_charge}
                                </Typography>
                                <Typography className=" text-end pr-2 font-bold">
                                  S${item.total_amount}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  ))}
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
      )}
      <Menu
        anchorEl={anchorEl}
        id="manage-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            boxShadow: "0px 0px 25px 25px rgba(0,0,0,0.2)",
            backgroundColor: "",
            color: "",
            overflow: "visible",
            mt: 1,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem onClick={() => handleOrder("approved")}>Approve</MenuItem>
        <MenuItem onClick={() => handleOrder("completed")}>Mark as complete</MenuItem>
        <MenuItem onClick={() => handleOrder("cancelled")}>Cancel</MenuItem>
      </Menu>
    </div>
  );
};

export default View;
