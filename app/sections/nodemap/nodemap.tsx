'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle, Server, BadgeCheck, Lock } from 'lucide-react';
import Image from 'next/image';

const steps = [
  {
    id: 'logo',
    icon: <Image src="/logo-ico.png" alt="Udinmo Logo" width={40} height={40} />,
    tooltipContent: 'Logo of Udinmo',
  },
  {
    id: 'ssl',
    icon: <ShieldCheck className="w-8 h-8 text-pink-500" />,
    tooltipContent: 'Searching for secure connection...',
    preview: (
      <div className="relative w-72 h-48 bg-white rounded-md shadow-xl overflow-hidden border border-gray-300">
        <div className="bg-gray-100 px-4 py-2 flex items-center justify-between text-xs font-medium text-gray-600">
          <span>🔒 https://udinmo.com</span>
          <span className="text-green-500 font-semibold">Secure</span>
        </div>
        <div className="p-4 text-sm text-gray-700">
          SSL Certificate Validation in Progress...
        </div>
      </div>
    ),
  },
  {
    id: 'formcheck',
    icon: <CheckCircle className="w-8 h-8 text-green-500" />,
    tooltipContent: 'Verifying form data...',
    preview: (
      <div className="relative w-64 h-40 bg-white rounded-md shadow-xl border border-gray-300 overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600">
          Form Validator
        </div>
        <div className="p-4 text-sm text-gray-700">
          Checking user-submitted data for accuracy and completeness.
        </div>
      </div>
    ),
  },
  {
    id: 'server',
    icon: <Server className="w-8 h-8 text-blue-400" />,
    tooltipContent: 'Verifying server status...',
    preview: (
      <div className="relative w-64 h-40 bg-white rounded-md shadow-xl border border-gray-300 overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600">
          Server Status
        </div>
        <div className="p-4 text-sm text-gray-700">
          Establishing connection to main server...
        </div>
      </div>
    ),
  },
  {
    id: 'verified',
    icon: <BadgeCheck className="w-8 h-8 text-emerald-500" />,
    tooltipContent: 'Server successfully verified!',
    preview: (
      <div className="relative w-64 h-40 bg-white rounded-md shadow-xl border border-gray-300 overflow-hidden">
        <div className="bg-green-100 px-4 py-2 text-xs font-medium text-green-700">
          ✅ Verified
        </div>
        <div className="p-4 text-sm text-gray-800">
          All credentials have been successfully verified.
        </div>
      </div>
    ),
  },
  {
    id: 'connect',
    icon: <Lock className="w-8 h-8 text-purple-500" />,
    tooltipContent: 'Establishing secure connection...',
    preview: (
      <div className="relative w-64 h-40 bg-white rounded-md shadow-xl border border-gray-300 overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 text-xs font-medium text-gray-600">
        🔐 Secure Connection
        </div>
        <div className="p-4 text-sm text-gray-700">
          Finalizing encrypted channel to Udinmo app...
        </div>
      </div>
    ),
  },
];

export default function AnimatedHorizontalFlow() {
  return (
    <section className="modern__product__teams min-h-[50vh] flex flex-col justify-center text-white px-4 relative overflow-hidden">
      <div className="text-center mb-16">
        <motion.h2
          className="text-2xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Journey of a Secure Transaction
        </motion.h2>
        <motion.p
          className="text-slate-400 text-base md:text-lg max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Every stage contributes to secure, authenticated, and verified connectivity across our systems.
        </motion.p>
      </div>

      <div className="relative flex justify-center items-center gap-8 w-full flex-wrap md:flex-nowrap">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="relative flex flex-col items-center group z-10"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <motion.div
              className="p-2 bg-[#111] rounded-full border border-neutral-700 shadow-lg group-hover:scale-110 transition-transform sm:p-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              {step.icon}
            </motion.div>

            <div className="absolute top-[-90px] md:top-16 opacity-0 group-hover:opacity-100 transition-opacity z-20 hidden sm:block">
              {step.preview}
            </div>

            {index !== steps.length - 1 && (
              <motion.div
                className="absolute top-1/2 left-full w-12 h-1 bg-gradient-to-r from-pink-500 to-blue-500 z-0 group-hover:w-full transition-all duration-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ transformOrigin: 'left center' }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
