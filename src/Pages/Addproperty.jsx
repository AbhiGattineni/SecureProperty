import React from "react";
import Button from "../components/Button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import Index from "../components/Index";
import { auth, db, propertiesDbRef, storage } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import "firebase/storage";

function Addproperty() {
  const [values, setValues] = useState({
    propertyName: "",
    propertyAddress: "",
    propertyUrl: "",
  });
  const [propertyName, setPropertyName] = useState();
  const [user, setUser] = useState("");
  const inputs = [
    {
      id: 1,
      name: "propertyName",
      type: "text",
      placeholder: "Name of property",
    },
    {
      id: 2,
      name: "propertyAddress",
      type: "text",
      placeholder: "Located Address",
    },
  ];
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [progress, setProgress] = useState(0);
  const [Running, setRunning] = useState(false);
  const [uid, setUid] = useState("");
  const [URL, setUrl] = useState("");
  const [users, setUsers] = useState([]);
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(propertiesDbRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  const addNewProperty = async (event) => {
    event.preventDefault();
    if (imageAsFile == null) return;

    const imageRef = ref(storage, `/Images/${imageAsFile.name}`);
    await uploadBytes(imageRef, imageAsFile).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    getDownloadURL(imageRef)
      .then((url) => {
        setValues({ ...values, propertyUrl: url });
        console.log(url);
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
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

    await addDoc(propertiesDbRef, values)
      .then((propertiesDbRef) => {
        setValues({
          propertyName: "",
          propertyAddress: "",
          propertyUrl: "",
        });
        alert("Document created");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const uploadFile = (e) => {
  //   const image = e.target.files[0];
  //   setImageAsFile((imageFile) => image);
  // };

  // const handleDetails = async (event) => {
  //   event.preventDefault();
  //   const { propertyName, address } = values;
  //   try {
  //     const res = fetch(
  //       "https://propert-3ffe6-default-rtdb.firebaseio.com/PropertyDatawithkey.json",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ uid, propertyName, address }),
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const addNewProperty = (e) => {
  //   e.preventDefault();
  //   await addDoc(propertiesDbRef, values)
  //     .then((propertiesDbRef) => {
  //       setValues({
  //         propertyName: "",
  //         propertyAddress: "",
  //       });
  //       alert("Document created");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const submitFiles = (file) => {
  //   if (!file) return;
  //   let fileRef = ref(storage, `/Images/${file.name}`);
  //   const uploadTask = uploadBytesResumable(fileRef, file);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const prog = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setProgress(prog);
  //       console.log("upload is " + prog + "% done");
  //     },
  //     (err) => console.log(err),
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //         setUrl(url);
  //       });
  //     }
  //   );
  // };
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-4 place-items-center mt-10">
        <div className="bg-white/30 w-2/3 lg:w-2/3 md:2/3 rounded-lg drop-shadow-2xl border-1 border-white p-3">
          <h1 className="text-center p-10 font-bold text-blue-700 text-2xl">
            ADD PROPERTY
          </h1>
          <div className="container">
            <form onSubmit={addNewProperty} className="grid grid-cols-1 gap-3">
              {inputs.map((input) => (
                <Index
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
              <input
                className="form-control w-1/3 px-3 ml-12 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                type="file"
                onChange={(e) => {
                  setImageAsFile(e.target.files[0]);
                }}
              ></input>
              {Running ? (
                <div className="mx-5">
                  <div
                    className="bg-green-600 text-center rounded-lg"
                    style={{
                      opacity: 1,
                      width: `${progress}%`,
                    }}
                  >
                    {progress}%
                  </div>
                </div>
              ) : null}
              <div className="mx-5 flex justify-center">
                <Button
                  name={"Submit"}
                  styles={
                    "w-20 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg py-2.5"
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addproperty;
