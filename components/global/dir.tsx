'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const DirectoryPath = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <div className="text-gray-700 dark:text-gray-300 overflow-hidden whitespace-nowrap text-center">
      <div className="flex items-center space-x-1">
        {pathSegments.map((segment, index) => {
          const pathTo = '/' + pathSegments.slice(0, index + 1).join('/');
          let displaySegment = segment.charAt(0).toUpperCase() + segment.slice(1);


         

          return (
            <span key={index} className="flex items-center">
              <Link
                href={pathTo}
                className="text-pink-500 text-sm hover:text-pink-700 transition-all duration-200"
              >
                <span className="font-semibold">{displaySegment}</span>
              </Link>
              {index < pathSegments.length - 1 && (
                <span className="text-gray-500">/</span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default DirectoryPath;
