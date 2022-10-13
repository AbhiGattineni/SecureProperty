import React from "react";
import Button from "../components/Button";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import Index from "../components/Index";
import { auth, db, propertiesDbRef } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { Alert } from "bootstrap";

function Addproperty() {
  const [values, setValues] = useState({
    propertyName: "",
    propertyAddress: "",
  });
  const [user, setUser] = useState("");
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    setUid(user.uid);
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
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const [progress, setProgress] = useState(0);
  const [Running, setRunning] = useState(false);
  const [uid, setUid] = useState("");
  const [URL, setUrl] = useState("");
  const handleDetails = async (event) => {
    event.preventDefault();
    const { propertyName, address } = values;
    try {
      const res = fetch(
        "https://propert-3ffe6-default-rtdb.firebaseio.com/PropertyDatawithkey.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ uid, propertyName, address }),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addNewProperty = (e) => {
    e.preventDefault();
    addDoc(propertiesDbRef, values)
      .then((propertiesDbRef) => {
        setValues({
          propertyName: "",
          propertyAddress: "",
        });
        alert("Document created");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const submitFiles = (file) => {
    if (!file) return;
    let fileRef = ref(storage, `/Images/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
        console.log("upload is " + prog + "% done");
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrl(url);
        });
      }
    );
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
              {/* <input
                className="form-control w-1/3 px-3 ml-12 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                type="file"
                onChange={uploadFile}
                multiple
              ></input> */}
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
