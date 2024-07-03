import React from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

const LandingPage = () => {
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
          <Link href="/signup" passHref>
            <Button variant="contained" color="primary">
              Sign Up
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
