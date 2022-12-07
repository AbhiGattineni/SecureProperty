import React from "react";
import { useState, useRef } from "react";
import "firebase/storage";

import Button from "../components/Button";
import Index from "../components/Index";
import {
  auth,
  db,
  propertiesDbRef,
  propertyImagesDbRef,
  storage,
  usersDbRef,
} from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

import UploadImage from "../components/UploadImage";

function AdminAddProperties() {
  const [values, setValues] = useState({});
  const [progress] = useState(0);
  const [running] = useState(false);
  const [imageAsFile, setImageAsFile] = useState("");
  const inputRef = useRef(null);
  const [owners, setOwners] = useState([]);
  const [properties, setProperties] = useState([]);
  const [ownerId, setOwnerId] = useState("");
  const [propertyId, setPropertyId] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getOwners = async () => {
      const data = await getDocs(usersDbRef);
      // setOwners(data.docs.map((doc) => ({ ...doc.data(), name: doc.name })));
      let names = [];
      data.docs.map((doc) => {
        const data = {
          fullEmail: doc.data().emailAddress,
          id: doc.id,
        };
        names.push(data);
      });
      setOwners(names);
    };
    getOwners();
  }, []);

  useEffect(() => {
    const getProperties = async () => {
      const properties = await getDocs(propertiesDbRef);

      let ownerProperties = [];
      properties.docs.map((doc) => {
        if (doc.data().UserUid === ownerId) {
          const property = {
            propertyName: doc.data().propertyName,
            propertyId: doc.id,
          };
          ownerProperties.push(property);
        }
      });
      setProperties(ownerProperties);
    };
    getProperties();
  }, [ownerId]);

  const addNewProperty = async (event) => {
    event.preventDefault();
    if (imageAsFile == null) return;

    const imageRef = ref(storage, `/Images/${imageAsFile.name}`);
    await uploadBytes(imageRef, imageAsFile)
      .then((snapshot) => {
        getDownloadURL(imageRef).then((url) => {
          addDoc(propertyImagesDbRef, {
            ...values,
            propertyImageUrl: url,
            ownerId: ownerId,
            propertyId: propertyId,
          })
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
        });

        // setValues({
        //   ...values,
        //   propertyUrl: url,
        //   ownerId: auth.currentUser.uid,
        // });
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
  };

  const getUrl = (e) => {
    setUrl(e);
  };

  return (
    <div className="container-fluid py-40">
      <div className="grid grid-cols-1 gap-4 place-items-center">
        <div className="bg-white/30 w-2/3 lg:w-2/3 md:2/3 rounded-lg drop-shadow-2xl border-1 border-white p-3">
          <h1 className="text-center p-10 font-bold text-blue-700 text-2xl">
            ADD PROPERTY
          </h1>
          <div className="container">
            <form onSubmit={addNewProperty} className="grid grid-cols-1 gap-3">
              <select
                onChange={(e) => {
                  setOwnerId(e.target.value);
                }}
                className="w-full px-2 py-2 border-2 border-gray-500 rounded-lg"
              >
                <option defaultValue=""></option>
                {owners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.fullEmail}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => {
                  setPropertyId(e.target.value);
                }}
                className="w-full px-2 py-2 border-2 border-gray-500 rounded-lg"
              >
                <option defaultValue=""></option>
                {properties.map((property) => (
                  <option key={property.propertyId} value={property.propertyId}>
                    {property.propertyName}
                  </option>
                ))}
              </select>
              <input
                className="form-control w-1/3 px-3 ml-12 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded"
                type="file"
                ref={inputRef}
                onChange={(e) => {
                  setImageAsFile(e.target.files[0]);
                }}
              />
              {running ? (
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

export default AdminAddProperties;
