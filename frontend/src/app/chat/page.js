"use client";
import ChatListComponent from "@/components/ChatUI/ChatListComponent";
import SearchComponent from "@/components/ChatUI/SearchComponent";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, Box, IconButton } from "@mui/material";
import { LogoutOutlined, SearchOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { UserProvider } from "../UserContext";

function ChatScreen({ params }) {
  const router = useRouter();
  const handleLogout = async () => {
    await localStorage.removeItem("token");
    router.replace("/");

    // Implement your logout logic here
    console.log("Logout clicked");
    // Redirect or clear session as needed
  };

  return (
    <UserProvider>
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px",
          }}
        >
          <Link href={"/chat"}>
            <Image
              src="/assets/logo_biradar.png"
              alt="Logo"
              width={180}
              height={50}
            />
          </Link>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Link href={"/chat/search"}>
              {" "}
              <IconButton>
                <SearchOutlined></SearchOutlined>
              </IconButton>
            </Link>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ marginLeft: "16px" }}
            >
              <LogoutOutlined />
            </Button>
          </Box>
        </Box>
        <section id="scrollbar2">
          <ChatListComponent />
        </section>
      </div>
    </UserProvider>
  );
}

export default ChatScreen;
