"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usersList, setUserList] = useState([]);

  useEffect(() => {
    const getUsersList = async () => {
      try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await resp.json();
        console.log("userlist", data);
        setUserList(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsersList();
  }, []);

  return (
    <UserContext.Provider value={{ usersList, setUserList }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
