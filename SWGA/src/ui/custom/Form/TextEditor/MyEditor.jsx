import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { forwardRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MyEditor = forwardRef(({ initialContent, onContentChange, disabled }, ref) => {
    const [editorState, setEditorState] = useState(() => {
        if (initialContent) {
            const blocksFromHTML = htmlToDraft(initialContent);
            const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            );
            return EditorState.createWithContent(contentState);
        }
        else {
            return EditorState.createEmpty();
        }
    });

    const handleEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
        const content = convertToHtml(newEditorState);
        onContentChange(content);
    };

    // Function to convert EditorState to HTML
    const convertToHtml = (editorState) => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        const html = draftToHtml(rawContentState);
        return html;
    };

    return (
        <div>
            <Editor
                ref={ref}
                readOnly={disabled}
                editorState={editorState}
                editorClassName="demo-editor"
                onEditorStateChange={handleEditorStateChange}
            />
        </div>
    );
});

export default MyEditor;


