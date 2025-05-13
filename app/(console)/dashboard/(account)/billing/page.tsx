"use client"
import MyComponent from "@/components/avatar/Def-avatar";
import Image from "next/image";

export default function AvatarPage() {
  return (
    <div>
      <h1>User Avatar</h1>
      <Image
        src="https://cdn.udinmo.net.in/avatar/V/ff5733.svg"
        alt="User Avatar"
        width={100}
        height={100}
      />
       <MyComponent/>
    </div>
   
  );
}
