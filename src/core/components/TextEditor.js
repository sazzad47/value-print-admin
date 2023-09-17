import React, { useRef, useState, useEffect } from "react";
import MUIRichTextEditor from "mui-rte";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import BackupIcon from "@mui/icons-material/Backup";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { imageUpload } from "../utils/imageUpload";
import { stateToHTML } from "draft-js-export-html";

const cardPopverStyles = makeStyles({
  root: {
    padding: 10,
    maxWidth: 350,
  },
  textField: {
    width: "100%",
  },
  input: {
    display: "none",
  },
});

const uploadImage = (file) => {
  return new Promise(async (resolve, reject) => {
    const url = await imageUpload([file]);
    if (!url) {
      reject();
      return;
    }
    resolve({
      data: {
        url: url[0],
        width: 300,
        height: 200,
        alignment: "left", // or "center", "right"
        type: "image", // or "video"
      },
    });
  });
};

const UploadImagePopover = (props) => {
  const classes = cardPopverStyles(props);
  const [state, setState] = useState({
    anchor: null,
    isCancelled: false,
  });
  const [data, setData] = useState({});

  useEffect(() => {
    setState({
      anchor: props.anchor,
      isCancelled: false,
    });
    setData({
      file: undefined,
    });
  }, [props.anchor]);

  return (
    <Popover
      anchorEl={state.anchor}
      open={state.anchor !== null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Grid container spacing={1} className={classes.root}>
        <Grid item xs={10}>
          <TextField
            className={classes.textField}
            disabled
            value={data.file?.name || ""}
            placeholder="Click icon to attach image"
          />
        </Grid>
        <Grid item xs={2}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={(event) => {
              setData({
                ...data,
                file: event.target.files[0],
              });
            }}
          />
          <label htmlFor="contained-button-file">
            <IconButton
              color="primary"
              aria-label="upload image"
              component="span"
            >
              <AttachFileIcon />
            </IconButton>
          </label>
        </Grid>
        <Grid item container xs={12} justifyContent="flex-end">
          <Button
            onClick={() => {
              setState({
                anchor: null,
                isCancelled: true,
              });
            }}
          >
            <CloseIcon />
          </Button>
          <Button
            onClick={() => {
              setState({
                anchor: null,
                isCancelled: false,
              });
              props.onSubmit(data, !state.isCancelled);
            }}
          >
            <DoneIcon />
          </Button>
        </Grid>
      </Grid>
    </Popover>
  );
};

const AsyncImageUpload = ({ value, state, setState }) => {
  const ref = useRef(null);
  const [anchor, setAnchor] = useState(null);

  const handleFileUpload = (file) => {
    ref.current?.insertAtomicBlockAsync(
      "IMAGE",
      uploadImage(file),
      "Uploading now..."
    );
  };

  const handleChange = (data) => {
    const expected = stateToHTML(data.getCurrentContent());
    setState((prevData) => ({ ...prevData, [state]: expected }));
  };

  return (
    <div>
      <UploadImagePopover
        anchor={anchor}
        onSubmit={(data, insert) => {
          if (insert && data.file) {
            handleFileUpload(data.file);
          }
          setAnchor(null);
        }}
      />
      <MUIRichTextEditor
        onChange={(data) => handleChange(data)}
        label="Write someting awesome..."
        ref={ref}
        controls={[
          "title",
          "bold",
          "italic",
          "underline",
          "strikethrough",
          "highlight",
          "link",
          "media",
          "upload-image",
          "numberList",
          "bulletList",
          "quote",
          "code",
          "undo",
          "redo",
        ]}
        customControls={[
          {
            name: "upload-image",
            icon: <BackupIcon />,
            type: "callback",
            onClick: (_editorState, _name, anchor) => {
              setAnchor(anchor);
            },
          },
        ]}
        draftEditorProps={{
          handleDroppedFiles: (_selectionState, files) => {
            if (files.length && files[0].name !== undefined) {
              handleFileUpload(files[0]);
              return "handled";
            }
            return "not-handled";
          },
        }}
      />
    </div>
  );
};

export default AsyncImageUpload;
