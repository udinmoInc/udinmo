'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { FileText, Search, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import AIChatWindow from './chat-window';
import { useMediaQuery } from 'react-responsive'; 

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CommandPaletteItem {
  name: string;
  path?: string;
  icon?: React.ReactNode;
  category: string;
  action?: () => void;
}

const commandItems: CommandPaletteItem[] = [
  { name: 'Search the docs', icon: <Search className="h-4 w-4 text-gray-500 dark:text-zinc-500" />, category: 'DOCS' },
  { name: 'Ask Instantify AI', icon: <MessageSquare className="h-4 w-4 text-teal-500 dark:text-teal-500" />, category: 'ACTIONS' },
  { name: 'Getting Started', path: '/docs/getting-started', icon: <FileText className="h-4 w-4 text-gray-500 dark:text-zinc-500" />, category: 'GO TO' },
  { name: 'Database', path: '/docs/database', icon: <FileText className="h-4 w-4 text-gray-500 dark:text-zinc-500" />, category: 'GO TO' },
  { name: 'Auth', path: '/docs/auth', icon: <FileText className="h-4 w-4 text-gray-500 dark:text-zinc-500" />, category: 'GO TO' },
  { name: 'Storage', path: '/docs/storage', icon: <FileText className="h-4 w-4 text-gray-500 dark:text-zinc-500" />, category: 'GO TO' },
  { name: 'Functions', path: '/docs/functions', icon: <FileText className="h-4 w-4 text-gray-500 dark:text-zinc-500" />, category: 'GO TO' },
  { name: 'Realtime', path: '/docs/realtime', icon: <FileText className="h-4 w-4 text-gray-500 dark:text-zinc-500" />, category: 'GO TO' },
  { name: 'Blog', path: '/blog', icon: <FileText className="h-4 w-4 text-gray-500 dark:text-zinc-500" />, category: 'GO TO' },
  { name: 'Pricing', path: '/pricing', icon: <FileText className="h-4 w-4 text-gray-500 dark:text-zinc-500" />, category: 'GO TO' },
  { name: 'Billing', path: '/dashboard/billing', icon: <FileText className="h-4 w-4 text-gray-500 dark:text-zinc-500" />, category: 'GO TO' },
  { name: 'Inbox', path: '/inbox', icon: <FileText className="h-4 w-4 text-gray-500 dark:text-zinc-500" />, category: 'GO TO' },
  { name: 'Templates', path: '/templates', icon: <FileText className="h-4 w-4 text-gray-500 dark:text-zinc-500" />, category: 'GO TO' },
  { name: 'Categories', path: '/categories', icon: <FileText className="h-4 w-4 text-gray-500 dark:text-zinc-500" />, category: 'GO TO' },
];

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, setIsOpen }) => {
  const [query, setQuery] = useState('');
  const [cardWidth, setCardWidth] = useState<number>(0);
  const [cardHeight, setCardHeight] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  const isMobile = useMediaQuery({ maxWidth: 768 }); 

  const toggleModal = useCallback(() => setIsOpen(prev => !prev), [setIsOpen]);
  const openChatWindow = useCallback(() => setIsChatOpen(true), []);
  const closeChatWindow = useCallback(() => setIsChatOpen(false), []);

  useEffect(() => {
    const savedWidth = localStorage.getItem('commandPaletteWidth');
    const savedHeight = localStorage.getItem('commandPaletteHeight');
    const savedChatOpen = localStorage.getItem('isChatOpen');

    if (savedWidth && savedHeight && !isMobile) {
      setCardWidth(parseInt(savedWidth, 10));
      setCardHeight(parseInt(savedHeight, 10));
    } else if (isMobile) {
      setCardWidth(window.innerWidth);
      setCardHeight(window.innerHeight * 0.8); 
    }
    if (savedChatOpen === 'true') {
      setIsChatOpen(true);
    }
  }, [isMobile]);

  useEffect(() => {
    localStorage.setItem('isChatOpen', String(isChatOpen));
  }, [isChatOpen]);

  const saveSizeToLocalStorage = () => {
    if (cardRef.current && !isMobile) {
      const { width, height } = cardRef.current.getBoundingClientRect();
      localStorage.setItem('commandPaletteWidth', width.toString());
      localStorage.setItem('commandPaletteHeight', height.toString());
      setCardWidth(width);
      setCardHeight(height);
    }
  };

  const handleResize = (e: React.MouseEvent) => {
    if (cardRef.current && !isChatOpen && !isMobile) {
      const newWidth = e.clientX - cardRef.current.getBoundingClientRect().left;
      const newHeight = e.clientY - cardRef.current.getBoundingClientRect().top;
      setCardWidth(newWidth);
      setCardHeight(newHeight);
      saveSizeToLocalStorage();
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsChatOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [setIsOpen, setIsChatOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsChatOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen, setIsChatOpen]);

  const filteredItems = commandItems.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, CommandPaletteItem[]>);

  useEffect(() => {
    const handleCtrlI = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'i') {
        setIsOpen(true);
        setIsChatOpen(true);
      }
    };
    window.addEventListener('keydown', handleCtrlI);
    return () => window.removeEventListener('keydown', handleCtrlI);
  }, [setIsOpen, setIsChatOpen]);

  const mobileAnimation = {
    initial: { opacity: 0, y: '100vh' },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: '100vh' },
    transition: { duration: 0.3, ease: 'easeInOut' },
  };

  const desktopAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.25 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black backdrop-blur-sm"
          />

          <motion.div
            key="modal"
            initial={isMobile ? mobileAnimation.initial : desktopAnimation.initial}
            animate={isMobile ? mobileAnimation.animate : desktopAnimation.animate}
            exit={isMobile ? mobileAnimation.exit : desktopAnimation.exit}
            transition={isMobile ? mobileAnimation.transition : desktopAnimation.transition}
            className={`fixed inset-0 z-50 flex items-start ${isMobile ? 'justify-center items-end' : 'justify-center items-start'} p-4 pt-[15vh]`}
          >
            <div
              ref={cardRef}
              className={`w-full ${isMobile ? 'max-w-full max-h-[80vh] rounded-t-md' : 'max-w-xl min-w-[300px] min-h-[250px] max-h-[80vh] rounded-md'} overflow-auto bg-white dark:bg-zinc-900 text-black dark:text-white shadow-md p-0 border border-gray-300 dark:border-zinc-800 flex ${isChatOpen ? 'flex-col' : ''}`}
              style={{ width: cardWidth, height: cardHeight, resize: !isMobile && !isChatOpen ? 'both' : 'none' }}
            >
              {!isChatOpen && (
                <div className="flex-1 overflow-hidden pr-2">
                  <CardHeader className="p-0">
                    <div className="p-3">
                      <Input
                        autoFocus
                        placeholder="Search..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-gray-100 dark:bg-zinc-800 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-zinc-500 rounded-md border-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </CardHeader>

                  <CardContent className="p-0 overflow-auto max-h-[calc(80vh-64px)]">
                    <ScrollArea className="max-h-[300px]">
                      {Object.keys(groupedItems).map((category) => (
                        <div key={category}>
                          {groupedItems[category].length > 0 && (
                            <div className="px-3 py-1 text-xs font-semibold text-gray-500 dark:text-zinc-500">
                              {category}
                            </div>
                          )}
                          <ul>
                            {groupedItems[category].map((item, i) => (
                              <li key={i}>
                                {item.path ? (
                                  <Link
                                    href={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition"
                                  >
                                    {item.icon}
                                    {item.name}
                                    {category === 'GO TO' && <span className="ml-auto text-gray-400 dark:text-zinc-400">→</span>}
                                  </Link>
                                ) : (
                                  <button
                                    onClick={() => {
                                      if (item.name === 'Ask Instantify AI') {
                                        openChatWindow();
                                      } else {
                                        setIsOpen(false);
                                        if (item.action) item.action();
                                      }
                                    }}
                                    className="flex items-center gap-2 px-3 py-2 text-sm w-full hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition text-left"
                                  >
                                    {item.icon}
                                    {item.name}
                                  </button>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {filteredItems.length === 0 && (
                        <p className="px-3 py-2 text-sm text-gray-500 dark:text-zinc-500">
                          No results found.
                        </p>
                      )}
                    </ScrollArea>
                  </CardContent>
                </div>
              )}

              <AnimatePresence>
                {isChatOpen && (
                  <motion.div
                    key="chat-window"
                    initial={isMobile ? mobileAnimation.initial : { opacity: 0, x: 20 }}
                    animate={isMobile ? mobileAnimation.animate : { opacity: 1, x: 0 }}
                    exit={isMobile ? mobileAnimation.exit : { opacity: 0, x: 20 }}
                    transition={isMobile ? mobileAnimation.transition : { duration: 0.2 }}
                    className={`w-full h-full bg-white dark:bg-zinc-900 text-black dark:text-white ${isMobile ? 'rounded-t-md' : 'rounded-md'} shadow-md border border-gray-300 dark:border-zinc-800 overflow-hidden flex flex-col`}
                  >
                    <div className="flex justify-between items-center p-2 border-b border-gray-300 dark:border-zinc-800">
                      <button onClick={closeChatWindow} className="text-gray-500 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 4.06l-6.03 6.03a.75.75 0 01-1.06-1.06l7.5-7.5zM2.47 9.53a.75.75 0 010 1.06l7.5 7.5a.75.75 0 11-1.06 1.06L4.06 12l6.03-6.03a.75.75 0 011.06-1.06l-7.5 7.5z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2">Back</span>
                      </button>
                      <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-zinc-500 dark:hover:text-zinc-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex-grow overflow-y-auto">
                      <AIChatWindow />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;