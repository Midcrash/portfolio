"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Apple, Wifi, Battery, Volume2, Search, Settings } from "lucide-react";

const MenuBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
      setCurrentDate(
        now.toLocaleDateString([], {
          weekday: "short",
          month: "short",
          day: "numeric",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-1 bg-black/20 backdrop-blur-xl border-b border-white/10"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* Left Side - Apple Logo and App Menu */}
      <div className="flex items-center space-x-4">
        <motion.button
          className="p-1 rounded hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Apple className="w-5 h-5 text-white" />
        </motion.button>

        <div className="flex items-center space-x-4 text-white text-sm font-medium">
          <span className="cursor-pointer hover:text-white/80">Portfolio</span>
          <span className="cursor-pointer hover:text-white/80">File</span>
          <span className="cursor-pointer hover:text-white/80">Edit</span>
          <span className="cursor-pointer hover:text-white/80">View</span>
          <span className="cursor-pointer hover:text-white/80">Window</span>
          <span className="cursor-pointer hover:text-white/80">Help</span>
        </div>
      </div>

      {/* Right Side - System Controls */}
      <div className="flex items-center space-x-3">
        <motion.button
          className="p-1 rounded hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Search className="w-4 h-4 text-white" />
        </motion.button>

        <motion.button
          className="p-1 rounded hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Volume2 className="w-4 h-4 text-white" />
        </motion.button>

        <motion.button
          className="p-1 rounded hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Wifi className="w-4 h-4 text-white" />
        </motion.button>

        <motion.button
          className="p-1 rounded hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Battery className="w-4 h-4 text-white" />
        </motion.button>

        <motion.button
          className="p-1 rounded hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Settings className="w-4 h-4 text-white" />
        </motion.button>

        <div className="text-white text-sm font-medium">
          <div className="text-right">
            <div>{currentDate}</div>
            <div>{currentTime}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuBar;
