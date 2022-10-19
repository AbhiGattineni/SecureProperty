import React from "react";
import Button from "../components/Button";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState, useRef } from "react";
import Index from "../components/Index";
import { auth, propertiesDbRef, storage } from "../firebase";
import { addDoc, getDocs } from "firebase/firestore";
import "firebase/storage";

function Addproperty() {
  const [values, setValues] = useState({
    propertyName: "",
    propertyAddress: "",
  });
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
  const [progress] = useState(0);
  const [Running] = useState(false);
  const [imageAsFile, setImageAsFile] = useState("");
  const inputRef = useRef(null);

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(propertiesDbRef);
  //     // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  // }, []);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const addNewProperty = async (event) => {
    event.preventDefault();
    if (imageAsFile == null) return;

    const imageRef = ref(storage, `/Images/${imageAsFile.name}`);
    await uploadBytes(imageRef, imageAsFile).then((snapshot) => {
      console.log(snapshot);
    });
    await getDownloadURL(imageRef)
      .then((url) => {
        console.log(url);
        addDoc(propertiesDbRef, { ...values, propertyUrl: url, UserUid: auth.currentUser.uid })
          .then((propertiesDbRef) => {
            setValues({
              propertyName: "",
              propertyAddress: "",
            });
            inputRef.current.value = null;
            alert("Document created");
          })
          .catch((error) => {
            console.log(error);
          });
        setValues({ ...values, propertyUrl: url, UserUid: auth.currentUser.uid });
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
    // await addDoc(propertiesDbRef, values)
    //   .then((propertiesDbRef) => {
    //     // setValues({
    //     //   propertyName: "",
    //     //   propertyAddress: "",
    //     //   propertyUrl: "",
    //     // });
    //     alert("Document created");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

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
                ref={inputRef}
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
