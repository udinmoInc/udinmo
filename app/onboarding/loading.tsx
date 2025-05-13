'use client';

import Image from 'next/image';
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 dark:bg-gray-900 select-none">
      <Image
        src="/logo-ico.png"
        width={15}
        height={15}
        alt="Loading..."
        className="h-14 w-14 animate-spin pointer-events-none select-none"
        style={{
          filter: 'brightness(0%)', 
        }}
        draggable={false}
      />
    </div>
  );
};

export default Loader;
