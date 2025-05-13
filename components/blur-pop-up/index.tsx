'use client'

import React, { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { blurPopUp } from '@/lib/animations';

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const BlurPopUp: FC<Props> = ({ children, delay = 1, className }) => {
  return (
    <motion.div
      variants={blurPopUp}  // Apply the blurPopUp animation
      initial="initial"  // Start with initial state
      animate="animate"  // Apply animate state
      exit="exit"         // Handle exit state
      className={className}  // Apply any custom class passed
      viewport={{ once: true }}  // Trigger animation once in view
      transition={{
        duration: 0.7,
        ease: 'easeOut',
        delay,  // Delay can be passed as a prop
      }}
    >
      {children}  {/* Render children inside the animated component */}
    </motion.div>
  );
};

export default BlurPopUp;
