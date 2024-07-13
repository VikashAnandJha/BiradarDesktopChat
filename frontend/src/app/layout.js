import { Righteous } from "next/font/google";
import "./globals.css";

const righteous = Righteous({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "BiradarDesktop",
  description: "Chat Client",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={righteous.className}>{children}</body>
    </html>
  );
}
