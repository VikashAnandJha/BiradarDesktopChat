"use client";
import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ListItemButton } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { data } from "./userslist";
export default function ChatListComponent({ convList }) {
  const pathname = usePathname();

  const style = {
    py: 0,
    width: "100%",
    backgroundColor: "background.paper",
  };
  return (
    <List sx={style}>
      {convList?.map((conv) => {
        return (
          <Link
            key={conv.target_user.email}
            href={"/chat/" + conv.target_user._id}
          >
            <ListItemButton
              selected={
                pathname === "/chat/" + conv.target_user._id ? true : false
              }
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={conv.target_user.name}
                    src={`https://i.pravatar.cc/150?u=${conv.target_user.name}`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={<b>{conv.target_user.name}</b>}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {conv.last_message}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </ListItemButton>
            <Divider component="li" />
          </Link>
        );
      })}
    </List>
  );
}
