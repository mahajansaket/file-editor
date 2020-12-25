import { gql } from "@apollo/client";

export const GET_TYPE = gql`
  query filesType {
    file_type {
      name
      type
    }
  }
`;
export const READ_FILES = gql`
  query readFiles($name: String) {
    file_list(where: { name: { _eq: $name } }) {
      name
      data
      type
      time
      lastModified
    }
  }
`;

export const UPDATE_FILES = gql`
  mutation updateFileData($name: String, $changes: file_list_set_input) {
    update_file_list(where: { name: { _eq: $name } }, _set: $changes) {
      affected_rows
      returning {
        data
        name
        time
        type
        lastModified
      }
    }
  }
`;

export const INSERT_FILES = gql`
  mutation insertFile($objects: [file_list_insert_input!]!) {
    insert_file_list(
      objects: $objects
      on_conflict: { constraint: rethink_pkey, update_columns: data }
    ) {
      affected_rows
      returning {
        data
        name
        time
        type
        lastModified
      }
    }
  }
`;

export const DELETE_FILE = gql`
  mutation deleteFile($name: String) {
    delete_file_list(where: { name: { _eq: $name } }) {
      affected_rows
      returning {
        data
        name
        time
        type
        lastModified
      }
    }
  }
`;
