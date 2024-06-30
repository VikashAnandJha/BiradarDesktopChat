"use client";
import React, { useEffect, useState } from "react";
import ChatListComponent from "@/components/ChatUI/ChatListComponent";
import { data } from "./[id]/userslist";
import { Grid } from "@mui/material";
import { usePathname } from "next/navigation";

export default function ChatLayout({ children }) {
  const [usersList, setUserList] = useState(data);
  const pathname = usePathname();

  const leftPaneStyle = {
    maxHeight: "100vh",
    overflowY: "auto",
    borderRight: "1px solid #ccc",
  };

  const rightPaneStyle = {
    maxHeight: "100vh",
    overflowY: "auto",
  };

  return (
    <Grid container spacing={2} style={{ height: "100vh" }}>
      {pathname == "/chat" && (
        <Grid item xs={pathname == "/chat" ? 3 : 12}>
          <b>Biradar Chat</b>
          <section className="h-full" style={leftPaneStyle}>
            <ChatListComponent usersList={usersList} />
          </section>
        </Grid>
      )}
      {pathname != "/chat" && (
        <Grid item xs={12} style={rightPaneStyle}>
          {children}
        </Grid>
      )}
    </Grid>
  );
}
