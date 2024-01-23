// React Import
import { useRef } from "react";
// Third-Party React Component Import
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
// Material UI Component Imports
import { Box, Stack } from "@mui/material";

export const TViewer = (props: any) => {
  const editorRef = useRef();

  return (
    <Stack sx={{ background: "white", mt: "30px", borderRadius: "10px" }}>
      <Box sx={{ m: "40px" }}>
        <Viewer
          //@ts-ignore
          ref={editorRef}
          initialValue={props.chosenSingleBoArticles?.art_content}
          height="600px"
        />
      </Box>
    </Stack>
  );
};
