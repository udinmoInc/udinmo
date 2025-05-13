'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
}

const AIChatWindow = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the bottom whenever new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newUserMessage: ChatMessage = { sender: 'user', text: inputText };
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      setInputText('');

      // Simulate AI response after a short delay
      setTimeout(() => {
        const aiResponse = generateAIResponse(inputText);
        const newAIMessage: ChatMessage = { sender: 'ai', text: aiResponse };
        setMessages((prevMessages) => [...prevMessages, newAIMessage]);
      }, 500); // Adjust delay as needed
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    // Replace this with your actual AI logic or API call
    const lowerCaseMessage = userMessage.toLowerCase();
    if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
      return 'Hello there! How can I help you today?';
    } else if (lowerCaseMessage.includes('how are you')) {
      return "I'm doing well, thank you for asking!";
    } else {
      return "That's an interesting question!";
    }
  };

  return (
    <div className="flex flex-col h-full p-2">
      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto space-y-2"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-md ${
              msg.sender === 'user'
                ? 'bg-blue-500 text-white self-end'
                : 'bg-gray-300 dark:bg-zinc-600 self-start'
            }`}
          >
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-2">
        <div className="flex items-center">
          <input
            type="text"
            className="flex-grow p-2 rounded-md border border-gray-300 dark:border-zinc-500 text-black dark:text-white bg-white dark:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask me something..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                handleSendMessage();
              }
            }}
          />
          <button
            className="ml-2 p-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatWindow;