"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Apple, Wifi, Battery, Volume2, Search, Settings } from "lucide-react";
import MenuDropdown from "../ui/MenuDropdown";

const MenuBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [activeDropdown]);

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

  // Mobile version
  if (isMobile) {
    return (
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 bg-black/20 backdrop-blur-xl border-b border-white/10"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* Left Side - Name */}
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-1 rounded hover:bg-white/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Apple className="w-5 h-5 text-white" />
          </motion.button>
          <span className="text-white text-sm font-medium">Tyrae Yao</span>
        </div>

        {/* Right Side - Time only */}
        <div className="text-white text-sm font-medium">
          <div className="text-right">
            <div>{currentTime}</div>
          </div>
        </div>
      </motion.div>
    );
  }

  // Desktop version
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
          <MenuDropdown
            title="Portfolio"
            isActive={activeDropdown === "portfolio"}
            onToggle={() =>
              setActiveDropdown(
                activeDropdown === "portfolio" ? null : "portfolio"
              )
            }
            items={[
              { label: "About This Portfolio", action: () => {} },
              { label: "System Information", action: () => {} },
              { type: "separator" },
              { label: "Shut Down", action: () => {} },
            ]}
          />
          <MenuDropdown
            title="File"
            isActive={activeDropdown === "file"}
            onToggle={() =>
              setActiveDropdown(activeDropdown === "file" ? null : "file")
            }
            items={[
              { label: "New Window", action: () => {} },
              { label: "Open...", action: () => {} },
              { type: "separator" },
              { label: "Save", action: () => {} },
              { label: "Save As...", action: () => {} },
            ]}
          />
          <MenuDropdown
            title="Edit"
            isActive={activeDropdown === "edit"}
            onToggle={() =>
              setActiveDropdown(activeDropdown === "edit" ? null : "edit")
            }
            items={[
              { label: "Undo", action: () => {} },
              { label: "Redo", action: () => {} },
              { type: "separator" },
              { label: "Cut", action: () => {} },
              { label: "Copy", action: () => {} },
              { label: "Paste", action: () => {} },
            ]}
          />
          <MenuDropdown
            title="View"
            isActive={activeDropdown === "view"}
            onToggle={() =>
              setActiveDropdown(activeDropdown === "view" ? null : "view")
            }
            items={[
              { label: "Show Toolbar", action: () => {} },
              { label: "Show Status Bar", action: () => {} },
              { type: "separator" },
              { label: "Zoom In", action: () => {} },
              { label: "Zoom Out", action: () => {} },
            ]}
          />
          <MenuDropdown
            title="Window"
            isActive={activeDropdown === "window"}
            onToggle={() =>
              setActiveDropdown(activeDropdown === "window" ? null : "window")
            }
            items={[
              { label: "Minimize", action: () => {} },
              { label: "Zoom", action: () => {} },
              { type: "separator" },
              { label: "Bring All to Front", action: () => {} },
            ]}
          />
          <MenuDropdown
            title="Help"
            isActive={activeDropdown === "help"}
            onToggle={() =>
              setActiveDropdown(activeDropdown === "help" ? null : "help")
            }
            items={[
              { label: "Portfolio Help", action: () => {} },
              { label: "Contact Support", action: () => {} },
              { type: "separator" },
              { label: "About Portfolio", action: () => {} },
            ]}
          />
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
