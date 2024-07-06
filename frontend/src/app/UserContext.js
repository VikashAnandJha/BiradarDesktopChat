"use client";
import { getUserId } from "@/utils/auth";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  useEffect(() => {
    try {
      const userId = getUserId();
      console.log(userId);
      setUserId(userId);
    } catch (error) {
      router.replace("/");
    }
  }, [router]);

  return (
    <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
