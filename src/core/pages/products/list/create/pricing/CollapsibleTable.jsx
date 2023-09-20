import React, { useState } from "react";
import {
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Row from "./Row";
import { showConfirmationDialog } from "./dialogs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CollapsibleTable = ({
  columns,
  rows,
  tableIndex,
  tables,
  setTables,
  table,
  handleConfirmDeleteTable,
  renderCollapseIcon,
  openTableIndex,
}) => {
  const theme = useTheme();

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

  const handleConfirmDeleteColumn = (index) => {
    showConfirmationDialog(
      {
        title: "Are you sure?",
        text: "Are you sure you want to delete this column?",
        preConfirm: () => deleteColumn(index),
        successMsg: "Column deleted successfully!",
        cancelMsg: "Deletion canceled.",
      },
      theme
    );
  };

  const addRow = () => {
    const newRow = {
      cellData: [],
      pricing: [],
    };

    columns.forEach(() => {
      newRow.cellData.push([{ value: "", is_popular: false, photo: "" }]);
    });

    const updatedTables = [...tables];
    updatedTables[tableIndex].rows.push(newRow);
    setTables(updatedTables);
  };

  const copyRow = (rowIndex) => {
    if (rowIndex >= 0 && rowIndex < rows.length) {
      const updatedTables = [...tables];
      const currentRow = updatedTables[tableIndex].rows[rowIndex];

      // Create a new array with separate instances of cell data objects
      const copiedCellData = currentRow.cellData.map((columnData) =>
        columnData.map((cell) => ({ ...cell }))
      );

      const copiedRow = {
        ...currentRow,
        cellData: copiedCellData,
        pricing: [],
      };

      updatedTables[tableIndex].rows.splice(rowIndex + 1, 0, copiedRow);

      setTables(updatedTables);
    }
  };

  const deleteRow = (rowIndex) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows.splice(rowIndex, 1);
    setTables(updatedTables);
  };

  const handleConfirmDeleteRow = (rowIndex) => {
    showConfirmationDialog(
      {
        title: "Are you sure?",
        text: "Are you sure you want to delete this row?",
        preConfirm: () => deleteRow(rowIndex),
        successMsg: "Row deleted successfully!",
        cancelMsg: "Deletion canceled.",
      },
      theme
    );
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

  const handleConfirmDeletePricingRow = (rowIndex, pricingIndex) => {
    showConfirmationDialog(
      {
        title: "Are you sure?",
        text: "Are you sure you want to delete this row?",
        preConfirm: () => deletePricingRow(rowIndex, pricingIndex),
        successMsg: "Row deleted successfully!",
        cancelMsg: "Deletion canceled.",
      },
      theme
    );
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

  const handleConfirmDeleteNestedCellData = (
    rowIndex,
    columnIndex,
    cellIndex
  ) => {
    showConfirmationDialog(
      {
        title: "Are you sure?",
        text: "Are you sure you want to delete this cell?",
        preConfirm: () =>
          deleteNestedCellData(rowIndex, columnIndex, cellIndex),
        successMsg: "Cell deleted successfully!",
        cancelMsg: "Deletion canceled.",
      },
      theme
    );
  };

  const addNestedCellData = (rowIndex, columnIndex, newCell) => {
    const updatedTables = [...tables];
    updatedTables[tableIndex].rows[rowIndex].cellData[columnIndex].push(
      newCell
    );
    setTables(updatedTables);
  };

  const copyRowFromPrevious = (rowIndex, cellIndex) => {
    if (
      rowIndex > 0 &&
      rowIndex < rows.length &&
      cellIndex >= 0 &&
      cellIndex < columns.length
    ) {
      const updatedTables = [...tables];
      const currentRow = updatedTables[tableIndex].rows[rowIndex];
      const previousRow = updatedTables[tableIndex].rows[rowIndex - 1];

      if (previousRow.cellData.length > cellIndex) {
        currentRow.cellData[cellIndex] = [...previousRow.cellData[cellIndex]];
        setTables(updatedTables);
      }
    }
  };

  const handleColumnReorder = (result) => {
    if (!result.destination) return; // Dropped outside the list

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return; // No change in order

    const updatedTables = [...tables];
    const reorderedColumns = [...columns];
    const [movedColumn] = reorderedColumns.splice(sourceIndex, 1); // Remove the moved column
    reorderedColumns.splice(destinationIndex, 0, movedColumn); // Insert the column at the new position

    // Update the columns order
    updatedTables[tableIndex].columns = reorderedColumns;

    // Update cellData to match the new column order
    updatedTables[tableIndex].rows.forEach((row) => {
      const newCellData = reorderedColumns.map((column) => {
        const columnIndex = columns.indexOf(column); // Find the column index
        return row.cellData[columnIndex];
      });
      row.cellData = newCellData;
    });

    setTables(updatedTables);
  };

  const handleRowReorder = (result) => {
    if (!result.destination) return; // Dropped outside the list

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return; // No change in order

    const updatedTables = [...tables];
    const movedRow = updatedTables[tableIndex].rows.splice(sourceIndex, 1)[0];
    updatedTables[tableIndex].rows.splice(destinationIndex, 0, movedRow);

    setTables(updatedTables);
  };

  // State to track whether the table name is being edited
  const [isEditingTableName, setIsEditingTableName] = useState(false);
  const [editedTableName, setEditedTableName] = useState(table.tableName);

  // Handler to toggle the edit mode for the table name
  const toggleEditTableName = () => {
    setIsEditingTableName(!isEditingTableName);
  };

  // Handler to save the edited table name
  const saveEditedTableName = () => {
    // Ensure the table name is not empty
    if (editedTableName.trim() !== "") {
      const updatedTables = [...tables];
      updatedTables[tableIndex].tableName = editedTableName;
      setTables(updatedTables);
      toggleEditTableName();
    }
  };

  // JSX for the table name display and editing
  const renderTableName = () => {
    return isEditingTableName ? (
      <div className="flex items-center gap-2">
        <TextField
          value={editedTableName}
          onChange={(e) => setEditedTableName(e.target.value)}
        />
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => saveEditedTableName()}
        >
          Save
        </Button>
      </div>
    ) : (
      <span>
        {table.tableName}
        <IconButton
          aria-label="edit table name"
          size="small"
          onClick={() => toggleEditTableName()}
        >
          <EditIcon />
        </IconButton>
      </span>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl text-bold my-5">
          Table: {renderTableName()}
        </h1>
        {renderCollapseIcon(tableIndex)}
      </div>

      <Collapse in={openTableIndex === tableIndex} unmountOnExit>
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
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => addRow()}
            >
              Add Row
            </Button>
          </div>
          <div className="justify-end w-full flex items-center">
            {tableIndex > 0 && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleConfirmDeleteTable(tableIndex)}
              >
                Delete Table
              </Button>
            )}
          </div>
        </div>

        <TableContainer>
          <Table aria-label="collapsible table">
            <DragDropContext onDragEnd={handleColumnReorder}>
              <Droppable droppableId="columns" direction="horizontal">
                {(provided) => (
                  <TableHead
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="your-table-header-row"
                  >
                    <TableRow>
                      {columns.length > 0 && <TableCell>Pricing</TableCell>}
                      {columns.map((column, index) => (
                        <Draggable
                          key={column.id}
                          draggableId={`column-${index}`} // Make sure this is unique
                          index={index}
                        >
                          {(provided) => (
                            <TableCell>
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {editedColumnIndex === index ? (
                                  <div className="flex items-center gap-2">
                                    <TextField
                                      value={editedColumnName}
                                      onChange={(e) =>
                                        setEditedColumnName(e.target.value)
                                      }
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
                                      onClick={() =>
                                        handleConfirmDeleteColumn(index)
                                      }
                                    >
                                      <DeleteIcon />
                                    </IconButton>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                          )}
                        </Draggable>
                      ))}
                      {columns.length > 0 && <TableCell>Action</TableCell>}
                    </TableRow>
                    {provided.placeholder}
                  </TableHead>
                )}
              </Droppable>
            </DragDropContext>
            <DragDropContext onDragEnd={handleRowReorder}>
              <Droppable droppableId="rows" direction="vertical">
                {(provided) => (
                  <TableBody
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="your-table-body"
                  >
                    {rows.map((row, rowIndex) => (
                      <Draggable
                        key={rowIndex}
                        draggableId={`row-${rowIndex}`}
                        index={rowIndex}
                      >
                        {(provided) => (
                          <Row
                            provided={provided}
                            key={rowIndex}
                            row={row}
                            rowIndex={rowIndex}
                            columns={columns}
                            addRow={() => addRow()}
                            copyRow={() => copyRow(rowIndex)}
                            updateRow={(newRow) => updateRow(rowIndex, newRow)}
                            handleConfirmDeleteRow={() =>
                              handleConfirmDeleteRow(rowIndex)
                            }
                            handleConfirmDeletePricingRow={(pricingIndex) =>
                              handleConfirmDeletePricingRow(
                                rowIndex,
                                pricingIndex
                              )
                            }
                            updateNestedCellData={updateNestedCellData}
                            handleConfirmDeleteNestedCellData={
                              handleConfirmDeleteNestedCellData
                            }
                            addNestedCellData={addNestedCellData}
                            copyRowFromPrevious={copyRowFromPrevious}
                          />
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            </DragDropContext>
          </Table>
        </TableContainer>
      </Collapse>
    </div>
  );
};

export default CollapsibleTable;
