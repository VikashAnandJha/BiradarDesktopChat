"use client";
import ChatListComponent from "@/components/ChatUI/ChatListComponent";
import SearchComponent from "@/components/ChatUI/SearchComponent";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button, Box, IconButton } from "@mui/material";
import { LogoutOutlined, SearchOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { UserProvider } from "../UserContext";
import axiosInstance from "@/utils/axiosConfig";
import { io } from "socket.io-client";

function AllChatScreen({ params }) {
  const socketRef = useRef();
  const [convList, setConvList] = useState([]);
  const router = useRouter();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    router.replace("/");

    // Implement your logout logic here
    console.log("Logout clicked");
    // Redirect or clear session as needed
  };

  useEffect(() => {
    const fetchAllConv = async () => {
      try {
        const response = await axiosInstance.get(`/chat/getAllConv`, {});
        const data = response.data;
        console.log("Fetched conversations:", data);
        if (data.success) {
          setConvList(data.conversations);
        } else {
          console.error("Error fetching messages:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchAllConv();
  }, []);

  useEffect(() => {
    function alreadyInList(userId) {
      return (
        convList.filter((conv) => conv.target_user._id === userId).length > 0
      );
    }
    function updateMessageText(userId, text) {
      let updatedConvList = convList.map((conv) => {
        if (conv.target_user._id === userId) {
          return {
            ...conv,
            last_message: text,
          };
        }
        return conv;
      });

      setConvList(updatedConvList);
    }

    socketRef.current = io("http://localhost:3009");

    socketRef.current.on("receive_message", (message) => {
      console.log("Received message: ", message);

      if (alreadyInList(message.from_user)) {
        //just update the msg
        updateMessageText(message.from_user, message.message);
      }
    });

    return () => {
      console.log("Disconnecting from socket...");
      socketRef.current.disconnect();
    };
  }, [convList]); // Add convList as a dependency

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
                <SearchOutlined />
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
          <ChatListComponent convList={convList} />
        </section>
      </div>
    </UserProvider>
  );
}

export default AllChatScreen;
