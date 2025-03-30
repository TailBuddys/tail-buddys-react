// import React from "react";
// import UploadImagesComponent from "../../images/components/UploadImagesComponent";
// import useImages from "../../images/hooks/useImages";
// import UploadImagesForm from "../../images/components/UploadImagesForm";
// import initialUploadImagesForm from "../../images/helpers/initialForms/initialUploadImagesForm";

// const UploadDogImagesPage = () => {
//   const { handleUploadImages, validateImage } = useImages(
//     initialUploadImagesForm
//   );
//   return (
//     <UploadImagesForm
//       onSubmit={handleUploadImages}
//       validateImage={validateImage()}
//       title={"Upload Images"}
//       styles={{ maxWidth: "800px" }}
//     >
//       <UploadImagesComponent imageNum={1} />
//       <UploadImagesComponent imageNum={2} />
//       <UploadImagesComponent imageNum={3} />
//       <UploadImagesComponent imageNum={4} />
//       <UploadImagesComponent imageNum={5} />
//     </UploadImagesForm>
//   );
// };

// export default UploadDogImagesPage;
import React, { useState } from "react";
import UploadImagesComponent from "../../images/components/UploadImagesComponent";
import useImages from "../../images/hooks/useImages";
import UploadImagesForm from "../../images/components/UploadImagesForm";
import initialUploadImagesForm from "../../images/helpers/initialForms/initialUploadImagesForm";

const UploadDogImagesPage = () => {
  const [images, setImages] = useState({
    file1: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
  });

  const { handleUploadImages, validateImage } = useImages(images);

  const handleImageChange = (file, imageNum) => {
    setImages((prev) => ({ ...prev, [`file${imageNum}`]: file }));
    console.log(images);
  };

  return (
    <UploadImagesForm
      onSubmit={() => handleUploadImages(images)}
      validateImage={validateImage(images)}
      title={"Upload Images"}
      styles={{ maxWidth: "800px" }}
    >
      {[1, 2, 3, 4, 5].map((num) => (
        <UploadImagesComponent
          key={num}
          imageNum={num}
          onImageChange={handleImageChange}
        />
      ))}
    </UploadImagesForm>
  );
};

export default UploadDogImagesPage;
