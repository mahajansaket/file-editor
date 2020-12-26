import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import path from "path";
import classNames from "classnames";
import { useQuery, useMutation } from "@apollo/client";

import { Button } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

import { AddCircleOutline, Delete } from "@material-ui/icons";
import MarkdownEditor from "../../components/MarkdownEditor";
import PlaintextEditor from "../../components/PlainTextEditor";
import { READ_FILES, DELETE_FILE } from "../../components/Graphql";

import { listFiles } from "../../assets/data/files";

import AddFile from "./AddFile";

import css from "./style.module.css";

function FilesTable({ files, activeFile, setActiveFile }) {
  const { loading, error, data } = useQuery(READ_FILES);
  const [deleteMutation] = useMutation(DELETE_FILE);

  const [currentFile, setFile] = useState();

  useEffect(() => {
    if (!loading && data) {
      setFile(data);
    }
  }, [loading, data]);
  if (loading) return "Loading..."; //your component's return should always be after all hook calls//
  if (error) return `Error! ${error.message}`;

  const handleDelete = (e) => {
    deleteMutation({
      variables: {
        id: e,
      },
      optimisticResponse: {
        __typename: "Mutation",
        deleted: {
          id: e,
        },
      },
    });
  };

  return (
    <div className={css.files}>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Modified</th>
          </tr>
        </thead>
        <tbody>
          {data.file_list.map((file) => (
            <tr
              key={file.name}
              className={classNames(
                css.row,
                activeFile && activeFile.name === file.name ? css.active : ""
              )}
              onClick={() => setActiveFile(file)}
            >
              <td className={css.file}>
                {/* <div
                  className={css.icon}
                  dangerouslySetInnerHTML={{
                    __html: TYPE_TO_ICON[file.type],
                  }}
                ></div> */}
                <Delete
                  // onClick={handleDelete(file.name)}
                  style={{ color: red[500] }}
                  className={css.icon}
                />
                {path.basename(file.name)}
              </td>

              <td>
                {new Date(file.lastModified).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

FilesTable.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  activeFile: PropTypes.object,
  setActiveFile: PropTypes.func,
};

function Previewer({ file }) {
  const [show, toggleShow] = useState(false);

  const input = `${file.data}`;

  return (
    <div className={css.preview}>
      <div className={css.title}>{path.basename(file.name)}</div>

      <div className={css.content}>
        <PlaintextEditor file={file} write={file.data} />
        <br />
        <Button
          variant="outlined"
          color="primary"
          onClick={() => toggleShow(!show)}
        >
          {show ? "hide" : "show"} Editor
        </Button>
        {show && <MarkdownEditor file={file} write={input} />}
      </div>
    </div>
  );
}

Previewer.propTypes = {
  file: PropTypes.object,
};

const REGISTERED_EDITORS = {
  // "text/plain": PlaintextEditor,
  // "text/markdown": MarkdownEditor,
};

function PlaintextFiles() {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const files = listFiles();
    setFiles(files);
  }, []);

  const write = (file) => {
    console.log("Writing soon... ", file.name);

    // TODO: Write the file to the `files` array
  };

  const handleModal = () => {
    setOpen((current) => !current);
  };

  useEffect(() => {
    console.log(setOpen);
  }, [setOpen]);
  const Editor = activeFile ? REGISTERED_EDITORS[activeFile.type] : null;

  return (
    <div className={css.page}>
      <title>File Editor</title>

      <aside>
        <header>
          <div className={css.tagline}>File Editor</div>
          <h1>File Manager</h1>
          <div className={css.description}>Select a file to view or edit </div>
        </header>

        <Button onClick={handleModal}>
          Add File <AddCircleOutline />
        </Button>
        <AddFile openModal={open} closeModal={handleModal} />
        <FilesTable
          files={files}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
        />

        <div style={{ flex: 1 }}></div>

        <footer></footer>
      </aside>

      <main className={css.editorWindow}>
        {activeFile && (
          <>
            {Editor && <Editor file={activeFile} write={write} />}
            {!Editor && <Previewer file={activeFile} />}
          </>
        )}

        {!activeFile && (
          <div className={css.empty}>Select a file to view or edit</div>
        )}
      </main>
    </div>
  );
}

export default PlaintextFiles;
