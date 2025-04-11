import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import EditImageComponent from "./EditImageComponent";

function EditImagesPage({
  data,
  entityId,
  entityType,
  isLoading,
  onUpload,
  onDelete,
  onReorder,
}) {
  return (
    <DndProvider backend={HTML5Backend}>
      <EditImageComponent
        isLoading={isLoading}
        onUpload={onUpload}
        onDelete={onDelete}
        onReorder={onReorder}
        images={data.images}
        entityId={entityId}
        entityType={entityType}
      />
    </DndProvider>
  );
}

export default EditImagesPage;
