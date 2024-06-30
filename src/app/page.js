"use client";
import Image from "next/image";
import "@fontsource/roboto/300.css";
import ChatListComponent from "@/components/ChatUI/ChatListComponent";
import { UserProvider } from "./UserContext";
import { Button } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen  items-center ">
      <Link href={"/chat"}>
        <Button>Enter Chat</Button>
      </Link>
    </main>
  );
}
