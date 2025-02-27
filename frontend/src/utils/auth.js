import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Convert to seconds

  return decodedToken.exp < currentTime;
};

export const getUserId = () => {
  let token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/";
  }

  const decodedToken = jwtDecode(token);
  return decodedToken.userId; // Assuming the token contains `user_id`
};
