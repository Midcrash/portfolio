"use client";

import React from "react";
import { motion } from "framer-motion";

interface MenuDropdownProps {
  title: string;
  isActive: boolean;
  onToggle: () => void;
  items: Array<{
    label?: string;
    action?: () => void;
    type?: "separator";
  }>;
}

const MenuDropdown: React.FC<MenuDropdownProps> = ({
  title,
  isActive,
  onToggle,
  items,
}) => {
  return (
    <div className="relative">
      <button
        className={`cursor-pointer px-2 py-1 rounded transition-colors ${
          isActive
            ? "bg-white/20 text-white"
            : "hover:bg-white/10 text-white/90 hover:text-white"
        }`}
        onClick={onToggle}
      >
        {title}
      </button>

      {isActive && (
        <motion.div
          className="absolute top-full left-0 mt-1 min-w-48 bg-white/95 backdrop-blur-xl rounded-lg shadow-lg border border-gray-200 py-1 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {items.map((item, index) =>
            item.type === "separator" ? (
              <div key={index} className="h-px bg-gray-200 my-1" />
            ) : (
              <button
                key={index}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                onClick={() => {
                  item.action?.();
                  onToggle();
                }}
              >
                {item.label}
              </button>
            )
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MenuDropdown;
