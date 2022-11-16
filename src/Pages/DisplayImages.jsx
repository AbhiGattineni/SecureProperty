import React, { useState } from "react";
import { useEffect } from "react";
import { getDocs } from "firebase/firestore";
import { auth, propertiesDbRef, propertyImagesDbRef } from "../firebase";

function DisplayImages() {
  const [properties, setProperties] = useState([]);
  const [image, setImage] = useState([]);
  const [propertyImages, setPropertyImages] = useState([]);
  const [openTab, setOpenTab] = useState();
  const [propertyId, setPropertyId] = useState("");
  // const [tabsLength, setTabsLength] = useState(false);
  const [usersLength, setUsersLength] = useState(false);
  const [propertyAddress, setPropertyAddress] = useState("");
  const [propertyAddedDate, setPropertyAddedDate] = useState("");
  const [tabSelected, setTabSelected] = useState(false);

  useEffect(() => {
    const getProperties = async () => {
      const data = await getDocs(propertiesDbRef);
      let properties = [];
      data.docs.map((doc) => {
        const data = {
          propertyId: doc.id,
          propertyName: doc.data().propertyName,
          propertyAddress: doc.data().propertyAddress,
          UserUid: doc.data().UserUid,
          propertyUrl: doc.data().propertyUrl,
          propertyAddedDate: doc.data().propertyAddedDate,
        };
        properties.push(data);
      });
      setProperties(properties);
      // properties.forEach((property) => {
      //   if (property.UserUid === auth.currentUser.uid) {
      //     setTabsLength(true);
      //   }
      // });
    };
    getProperties();
  }, []);
  useEffect(() => {
    const getPropertyImages = async () => {
      const data = await getDocs(propertyImagesDbRef);
      let propertyImages = [];
      data.docs.map((doc) => {
        if (doc.data().ownerId === auth.currentUser.uid) {
          const data = {
            propertyId: doc.data().propertyId,
            propertyName: doc.data().propertyName,
            propertyImageUrl: doc.data().propertyImageUrl,
          };
          propertyImages.push(data);
          setUsersLength(true);
        }
      });
      setPropertyImages(propertyImages);
    };
    getPropertyImages();
  }, []);

  const onButtonClick = (e) => {
    setOpenTab(e.propertyAddress);
    setPropertyId(e.propertyId);
    setImage(e.propertyUrl);
    setPropertyAddress(e.propertyAddress);
    setPropertyAddedDate(e.propertyAddedDate);
    setTabSelected(true);
  };
  return (
    <div className="bg-white">
      <div className="grid grid-cols-4">
        <div className="text-center">
          <ul className="grid grid-cols-1 divide-y">
            {properties != null ? (
              properties.map((property, index) => {
                if (property.UserUid === auth.currentUser.uid) {
                  return (
                    <li className="py-3 hover:bg-gray-300">
                      <button
                        key={index}
                        onClick={() => onButtonClick(property)}
                      >
                        {property.propertyName}
                      </button>
                    </li>
                  );
                }
              })
            ) : (
              <div className="flex justify-center">
                <div className="block rounded-lg shadow-lg bg-white max-w-sm">
                  <p className="text-gray-700 text-base mb-4 font-bold">
                    No properties added, Please add property
                  </p>
                </div>
              </div>
            )}
          </ul>
        </div>
        <div className="p-3 col-span-3 bg-gray-400">
          {tabSelected ? (
            <div className="grid justify-items-center">
              <div className="block p-1 rounded-lg shadow-lg bg-white max-w-sm ">
                <div>
                  <img className="w-full h-40" src={image} alt="Property" />
                  <div className="grid grid-rows">
                    <small>Address:{propertyAddress}</small>
                    <small>Date: {propertyAddedDate}</small>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          {properties.map((property, index) => (
            <div
              key={index}
              className={
                property.propertyAddress === openTab &&
                property.UserUid === auth.currentUser.uid
                  ? "block"
                  : "hidden"
              }
            >
              <div className="relative w-6 mb-3">
                <select className="p-2 text-black bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                  <option>2022</option>
                  <option>2021</option>
                  <option>2020</option>
                  <option>2019</option>
                  <option>2018</option>
                  <option>2017</option>
                  <option>2016</option>
                  <option>2015</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {propertyImages.map((propertyImage, index) => {
                  if (propertyImage.propertyId === propertyId) {
                    return (
                      <div key={index}>
                        <div>
                          <img
                            className="w-full h-40"
                            src={propertyImage.propertyImageUrl}
                            alt="Property"
                          />
                        </div>
                        <div className="pb-1 bg-gray-300 text-center font-medium relative h-10">
                          <div className="text-xl absolute inset-x-0 bottom-0 h-10 uppercase">
                            date: 10/10/22
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          ))}
          {usersLength ? null : (
            <div className="flex justify-center">
              <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                <p className="text-gray-700 text-base mb-4 font-bold">
                  Oops!.. There is no images to show.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DisplayImages;
