import { useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

const UploadImage = ({ setUrl }) => {
  const inputRef = useRef(null);
  const [imageAsFile, setImageAsFile] = useState("");

  const uploadImage = async (e) => {
    setImageAsFile(e.target.files[0]);

    if (imageAsFile == null) return;
    const imageRef = ref(storage, `/Images/${imageAsFile.name}`);
    await uploadBytes(imageRef, imageAsFile).then((snapshot) => {});
    await getDownloadURL(imageRef)
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        switch (error.code) {
          case "storage/object-not-found":
            console.log(error.code);
            break;
          case "storage/unauthorized":
            console.log(error.code);
            break;
          case "storage/canceled":
            console.log(error.code);
            break;

          case "storage/unknown":
            console.log(error.code);
            break;

          default:
            break;
        }
      });
  };

  return (
    <input
      className="form-control w-1/3 px-3 ml-12 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
      type="file"
      ref={inputRef}
      onChange={uploadImage}
    />
  );
};

export default UploadImage;
