"use client";
import React, { useEffect } from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { isTokenExpired } from "@/utils/auth";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token != null) {
      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
      } else {
        router.replace("/chat");
      }
    }
  }, [router]);
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          fontFamily: "Righteous, sans-serif",
        }}
      >
        {" "}
        <Link href={"/"}>
          <Image
            src="/assets/logo_biradar.png"
            alt="Logo"
            width={200}
            height={50}
          />
        </Link>
        <Typography component="h1" variant="h2" gutterBottom>
          Welcome to Biradar
        </Typography>
        <Typography component="p" variant="h5" align="center" gutterBottom>
          Biradar is a chat/social/teams app designed to keep you connected with
          your friends, family, and colleagues.
        </Typography>
        <Typography component="p" variant="h5" align="center" gutterBottom>
          Stay in touch, collaborate, and share moments all in one place.
        </Typography>
        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Link href="/chat" passHref>
            <Button variant="text" color="primary">
              Chat
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button variant="contained" color="info">
              Signup
            </Button>
          </Link>
          <Link href="/signin" passHref>
            <Button variant="outlined" color="primary">
              Sign In
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LandingPage;
