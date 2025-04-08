import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { forwardRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MyEditor = forwardRef(
  ({ initialContent, onContentChange, disabled, ...rest }, ref) => {
    const [editorState, setEditorState] = useState(() => {
      const initializeContent = () => {
        if (initialContent && typeof initialContent === "string") {
          try {
            const blocksFromHTML = htmlToDraft(initialContent);
            if (blocksFromHTML && blocksFromHTML.contentBlocks) {
              const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
              );
              return EditorState.createWithContent(contentState);
            }
          } catch (error) {
            console.error("Error parsing initialContent:", error);
            const contentState = ContentState.createFromText(initialContent);
            return EditorState.createWithContent(contentState);
          }
        }
        return EditorState.createEmpty();
      };
      return initializeContent();
    });

    const convertToHtml = (editorState) => {
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      return draftToHtml(rawContentState);
    };

    const handleEditorStateChange = (newEditorState) => {
      setEditorState(newEditorState);
      const content = convertToHtml(newEditorState);
      onContentChange(content);
    };

    const handlePastedText = (text, html) => {
      try {
        if (html) {
          const blocksFromHTML = htmlToDraft(html);
          if (blocksFromHTML && blocksFromHTML.contentBlocks) {
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
            const content = convertToHtml(newEditorState);
            onContentChange(content);
            return true;
          }
        }
        const contentState = ContentState.createFromText(text);
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState);
        const content = convertToHtml(newEditorState);
        onContentChange(content);
        return true;
      } catch (error) {
        console.error("Error handling pasted text:", error);
        const emptyState = EditorState.createEmpty();
        setEditorState(emptyState);
        onContentChange("");
        return true;
      }
    };

    return (
      <div>
        <Editor
          ref={ref}
          readOnly={disabled}
          editorState={editorState}
          editorClassName="demo-editor"
          onEditorStateChange={handleEditorStateChange}
          handlePastedText={handlePastedText}
          placeholder="Nhập nội dung..."
          {...rest}
        />
      </div>
    );
  }
);

export default MyEditor;