import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { getDocs } from "firebase/firestore";
import { usersDbRef } from "../firebase";


export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [isUser,setIsUser] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersDbRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUsers()
  }, [])

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  if (users.Role === "User") {
    setIsUser(true);
  }
  return children;
}
