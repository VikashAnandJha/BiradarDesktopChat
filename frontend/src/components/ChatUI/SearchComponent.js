"use client";
import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import SearchResultUserComponent from "./SearchResultUserComponent";
import { SERVER_URL } from "@/AppConfig";
export default function SearchComponent() {
  const [email, setEmail] = useState("mailtovikashjha@gmail.com");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!email) {
      setError("Please enter an email address");
      return;
    }

    try {
      const response = await fetch(SERVER_URL + `/search/user?email=${email}`);
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        setError(data.message);
        setUserData(null);
      } else {
        setUserData(data.user);
        setError("");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("An unexpected error occurred. Please try again.");
      setUserData(null);
    }
  };

  return (
    <div>
      <Paper
        sx={{ p: "10px", display: "flex", alignItems: "center" }}
        style={{ padding: 10 }}
      >
        <Link href={"/chat"}>
          <IconButton color="default" sx={{ p: "10px" }} aria-label="back">
            <ArrowBack />
          </IconButton>
        </Link>
        <InputBase
          placeholder="Enter email id to search"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
        />
        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="search"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userData && <SearchResultUserComponent user={userData} />}
    </div>
  );
}
