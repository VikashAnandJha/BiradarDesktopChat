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
export default function SearchResultUserComponent({ user }) {
  const style = {
    py: 0,
    width: "100%",
    backgroundColor: "background.paper",
  };
  return (
    <List sx={style}>
      <Link key={user.email} href={"/chat/" + user._id}>
        <ListItemButton>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={user.name}
                src={`https://i.pravatar.cc/150?u=${user.name}`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={<b>{user.name}</b>}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Or bro kaha ja rhe
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </ListItemButton>
        <Divider component="li" />
      </Link>
    </List>
  );
}
