"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowBack, SendRounded } from "@mui/icons-material";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { IconButton } from "@mui/material";
import { io } from "socket.io-client";
import { SERVER_URL } from "@/AppConfig";
import axiosInstance from "@/utils/axiosConfig";
import { getUserId } from "@/utils/auth";
import Image from "next/image";

const ChatScreen = ({ params }) => {
  const [msgList, setMsgList] = useState([]);
  const [targetUser, setTargetUser] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();

  const msgRef = useRef();
  const msgEndRef = useRef(null);
  const socketRef = useRef();
  const searchParams = useSearchParams();
  const CURRENT_USER = getUserId();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get(`/chat/getConv`, {
          params: {
            target_user_id: params.id,
          },
        });
        const data = response.data;
        if (data.success) {
          let reveredOrderMsg = data.recent_messages.reverse();
          setMsgList(reveredOrderMsg);
          setTargetUser(data.target_user);
          console.log(reveredOrderMsg);
        } else {
          console.error("Error fetching messages:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (params && params.id) {
      fetchMessages();
    }
  }, [params]);

  useEffect(() => {
    // Connect to the Socket.io server
    socketRef.current = io("http://localhost:3009");

    // Listen for incoming messages
    socketRef.current.on("chat-" + getUserId(), (message) => {
      setIsTyping(false);
      setMsgList((prevMsgList) => [...prevMsgList, message]);
      playIncomingSound();
    });

    if (targetUser?.id != undefined) {
      // Listen for incoming typing events
      socketRef.current.on(
        "typing-" + targetUser.id + "-" + getUserId(),
        (typing) => {
          console.log("typing..........");
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
          }, 2000);
        }
      );
    }

    return () => {
      // Clean up the socket connection when the component unmounts
      socketRef.current.disconnect();
    };
  }, [targetUser]);

  const handleSubmitMessage = (event) => {
    event.preventDefault();
    let msgText = msgRef.current.value;

    const newMessage = {
      msg_id: Math.random() * 10000 + "_msg",
      from_user: getUserId(),
      to_user: targetUser.id,
      message: msgText,
      token: localStorage.getItem("token"),
    };
    setMsgList((prevMsgList) => [...prevMsgList, newMessage]);
    // Emit the message to the server
    socketRef.current.emit("send_message", newMessage);

    playOutgoingSound();
    msgRef.current.value = "";
  };

  const debouncedEmitTyping = useCallback(
    debounce((typeData) => {
      socketRef.current.emit("send_typing", typeData);
    }, 100),
    []
  );

  const handleInputKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmitMessage(event);
    } else {
      const typeData = {
        fromUser: getUserId(),
        toUser: targetUser.id,
      };
      debouncedEmitTyping(typeData);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the message list whenever msgList changes
    if (msgEndRef.current) {
      msgEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgList, isTyping]);

  const playOutgoingSound = () => {
    const audio = new Audio("/sounds/send.wav");
    audio.play();
  };
  const playIncomingSound = () => {
    const audio = new Audio("/sounds/incoming_msg.mp3");
    audio.play();
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-gray-200 p-2 flex flex-row items-center">
        <IconButton onClick={() => router.back()}>
          <ArrowBack />
        </IconButton>
        <div className="text-xl font-bold ml-2">{targetUser?.name}</div>
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

        {isTyping && (
          <div className="mb-1 text-left">
            <Image
              alt="typing.."
              src="/assets/typinganimation.gif"
              width={50}
              height={30}
            />
          </div>
        )}
        <div ref={msgEndRef} />
      </div>

      {/* Input Box */}
      <div className="bg-gray-200 p-4 flex flex-row items-center">
        <input
          ref={msgRef}
          type="text"
          placeholder="Type your message..."
          className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500"
          onKeyDownCapture={handleInputKeyPress}
        />
        <IconButton onClick={handleSubmitMessage}>
          <SendRounded />
        </IconButton>
      </div>
    </div>
  );
};

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default ChatScreen;
