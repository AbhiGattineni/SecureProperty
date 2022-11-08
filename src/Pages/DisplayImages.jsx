import React, { useState } from "react";
import { useEffect } from "react";
import { getDocs } from "firebase/firestore";
import { auth, propertiesDbRef, propertyImagesDbRef } from "../firebase";

function DisplayImages() {
  const [tabs, setTabs] = useState([]);
  const [images, setImage] = useState([]);
  const [users, setUsers] = useState([]);
  const [openTab, setOpenTab] = useState();
  const [tabsLength, setTabsLength] = useState(false)
  const [usersLength, setUsersLength] = useState(false)

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(propertiesDbRef);
      // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      let propertynames = [];
      let propertyimg = [];
      data.docs.map((doc) => {
        const data = {
          propertyAddress: doc.data().propertyAddress,
          UserUid: doc.data().UserUid,
        };
        const img = {
          UserUid: doc.data().UserUid,
          propertyAddress: doc.data().propertyAddress,
          imageurl: doc.data().propertyUrl,
        };
        propertynames.push(data);
        propertyimg.push(img);
      });
      setTabs(propertynames);
      setImage(propertyimg);
      tabs.forEach((tab) => {
        if (tab.UserUid === auth.currentUser.uid) {
          setTabsLength(true)
        }
      })
    };
    getUsers();
  }, []);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(propertyImagesDbRef);
      // setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      let userName = [];
      data.docs.map((doc) => {
        const data = {
          ownerId: doc.data().ownerId,
          propertyName: doc.data().propertyName,
          propertyImageUrl: doc.data().propertyImageUrl,
        };
        userName.push(data);
      });
      setUsers(userName);
      users.forEach((user) => {
        if (user.ownerId === auth.currentUser.uid) {
          setUsersLength(true)
        }
      })
    };
    getUsers();
  }, []);
  return (
    <div className="bg-white">
      <div className="grid grid-cols-4">
        <div className="text-center">
          <ul className="grid grid-cols-1 divide-y">
            {tabs.map((tab, index) => {
              if (tab.UserUid === auth.currentUser.uid) {
                return (
                  <li className="py-3 hover:bg-gray-300">
                    < a key={index} href='#' onClick={() => setOpenTab(tab.propertyAddress)}>
                      {tab.propertyAddress}
                    </a>
                  </li>
                )
              }
            }
            )}
            {tabsLength ? (<div class="flex justify-center">
              <div class="block rounded-lg shadow-lg bg-white max-w-sm">
                <p class="text-gray-700 text-base mb-4 font-bold">
                  No properties added, Please add property
                </p>
              </div>
            </div>) : null}
          </ul>
        </div>
        <div className="p-3 col-span-3 bg-gray-400">
          {tabsLength ? (
            <div className="grid justify-items-center">
              <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm ">
                <p class="text-gray-700 text-base mb-4 font-bold">
                  Oops!.. There is no images to show.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid justify-items-center">
              <div class="block p-1 rounded-lg shadow-lg bg-white max-w-sm ">
                {images.map((imgs, index) => {
                  if (imgs.propertyAddress === openTab && imgs.UserUid === auth.currentUser.uid) {
                    return (
                      <img
                        className="w-full h-40"
                        src={imgs.imageurl}
                        alt="Property"
                      />
                    )
                  }
                }
                )}
              </div>
            </div>
          )}
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={tab.propertyAddress === openTab && tab.UserUid=== auth.currentUser.uid ? "block" : "hidden"}
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
                {users.map((user, index) => {
                  if (user.UserUid === auth.currentUser.uid) {
                    return (
                      <div key={index}>
                        <div>
                          <img
                            className="w-full h-40"
                            src={user.propertyImageUrl}
                            alt="Property"
                          />
                        </div>
                        <div className="pb-1 bg-gray-300 text-center font-medium relative h-10">
                          <div className="text-xl absolute inset-x-0 bottom-0 h-10 uppercase">
                            {user.propertyName}
                          </div>
                        </div>
                      </div>
                    )
                  }
                }
                )}
              </div>
            </div>
          ))}
          {usersLength ? null : (<div class="flex justify-center">
            <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
              <p class="text-gray-700 text-base mb-4 font-bold">
                Oops!.. There is no images to show.
              </p>
            </div>
          </div>)}
        </div>
      </div>
    </div >
  );
}

export default DisplayImages;
