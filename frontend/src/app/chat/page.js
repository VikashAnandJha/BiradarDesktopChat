import ChatListComponent from "@/components/ChatUI/ChatListComponent";
import Link from "next/link";
import React from "react";

function ChatScreen({ params }) {
  const style = {
    py: 0,
    width: "100%",
    backgroundColor: "background.paper",
    overflowY: "auto",
    height: "100px",
  };
  return (
    <div sx={style} id="scrollbar2">
      <ChatListComponent />
    </div>
  );
}

export default ChatScreen;
