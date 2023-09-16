import React, { useRef, useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Button,
  Switch,
  Dialog,
  Grid,
  Divider,
  Avatar,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ThreeDots } from "react-loader-spinner";
import { imageUpload } from "../../../../../utils/imageUpload";


const Row = (props)=> {
    const {
      row,
      columns,
      updateNestedCellData,
      handleConfirmDeleteNestedCellData,
      addNestedCellData,
      copyRowFromPrevious,
      copyRow,
    } = props;
  
    const photoInput = useRef(null);
    const [openCellIndex, setOpenCellIndex] = useState(-1);
    const [openPricing, setOpenPricing] = useState(false);
  
    const [quantityString, setQuantityString] = useState(""); // State for quantity string
    const [priceString, setPriceString] = useState(""); // State for price string
  
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
  
    const toggleCellOpen = (columnIndex) => {
      setOpenCellIndex(columnIndex === openCellIndex ? -1 : columnIndex);
      setOpenPricing(false);
    };
  
    const togglePricingOpen = () => {
      setOpenPricing(!openPricing);
      setOpenCellIndex(-1);
    };
  
    const addPricingRow = () => {
      const newPricingRow = { quantity: null, price: null };
      const updatedRow = { ...row, pricing: [...row.pricing, newPricingRow] };
      props.updateRow(updatedRow);
    };
  
    const generateRows = () => {
      // Parse the entered quantity and price strings into arrays
      const quantityArray = quantityString
        .split(" ")
        .map((str) => parseInt(str.replace(/,/g, ""), 10))
        .filter((num) => !isNaN(num));
      const priceArray = priceString
        .split(" ")
        .map((str) => parseFloat(str))
        .filter((num) => !isNaN(num));
  
      // Check if both arrays have the same length
      if (quantityArray.length === priceArray.length) {
        // Create an updated row with the generated pricing information
        const updatedRow = {
          ...row,
          pricing: quantityArray.map((quantity, index) => ({
            quantity,
            price: priceArray[index],
          })),
        };
  
        // Update the specific row with the generated pricing
        props.updateRow(updatedRow);
      }
    };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleChooseProfilePhoto = () => {
      photoInput.current?.click();
    };
  
    const handleFile = (e) => {
      if (e.target.files) {
        let newPhoto = e.target.files[0];
        const newPhotoURL = URL.createObjectURL(newPhoto);
        setPhoto(newPhoto);
        setPhotoURL(newPhotoURL);
        handleClickOpen();
      }
    };
  
    const handlePhotoUpload = async (rowIndex, columnIndex, cellIndex, field) => {
      setLoading(true);
  
      if (photo) {
        const cloudinaryURL = await imageUpload([photo]);
        updateNestedCellData(
          rowIndex,
          columnIndex,
          cellIndex,
          field,
          cloudinaryURL[0]
        );
        setLoading(false);
        handleClose();
      }
    };
  
    return (
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => togglePricingOpen()}
            >
              {openPricing ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
  
          {columns.map((column, columnIndex) => (
            <TableCell key={columnIndex} component="th" scope="row">
              <IconButton
                aria-label="toggle cell"
                size="small"
                onClick={() => toggleCellOpen(columnIndex)}
              >
                {openCellIndex === columnIndex ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )}
              </IconButton>
            </TableCell>
          ))}
          <TableCell>
            {/* Render row action buttons here */}
            <IconButton
              aria-label="delete row"
              size="small"
              onClick={() => props.handleConfirmDeleteRow()}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="delete pricing"
              size="small"
              onClick={props.addRow}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              aria-label="delete pricing"
              size="small"
              onClick={copyRow}
            >
              <ContentCopyIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        {columns.map((column, columnIndex) => (
          <TableRow key={`collapse-${props.rowIndex}-${columnIndex}`}>
            <TableCell
              style={{ paddingBottom: 0, paddingTop: 0 }}
              colSpan={columns.length + 2}
            >
              <Collapse in={columnIndex === openCellIndex} unmountOnExit>
                <Box sx={{ margin: 1 }}>
                  <div className="w-full flex items-center justify-between my-3">
                    <Typography variant="h6" gutterBottom component="div">
                      {column}
                    </Typography>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() =>
                        copyRowFromPrevious(props.rowIndex, columnIndex)
                      }
                    >
                      Copy From Previous Row
                    </Button>
                  </div>
                  <Table size="small" aria-label="purchases">
                    <TableHead>
                      <TableRow>
                        <TableCell>Value</TableCell>
                        <TableCell>Is popular</TableCell>
                        <TableCell>Photo</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row.cellData[columnIndex].map((cell, cellIndex) => {
                        return (
                          <TableRow key={cellIndex}>
                            <TableCell>
                              <TextField
                                fullWidth
                                value={cell.value}
                                onChange={(e) =>
                                  updateNestedCellData(
                                    props.rowIndex,
                                    columnIndex,
                                    cellIndex,
                                    "value",
                                    e.target.value
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Switch
                                checked={cell.is_popular}
                                onChange={(e) =>
                                  updateNestedCellData(
                                    props.rowIndex,
                                    columnIndex,
                                    cellIndex,
                                    "is_popular",
                                    e.target.checked
                                  )
                                }
                              />
                            </TableCell>
                            <TableCell>
                              {cell.photo === "" ? (
                                <IconButton
                                  onClick={handleChooseProfilePhoto}
                                  aria-label="delete cell"
                                  size="small"
                                >
                                  <CameraAltIcon />
                                </IconButton>
                              ) : (
                                <Avatar
                                  onClick={handleChooseProfilePhoto}
                                  src={cell.photo}
                                  className="w-[56px] h-[56px] cursor-pointer"
                                />
                              )}
  
                              <input
                                ref={photoInput}
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={handleFile}
                              />
                              <Dialog
                                sx={{
                                  "& .MuiDialog-paper": {
                                    width: "30rem",
                                    height: "27rem",
                                    maxHeight: "30rem",
                                    overflow: "hidden",
                                    transition: "height width var(--speed) ease",
                                  },
                                }}
                                onClose={handleClose}
                                aria-labelledby="customized-dialog-title"
                                open={open}
                              >
                                <Grid className="w-full h-full flex flex-col px-4">
                                  <Grid className="w-full h-[10%] flex items-center justify-center">
                                    <Typography className="p-0 text-lg text-slate-200">
                                      Preview
                                    </Typography>
                                  </Grid>
                                  <Divider className="w-full" />
                                  <Grid className="w-full h-[70%] relative">
                                    <img
                                      src={photoURL}
                                      alt=""
                                      className="w-full h-full"
                                    />
                                  </Grid>
                                  <Grid className="w-full h-[20%] flex items-center justify-end">
                                    <Grid className="flex gap-5">
                                      <Button
                                        onClick={() => {
                                          handleClose();
                                        }}
                                        className="w-[5rem] normal-case text-slate-200 bg-stone-400 hover:bg-stone-500 dark:bg-zinc-500 hover:dark:bg-zinc-600"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          handlePhotoUpload(
                                            props.rowIndex,
                                            columnIndex,
                                            cellIndex,
                                            "photo"
                                          )
                                        }
                                        variant="contained"
                                        className="w-[5rem] normal-case text-slate-200 bg-green-700 hover:bg-green-800 dark:bg-stone-500 dark:hover:bg-stone-600"
                                      >
                                        {loading ? (
                                          <ThreeDots
                                            height="30"
                                            width="30"
                                            radius="9"
                                            color="#4fa94d"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                            visible={true}
                                          />
                                        ) : (
                                          <Typography>Save</Typography>
                                        )}
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Dialog>
                            </TableCell>
                            <TableCell>
                              <IconButton
                                aria-label="delete cell"
                                size="small"
                                onClick={() =>
                                  handleConfirmDeleteNestedCellData(
                                    props.rowIndex,
                                    columnIndex,
                                    cellIndex
                                  )
                                }
                              >
                                <DeleteIcon />
                              </IconButton>
                              <IconButton
                                aria-label="add cell"
                                size="small"
                                onClick={() =>
                                  addNestedCellData(props.rowIndex, columnIndex, {
                                    value: "",
                                    is_popular: false,
                                    photo: "",
                                  })
                                }
                              >
                                <AddIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Box>
              </Collapse>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={columns.length + 2}
          >
            <Collapse in={openPricing} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Pricing
                </Typography>
                <div className="w-full flex items-start gap-3 justify-between my-[2rem]">
                  <TextField
                    fullWidth
                    label="Quantity (Space-separated numbers)"
                    variant="outlined"
                    value={quantityString}
                    onChange={(e) => setQuantityString(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Price (Space-separated numbers)"
                    variant="outlined"
                    value={priceString}
                    onChange={(e) => setPriceString(e.target.value)}
                  />
                  <Button
                    className="max-w-full w-[20rem]"
                    variant="outlined"
                    color="secondary"
                    onClick={generateRows}
                  >
                    Generate Rows
                  </Button>
                </div>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.pricing.map((pricingRow, pricingIndex) => (
                      <TableRow key={pricingIndex}>
                        <TableCell>
                          <TextField
                            fullWidth
                            value={pricingRow.quantity}
                            onChange={(e) => {
                              const newPricing = [...row.pricing];
                              newPricing[pricingIndex].quantity = e.target.value;
                              const updatedRow = { ...row, pricing: newPricing };
                              props.updateRow(updatedRow);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <TextField
                            fullWidth
                            value={pricingRow.price}
                            onChange={(e) => {
                              const newPricing = [...row.pricing];
                              newPricing[pricingIndex].price = e.target.value;
                              const updatedRow = { ...row, pricing: newPricing };
                              props.updateRow(updatedRow);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="delete pricing"
                            size="small"
                            onClick={() =>
                              props.handleConfirmDeletePricingRow(pricingIndex)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete pricing"
                            size="small"
                            onClick={() => addPricingRow()}
                          >
                            <AddIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
export default Row