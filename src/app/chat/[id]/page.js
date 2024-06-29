// ChatScreen.js
"use client";
import { useRouter } from "next/navigation";
import { AccessAlarm, ArrowBack, ThreeDRotation } from "@mui/icons-material";

import React from "react";

const ChatScreen = () => {
  const router = useRouter();

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

  // Dummy data for header
  const headerInfo = {
    name: "Test User",
    lastSeen: "2 hrs ago",
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-200 p-4 flex flex-row">
        <ArrowBack onClick={() => router.back()} />
        <div className="text-xl font-bold">
          {headerInfo.name}
          <div className="text-sm text-gray-600">
            Last seen {headerInfo.lastSeen}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
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
      </div>

      {/* Input Box */}
      <div className="bg-gray-200 p-4">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default ChatScreen;
