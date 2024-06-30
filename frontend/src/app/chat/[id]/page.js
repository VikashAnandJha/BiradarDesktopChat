// ChatScreen.js
"use client";
import { useRouter } from "next/navigation";
import { ArrowBack, SendRounded } from "@mui/icons-material";
import React, { useRef, useState, useEffect } from "react";
import { IconButton } from "@mui/material";

// Dummy data for messages
const messages = [
  { id: 1, sender: "me", text: "Hey, how are you?" },
  { id: 2, sender: "test user", text: "Hi! I'm good, thanks." },
  { id: 3, sender: "me", text: "What are you up to today?" },
  {
    id: 4,
    sender: "test user",
    text: "Just relaxing at home. How about you?",
  },
  { id: 5, sender: "me", text: "Same here. It's nice weather today!" },
  { id: 6, sender: "test user", text: "Yeah, it's perfect for staying in." },
];

const ChatScreen = ({ params }) => {
  const [msgList, setMsgList] = useState(messages);
  const router = useRouter();
  const msgRef = useRef();
  const msgEndRef = useRef(null);

  // Dummy data for header
  const headerInfo = {
    name: "Test User",
    lastSeen: "2 hrs ago",
  };

  const handleSubmitMessage = (event) => {
    event.preventDefault();
    let msgText = msgRef.current.value;

    setMsgList([
      ...msgList,
      { id: Math.random() * 10000, sender: "me", text: msgText },
    ]);

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
        <IconButton>
          <ArrowBack onClick={() => router.back()} />
        </IconButton>
        <div className="text-xl font-bold ml-2">{params.id}</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {msgList.map((message) => (
          <div
            key={message.id}
            className={`mb-4 ${
              message.sender === "me" ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                message.sender === "me"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300"
              }`}
            >
              {message.text}
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
