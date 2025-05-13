"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React from "react";


interface EmojiPickerProps {
  children: React.ReactNode;
  getValue?: (emoji: string) => void;
}
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const EmojiPicker: React.FC<EmojiPickerProps> = ({ children, getValue }) => {
  const route = useRouter();

  const onClick = (selectedEmoji: any) => {
    if (getValue) getValue(selectedEmoji.emoji);
  };

  return (
    <div className="flex items-center">
      <Popover>
        <PopoverTrigger className="cursor-pointer">
          {children}
        </PopoverTrigger>
        <PopoverContent className="p-0 border-none">
        
          <div className="relative">
            <React.Suspense fallback={<div>Loading...</div>}>
              <Picker onEmojiClick={onClick} />
            </React.Suspense>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EmojiPicker;
