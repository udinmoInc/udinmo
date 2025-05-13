"use client";

import { motion } from "framer-motion";
import { Server, ShieldCheck, RefreshCcw, Zap, CloudLightning, AppWindow, Plus, Edit, Trash2 } from "lucide-react";

const features = [
  { icon: <Server size={20} />, title: "Fast Server Deployment" },
  { icon: <ShieldCheck size={20} />, title: "Full Root Access" },
  { icon: <RefreshCcw size={20} />, title: "Auto Backup System" },
  { icon: <Zap size={20} />, title: "99.99% Uptime Guarantee" },
  { icon: <CloudLightning size={20} />, title: "DDoS Protection" },
  { icon: <AppWindow size={20} />, title: "1-Click App Installer" },
];

const actions = [
  { icon: <Plus size={16} />, title: "Add Server", description: "Deploy a new server" },
  { icon: <Edit size={16} />, title: "Manage Server", description: "Edit server settings" },
  { icon: <Trash2 size={16} />, title: "Delete Server", description: "Remove your server", danger: true },
];

export function HostingSection() {
  return (
    <section className="py-24 px-6 md:px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Hosting <span className="text-green-400">Out of the Box</span>.
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Host your apps with maximum speed, security, and flexibility — powered by UDINMO.
          </p>
        </motion.div>

        {/* Layout Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Features */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center p-4 rounded-xl bg-gray-900/70 backdrop-blur-md hover:bg-gray-800 transition"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 mr-4">
                  {feature.icon}
                </div>
                <span className="font-medium">{feature.title}</span>
              </div>
            ))}
          </motion.div>

          {/* Right - Action Card with Gradient */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative bg-gradient-to-br from-green-400 to-cyan-500 p-8 rounded-2xl shadow-2xl"
          >
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-black text-xs bg-white/30 px-4 py-1 rounded-full">
              Actions
            </div>
            <div className="mt-8 bg-gray-900/80 backdrop-blur-md rounded-xl p-6 space-y-6">
              {actions.map((action, idx) => (
                <button
                  key={idx}
                  className={`w-full flex items-start text-left p-4 rounded-lg hover:bg-gray-800 transition ${
                    action.danger ? "text-red-400" : "text-white"
                  }`}
                >
                  <div className="mt-1 mr-4">{action.icon}</div>
                  <div>
                    <div className="font-semibold">{action.title}</div>
                    <div className="text-xs text-gray-400">{action.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
