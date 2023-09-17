import React, { useEffect, useState } from "react";
import { IconButton, TextField, Button, useTheme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CollapsibleTable from "./CollapsibleTable";
import { showConfirmationDialog } from "./dialogs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function MultipleTables({ productData, setProductData }) {
  const theme = useTheme();
  const [newTableName, setNewTableName] = useState("");
  const [tables, setTables] = useState(productData?.pricing || []);

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

  const handleConfirmDeleteTable = (tableIndex) => {
    showConfirmationDialog(
      {
        title: "Are you sure?",
        text: "Are you sure you want to delete this table?",
        preConfirm: () => deleteTable(tableIndex),
        successMsg: "Table deleted successfully!",
        cancelMsg: "Deletion canceled.",
      },
      theme
    );
  };

  useEffect(() => {
    // Update pricing in productData whenever rows change
    setProductData((prevProductData) => ({
      ...prevProductData,
      pricing: tables,
    }));
  }, [tables, setProductData]);

  // Initialize state to track the currently open table index
  const [openTableIndex, setOpenTableIndex] = useState(-1);
  // Handler to toggle the collapse/expand state of a specific table
  const toggleTableCollapse = (index) => {
    if (index === openTableIndex) {
      // Clicking on the currently open table, close it
      setOpenTableIndex(-1);
    } else {
      // Clicking on a different table, open it and close the currently open table
      setOpenTableIndex(index);
    }
  };

  const renderCollapseIcon = (index) => {
    return openTableIndex === index ? (
      <IconButton>
        <KeyboardArrowUpIcon onClick={() => toggleTableCollapse(index)} />
      </IconButton>
    ) : (
      <IconButton>
        <KeyboardArrowDownIcon onClick={() => toggleTableCollapse(index)} />
      </IconButton>
    );
  };

  // Function to handle drag-and-drop reordering of tables
  const handleDragEnd = (result) => {
    if (!result.destination) return; // Dropped outside the list

    const reorderedTables = [...tables];
    const [removed] = reorderedTables.splice(result.source.index, 1);
    reorderedTables.splice(result.destination.index, 0, removed);

    setTables(reorderedTables);
  };

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
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tables" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {tables?.map((table, index) => (
                <div key={index}>
                  {openTableIndex === index ? (
                    <CollapsibleTable
                      table={table}
                      columns={table.columns}
                      rows={table.rows}
                      tableIndex={index}
                      tables={tables}
                      setTables={setTables}
                      addTable={addTable}
                      handleConfirmDeleteTable={handleConfirmDeleteTable}
                      renderCollapseIcon={renderCollapseIcon}
                      openTableIndex={openTableIndex}
                    />
                  ) : (
                    <Draggable draggableId={`table-${index}`} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <CollapsibleTable
                            table={table}
                            columns={table.columns}
                            rows={table.rows}
                            tableIndex={index}
                            tables={tables}
                            setTables={setTables}
                            addTable={addTable}
                            handleConfirmDeleteTable={handleConfirmDeleteTable}
                            renderCollapseIcon={renderCollapseIcon}
                            openTableIndex={openTableIndex}
                          />
                        </div>
                      )}
                    </Draggable>
                  )}
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default MultipleTables;
