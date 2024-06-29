"use client";
import Image from "next/image";
import "@fontsource/roboto/300.css";
import ChatListComponent from "@/components/ChatUI/ChatListComponent";
import { UserProvider } from "./UserContext";

export default function Home() {
  return (
    <UserProvider>
      <main className="flex min-h-screen  items-center "></main>
    </UserProvider>
  );
}
