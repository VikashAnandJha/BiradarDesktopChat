"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowBack, SendRounded } from "@mui/icons-material";
import React, { useRef, useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { io } from "socket.io-client";

// // Dummy data for messages
const conv_id = "668330cd8b9489835c197d7c";
let CURRENT_USER = "user_" + Math.random() * 10000;
const ChatScreen = ({ params }) => {
  const [msgList, setMsgList] = useState([]);
  const router = useRouter();
  const msgRef = useRef();
  const msgEndRef = useRef(null);
  const socketRef = useRef();
  const searchParams = useSearchParams();

  const me = searchParams.get("me");

  useEffect(() => {
    CURRENT_USER = me;
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/chat/getAllChats?conv_id=${conv_id}`
        );
        const data = await response.json();
        if (data.success) {
          let list = data.messages;

          setMsgList(list);
          console.log("Messages:", list);
        } else {
          console.error("Error fetching messages:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchMessages();
  }, [conv_id]);

  useEffect(() => {
    console.log("incoming");
    // Connect to the Socket.io server
    socketRef.current = io("http://localhost:3009");

    // Listen for incoming messages
    socketRef.current.on("receive_message", (message) => {
      console.log(message);
      setMsgList((prevMsgList) => [...prevMsgList, message]);
    });

    return () => {
      // Clean up the socket connection when the component unmounts
      socketRef.current.disconnect();
    };
  }, []);

  const handleSubmitMessage = (event) => {
    event.preventDefault();
    let msgText = msgRef.current.value;

    const newMessage = {
      msg_id: Math.random() * 10000 + "_msg",
      from_user: me,
      to_user: params.id,
      message: msgText,
    };

    // Emit the message to the server
    socketRef.current.emit("send_message", newMessage);

    // Update the local message list
    //setMsgList((prevMsgList) => [...prevMsgList, newMessage]);

    msgRef.current.value = "";
  };

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmitMessage(event);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the message list whenever msgList changes
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgList]);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-200 p-2 flex flex-row items-center">
        <IconButton onClick={() => router.back()}>
          <ArrowBack />
        </IconButton>
        <div className="text-xl font-bold ml-2">{params.id}</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {msgList.map((message) => (
          <div
            key={message.msg_id}
            className={`mb-4 ${
              message.from_user === CURRENT_USER ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                message.from_user === CURRENT_USER
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {message.message}
            </div>
          </div>
        ))}
        <div ref={msgEndRef} />
      </div>

      {/* Input Box */}
      <div className="bg-gray-200 p-4 flex flex-row items-center">
        <input
          ref={msgRef}
          type="text"
          placeholder="Type your message..."
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          onKeyUp={handleInputKeyPress}
        />
        <IconButton onClick={handleSubmitMessage}>
          <SendRounded />
        </IconButton>
      </div>
    </div>
  );
};

export default ChatScreen;
