import { ContentState, EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { forwardRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MyEditor = forwardRef(({ initialContent, onContentChange, disabled }, ref) => {
    const [editorState, setEditorState] = useState(() => {
        const initializeContent = () => {
            if (initialContent && typeof initialContent === "string") {
                try {
                    // Thử chuyển đổi HTML sang ContentState
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
                    // Fallback: Nếu HTML lỗi (có thể do emoji), dùng văn bản thuần
                    const contentState = ContentState.createFromText(initialContent);
                    return EditorState.createWithContent(contentState);
                }
            }
            return EditorState.createEmpty();
        };
        return initializeContent();
    });

    // Chuyển đổi EditorState sang HTML
    const convertToHtml = (editorState) => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        return draftToHtml(rawContentState);
    };

    // Xử lý khi trạng thái editor thay đổi
    const handleEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
        const content = convertToHtml(newEditorState);
        onContentChange(content);
    };

    // Xử lý nội dung dán từ ngoài vào
    const handlePastedText = (text, html) => {
        if (html) {
            try {
                // Thử chuyển đổi HTML (bao gồm emoji) sang ContentState
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
                    return true; // Đã xử lý nội dung dán
                }
            } catch (error) {
                console.error("Error handling pasted HTML:", error);
                // Fallback: Nếu HTML lỗi (do emoji hoặc định dạng lạ), dùng văn bản thuần
                const contentState = ContentState.createFromText(text);
                const newEditorState = EditorState.createWithContent(contentState);
                setEditorState(newEditorState);
                const content = convertToHtml(newEditorState);
                onContentChange(content);
                return true;
            }
        } else if (text) {
            // Nếu chỉ có văn bản thuần (bao gồm emoji)
            const contentState = ContentState.createFromText(text);
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
            const content = convertToHtml(newEditorState);
            onContentChange(content);
            return true;
        }
        return false; // Để draft-js xử lý mặc định nếu không có HTML hoặc text
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
            />
        </div>
    );
});

export default MyEditor;