"use client"
import React, { useState, useCallback, useEffect } from 'react';
import { Search } from 'lucide-react';
import CommandPalette from './searchmodal';


const SearchBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); 

  
  const toggleCommandPalette = useCallback(() => setIsOpen((prev) => !prev), []);


  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault(); 
    toggleCommandPalette(); 
  };


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleCommandPalette()
      }
    };


    window.addEventListener('keydown', handleKeyDown);

 
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCommandPalette]);

  return (
    <div>
      <form
        className="flex items-center gap-1 p-0.5 rounded-md border-[1px] border-gray-300 dark:border-gray-700"
        onClick={handleSearchClick} 
      >
        <div className="block sm:hidden">
          <Search className="w-3.5 h-3.5 text-gray-600 dark:text-white" />
        </div>

        <div className="hidden sm:flex items-center gap-0.5">
          <Search className="w-3.5 h-3.5 text-gray-600 dark:text-white" />
          <input
            type="text"
            className="bg-transparent border-none outline-none text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 w-12 sm:w-14 md:w-16"
            placeholder="Search.."
          />
          <button
            type="submit"
            className="bg-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
            aria-label="Search shortcut"
          >
            ⌘ K
          </button>
        </div>
      </form>

   
      <CommandPalette isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default SearchBar;
