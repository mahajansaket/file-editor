import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { INSERT_FILES } from "../../components/Graphql";
import { Button, Grid, CssBaseline } from "@material-ui/core";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";

function AddFile({ openModal, closeModal, file }) {
  const [newFile, setNewFile] = useState();
  const [fileData, setFileData] = useState();
  const [fileType, setFileType] = useState();
  const [fileName, setFileName] = useState();

  const [addFileMutation, handleModal] = useMutation(INSERT_FILES, {
    update: (proxy, mutationResult) => {
      const resData = mutationResult.data.insert_file_list.returning[0];
      setNewFile(resData);
      console.log(
        "mutationResult: ",
        mutationResult.data.insert_file_list.returning[0]
      );
      console.log("shortURL", resData);
    },
  });

  function SubmitButton() {
    if (fileName && fileType && fileData) {
      return <Button onClick={onSubmit}>Submit</Button>;
    } else {
      return (
        <Button disabled onClick={onSubmit}>
          Submit
        </Button>
      );
    }
  }

  const onSubmit = async (values) => {
    const name = fileName;
    const type = fileType;
    const data = fileData;
    addFileMutation({
      variables: {
        objects: {
          name: name,
          type: type,
          data: data,
        },
      },
    });
    console.log(values);
    closeModal();
  };

  let fileReader;

  const handleFileRead = (e) => {
    const content = fileReader.result;
    setFileData(content);
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
    setFileName(file.name);
    setFileType(file.type);
  };

  return (
    <div>
      <Dialog
        open={openModal}
        onClose={closeModal}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Upload File</DialogTitle>
        <DialogContent>
          <div style={{ padding: 16, margin: "auto", maxWidth: "auto" }}>
            <CssBaseline />
            <form onSubmit={onSubmit} noValidate>
              <Grid container alignItems="flex-start" spacing={2}>
                <input
                  type="file"
                  id="file"
                  accept=".js, .txt, .md, .json"
                  onChange={(e) => handleFileChosen(e.target.files[0])}
                />
              </Grid>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <SubmitButton />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddFile;
