import { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const TextEditor = ({ initialValue, onContentChange }) => {
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (initialValue) {
      const blocksFromHtml = htmlToDraft(initialValue);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
      setEditorState(EditorState.createWithContent(contentState));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [initialValue]);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const content = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
    onContentChange(content);
  };

  return (
    <div style={{ border: "1px solid #f1f1f1", minHeight: "200px" }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={{
          options: ["inline", "blockType", "list", "textAlign", "link"],
          inline: {
            options: ["bold", "italic", "underline"],
          },
        }}
      />
    </div>
  );
};

export default TextEditor;