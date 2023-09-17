import React, { useRef } from "react";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { Blocks } from "react-loader-spinner";

import ReactQuill from "react-quill";

const TextEditor = ({ value, state, setState }) => {
  const quillRef = useRef(null);

  const editorStyles = {
    backgroundColor: "lightblue", color: "black", 
  };

  return (
    <div>
      <div
        id="quill_file_loading"
        style={{ display: "none" }}
        className="fixed top-0 right-0 bottom-0 left-0 items-center justify-center "
      >
        <Blocks
          visible={true}
          height={80}
          width={80}
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
        />
      </div>
      <EditorToolbar toolbarId={"t1"} />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={(value) =>
          setState((prevData) => ({ ...prevData, [state]: value }))
        }
        placeholder={"Write something awesome..."}
        modules={modules("t1")}
        formats={formats}
        style={editorStyles}
      />
    </div>
  );
};

export default TextEditor;