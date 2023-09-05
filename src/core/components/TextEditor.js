import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js'; // Import ContentState
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const EditorConvertToHTML = ({ value, state, setState }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    // When the detailedPage prop changes, update the editor content
    if (value) {
      const blocksFromHtml = htmlToDraft(value);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [value]);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);

    // Extract HTML content from the editor state and update state
    const htmlContent = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
    setState((prevData) => ({ ...prevData, [state]: htmlContent }));
  };
  console.log('value', value)
  return (
    <div className='text-[black]'>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper bg-white min-h-[20rem]"
        editorClassName="demo-editor"
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
};

export default EditorConvertToHTML;
