import React from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

const getColor = props => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  if (props.isFileDialogActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const Dropzone = props => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFileDialogActive
  } = useDropzone({
    accept: "image/*",
    multiple: false,
    onDropAccepted: files => {
      props.handleFileUpload(files[0]);
    }
  });
  return (
    <Container
      {...getRootProps({
        isDragActive,
        isDragAccept,
        isDragReject,
        isFileDialogActive
      })}
    >
      <input {...getInputProps()} />
      <Typography variant="body1">
        {props.file ? `Uploaded ${props.file.name}` : "Upload Image"}
      </Typography>
    </Container>
  );
};

export default Dropzone;
