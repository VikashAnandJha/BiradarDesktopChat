import ChatListComponent from "@/components/ChatUI/ChatListComponent";
import SearchComponent from "@/components/ChatUI/SearchComponent";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ChatScreen({ params }) {
  const style = {};
  return (
    <div>
      <Link href={"/chat"}>
        <Image
          src="/assets/logo_biradar.png"
          alt="Logo"
          width={180}
          height={50}
        />
      </Link>
      <section sx={style} id="scrollbar2">
        <SearchComponent />
        <ChatListComponent />
      </section>
    </div>
  );
}

export default ChatScreen;
