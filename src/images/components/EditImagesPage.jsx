import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import EditImageComponent from "./EditImageComponent";

function EditImagesPage({ dogData }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <EditImageComponent
        images={dogData.images}
        onUpload={"handleUpload"}
        onDelete={"handleDelete"}
        onReorder={"handleReorder"}
        loading={"loading"}
      />
    </DndProvider>
  );
}

export default EditImagesPage;
