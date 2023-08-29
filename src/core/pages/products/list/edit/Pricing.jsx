import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ThreeDots } from "react-loader-spinner";
import { imageUpload } from "../../../../utils/imageUpload";

function MultipleTables({ productData, setProductData }) {
  const [newTableName, setNewTableName] = useState("");
  const [tables, setTables] = useState(
    productData?.pricing || []
  );

  const addTable = () => {
    if (newTableName) {
      const newTable = {
        columns: [],
        rows: [],
        tableName: newTableName,
      };
      setTables([...tables, newTable]);
      setNewTableName("");
    }
  };

  const deleteTable = (tableIndex) => {
    const updatedTables = tables.filter((table, index) => index !== tableIndex);
    setTables(updatedTables);
  };

  useEffect(() => {
    // Update pricing in productData whenever rows change
    setProductData((prevProductData) => ({
      ...prevProductData,
      pricing: tables,
    }));
  }, [tables, setProductData]);

  return (
    <div>
      <div className="flex items-center gap-3 w-full justify-start mb-[3rem]">
        <TextField
          label="New Table Name"
          variant="outlined"
          value={newTableName}
          onChange={(e) => setNewTableName(e.target.value)}
        />
        <Button variant="outlined" color="secondary" onClick={addTable}>
          Create New Table
        </Button>
      </div>
      {tables?.map((table, index) => (
        <div key={index} className="mb-[5rem]">
          <CollapsibleTable
            table={table}
            columns={table.columns}
            rows={table.rows}
            tableIndex={index}
            tables={tables}
            setTables={setTables}
            addTable={addTable}
            deleteTable={deleteTable}
          />
        </div>
      ))}
    </div>
  );
}

function CollapsibleTable({
  columns,
  rows,
  tableIndex,
  tables,
  setTables,
  table,
  deleteTable,
}) {
  const [newColumnName, setNewColumnName] = useState("");
  const [editedColumnName, setEditedColumnName] = useState("");
  const [editedColumnIndex, setEditedColumnIndex] = useState(-1);

  const addColumn = () => {
    if (newColumnName) {
      const updatedTables = [...tables];
      updatedTables[tableIndex].columns.push(newColumnName);

      // Update cellData for existing rows in the updated table
      const updatedRows = updatedTables[tableIndex].rows.map((row) => ({
        ...row,
        cellData: [
          ...row.cellData,
          [
            {
              value: "",
              is_popular: false,
              photo: "",
            },
          ],
        ],
      }));

      updatedTables[tableIndex].rows = updatedRows;
      setTables(updatedTables);

      setNewColumnName("");
    }
  };

  const editColumn = (index) => {
    setEditedColumnIndex(index);
    setEditedColumnName(columns[index]);
  };

  const updateColumn = () => {
    if (editedColumnIndex !== -1 && editedColumnName) {
      const updatedTables = [...tables];
      updatedTables[tableIndex].columns[editedColumnIndex] = editedColumnName;
      setTables(updatedTables);

      setEditedColumnIndex(-1);
      setEditedColumnName("");
    }
  };

  const deleteColumn = (index) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].columns.splice(index, 1);

    // Update cellData for existing rows in the updated table
    const updatedRows = updatedTables[tableIndex].rows.map((row) => {
      const updatedCellData = [...row.cellData];
      updatedCellData.splice(index, 1);
      return { ...row, cellData: updatedCellData };
    });
    updatedTables[tableIndex].rows = updatedRows;

    setTables(updatedTables);
  };

  const addRow = () => {
    const newRow = {
      cellData: [],
      pricing: [{ quantity: null, price: null }],
    };

    columns.forEach(() => {
      newRow.cellData.push([{ value: "", is_popular: false, photo: "" }]);
    });

    const updatedTables = [...tables];
    updatedTables[tableIndex].rows.push(newRow);
    setTables(updatedTables);
  };

  const deleteRow = (rowIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows.splice(rowIndex, 1);
    setTables(updatedTables);
  };

  const updateRow = (rowIndex, newRow) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows[rowIndex] = newRow;
    setTables(updatedTables);
  };

  const deletePricingRow = (rowIndex, pricingIndex) => {
    const updatedTables = [...tables];
    const updatedPricing = [
      ...updatedTables[tableIndex].rows[rowIndex].pricing,
    ];
    updatedPricing.splice(pricingIndex, 1);
    updatedTables[tableIndex].rows[rowIndex].pricing = updatedPricing;
    setTables(updatedTables);
  };

  const addCellData = (rowIndex) => {
    const updatedTables = [...tables];
    const newRow = { ...updatedTables[tableIndex].rows[rowIndex] };
    newRow.cellData.push({ value: "", is_popular: false, photo: "" });
    updatedTables[tableIndex].rows[rowIndex] = newRow;
    setTables(updatedTables);
  };

  const deleteCellData = (rowIndex, cellIndex) => {
    const updatedTables = [...tables];
    const newRow = { ...updatedTables[tableIndex].rows[rowIndex] };
    newRow.cellData.splice(cellIndex, 1);
    updatedTables[tableIndex].rows[rowIndex] = newRow;
    setTables(updatedTables);
  };

  const updateNestedCellData = (
    rowIndex,
    columnIndex,
    cellIndex,
    field,
    value
  ) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows[rowIndex].cellData[columnIndex][cellIndex][
      field
    ] = value;
    setTables(updatedTables);
  };

  const deleteNestedCellData = (rowIndex, columnIndex, cellIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows[rowIndex].cellData[columnIndex].splice(
      cellIndex,
      1
    );
    setTables(updatedTables);
  };

  const addNestedCellData = (rowIndex, columnIndex, newCell) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows[rowIndex].cellData[columnIndex].push(
      newCell
    );
    setTables(updatedTables);
  };

  return (
    <div>
       <h1 className="text-xl md:text-2xl text-bold my-5 may-like-heading">
        <span> Table: {table.tableName} </span>
      </h1>
     
      <div className="mb-5 w-full flex items-center justify-between gap-3">
        <div className="w-full flex items-center justify-start gap-3">
          <TextField
            label="New Column Heading"
            variant="outlined"
            value={newColumnName}
            onChange={(e) => setNewColumnName(e.target.value)}
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => addColumn()}
          >
            Add Column
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => addRow()}>
            Add Row
          </Button>
        </div>
        <div className="justify-end w-full flex items-center">
          {tableIndex > 0 && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => deleteTable(tableIndex)}
            >
              Delete Table
            </Button>
          )}
        </div>
      </div>
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {columns.length > 0 && <TableCell>Pricing</TableCell>}
              {columns.map((column, index) => (
                <TableCell key={index}>
                  {editedColumnIndex === index ? (
                    <div className="flex items-center gap-2">
                      <TextField
                        value={editedColumnName}
                        onChange={(e) => setEditedColumnName(e.target.value)}
                      />
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => updateColumn()}
                      >
                        Save
                      </Button>
                    </div>
                  ) : (
                    <div>
                      {column}
                      <IconButton
                        aria-label="edit column"
                        size="small"
                        onClick={() => editColumn(index)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete column"
                        size="small"
                        onClick={() => deleteColumn(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </TableCell>
              ))}
              {columns.length > 0 && <TableCell>Action</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <Row
                key={rowIndex}
                row={row}
                rowIndex={rowIndex}
                columns={columns}
                addRow={() => addRow()}
                updateRow={(newRow) => updateRow(rowIndex, newRow)}
                deleteRow={() => deleteRow(rowIndex)}
                deletePricingRow={(pricingIndex) =>
                  deletePricingRow(rowIndex, pricingIndex)
                }
                addCellData={() => addCellData(rowIndex)}
                deleteCellData={(cellIndex) =>
                  deleteCellData(rowIndex, cellIndex)
                }
                updateNestedCellData={updateNestedCellData}
                deleteNestedCellData={deleteNestedCellData}
                addNestedCellData={addNestedCellData}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

function Row(props) {
  const {
    row,
    columns,
    updateNestedCellData,
    deleteNestedCellData,
    addNestedCellData,
  } = props;

  const photoInput = useRef(null);
  const [openCellIndex, setOpenCellIndex] = useState(-1);
  const [openPricing, setOpenPricing] = useState(false);

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
            onClick={() => props.deleteRow()}
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
                <Typography variant="h6" gutterBottom component="div">
                  {column}
                </Typography>
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
                                deleteNestedCellData(
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
                          onClick={() => props.deletePricingRow(pricingIndex)}
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

export default MultipleTables;
