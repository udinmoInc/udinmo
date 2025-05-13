"use client"
// pages/404.tsx
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Custom404 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800 relative overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[url('/subtle-texture.png')] bg-repeat opacity-10" />

      <div className="z-10 flex flex-col md:flex-row items-center justify-center p-6 md:p-8">
        <motion.div
          className="p-6 text-center md:text-left md:w-1/2 z-10"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Link href="/" className="inline-block mb-6 md:mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/logo-black.png"
                alt="Company Logo"
                width={120}
                height={36}
                className="w-30 h-auto md:w-40 md:h-auto"
              />
            </motion.div>
          </Link>
          <motion.h1
            className="text-3xl md:text-4xl font-bold mb-4 text-indigo-700"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            Whoops! Something Went Wrong
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-6 md:mb-8 text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6 }}
          >
            You’ve wandered off the beaten track, but don’t fret! Hit ‘Home’ and we’ll get you back on the map.
          </motion.p>
          <Link href="/">
            <motion.button
              className="px-5 py-2.5 bg-indigo-500 text-white rounded-full text-lg hover:bg-indigo-600 transition-all shadow-md"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
            >
              Return to Base
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          className="md:w-1/2 flex justify-center items-center p-6 md:p-8 z-10 mt-8 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
        >
          <div className="relative w-48 h-48 md:w-96 md:h-96">
            <motion.div
              className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-tr from-indigo-400 to-purple-500 shadow-lg"
              style={{ clipPath: 'circle(60%)' }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-36 h-36 md:w-72 md:h-72 rounded-full bg-gradient-to-bl from-teal-400 to-cyan-500 shadow-md"
              style={{ clipPath: 'circle(70%)' }}
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl md:text-8xl font-bold text-gray-200 opacity-60">
              404
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-gray-500 z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >&copy; Udinmo Interactive 2025 - All rights reserved.

        </motion.p>
      </div>
    </div>
  );
};

export default Custom404;
