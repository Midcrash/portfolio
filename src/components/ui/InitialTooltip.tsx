"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InitialTooltipProps {
  isMobile: boolean;
}

const InitialTooltip: React.FC<InitialTooltipProps> = ({ isMobile }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show tooltip after a brief delay on mount
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    // Hide tooltip after 5 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`fixed ${
            isMobile
              ? "bottom-20 left-1/2 transform -translate-x-1/2"
              : "bottom-24 left-1/2 transform -translate-x-1/2"
          } z-[9999] pointer-events-none`}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{
            type: "spring",
            damping: 15,
            stiffness: 300,
            duration: 0.6,
          }}
        >
          {/* Tooltip Content */}
          <div className="relative">
            {/* Main tooltip bubble */}
            <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl px-4 py-3 shadow-lg backdrop-blur-sm">
              <p
                className="text-gray-800 text-lg font-bold whitespace-nowrap"
                style={{
                  fontFamily:
                    'var(--font-permanent-marker), "Permanent Marker", cursive',
                }}
              >
                👉 Start by clicking an app!
              </p>
            </div>

            {/* Arrow pointing down to dock */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[10px] border-transparent border-t-yellow-400" />
              <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-t-[8px] border-transparent border-t-yellow-100 absolute -top-[9px] left-1/2 transform -translate-x-1/2" />
            </div>
          </div>

          {/* Subtle bounce animation */}
          <motion.div
            className="absolute inset-0"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InitialTooltip;
