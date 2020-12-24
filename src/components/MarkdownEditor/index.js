import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Editor, { DiffEditor } from "@monaco-editor/react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import css from "./style.css";
import { useMutation } from "@apollo/client";
import { UPDATE_FILES } from "../Graphql";

function MarkdownEditor({ file, write }) {
  console.log(file, write);
  const valueGetter = useRef();
  const classes = useStyles();
  const [isEditorReady, setIsEditorReady] = useState(false);
  let fileData;
  const filename = file.name.replace("/", "");
  const name = `${filename}`;

  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  const [updateData, { mutatedata }] = useMutation(UPDATE_FILES);

  function handleShowValue() {
    fileData = { data: `${valueGetter.current()}` };
    alert(valueGetter.current());
    updateData({
      variables: {
        name,
        changes: fileData,
      },
    });
  }
  return (
    <div className={css.editor}>
      <h3>TODO</h3>
      <i>text/markdown</i>
      <br />
      <div>In Progress</div>
      <Editor
        height="45vh"
        value={write}
        theme={"dark"}
        language={"javascript"}
        editorDidMount={handleEditorDidMount}
        loading={"Loading..."}
      />
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={handleShowValue}
            >
              Update File
            </Button>
          </Grid>
        </Grid>
      </div>{" "}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    top: "5px",
    width: "100%",
    marginBottom: "10px",
  },
}));

MarkdownEditor.propTypes = {
  file: PropTypes.object,
  write: PropTypes.func,
};

export default MarkdownEditor;
