import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { doc, getDoc } from "firebase/firestore";

import { db } from "../firebase";
import Dashboard from "../admin/Dashboard";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState("false");

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersDbRef);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   }
  //   getUsers()
  // }, [])
  useEffect(() => {
    FetchData();
  }, []);

  async function FetchData() {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data());
    if (docSnap.data().role === "Admin" ? setIsAdmin(true) : setIsAdmin(false));
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  if (currentUser && isAdmin === false) {
    return children;
  }
  if (currentUser && isAdmin === true) {
    return <Dashboard />;
  }
}
