/* eslint-disable react/display-name */
import { forwardRef, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = forwardRef(({ initialContent, onContentChange }, ref) => {
  const [editorState, setEditorState] = useState(() => {
    if (initialContent) {
      const blocksFromHTML = htmlToDraft(initialContent);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  const handleEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const content = convertToHtml(newEditorState);
    onContentChange(content);
  };

  // Function to convert EditorState to HTML
  const convertToHtml = (editorState) => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    return draftToHtml(rawContentState);
  };

  return (
    <div>
      <Editor
        ref={ref}
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={handleEditorStateChange}
      />
    </div>
  );
});

export default TextEditor;