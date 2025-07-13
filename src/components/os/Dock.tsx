"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  FolderOpen,
  Mail,
  FileText,
  Github,
  Linkedin,
  Code,
} from "lucide-react";

interface DockItemProps {
  icon: React.ReactNode;
  label: string;
  appId: string;
  isOpen: boolean;
  onClick: (appId: string) => void;
}

const DockItem: React.FC<DockItemProps> = ({
  icon,
  label,
  appId,
  isOpen,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(appId)}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* App Icon */}
      <motion.div
        className={`relative w-12 h-12 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg flex items-center justify-center border-2 ${
          isOpen ? "border-blue-400" : "border-gray-300"
        }`}
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 10,
        }}
      >
        {icon}

        {/* Active indicator */}
        {isOpen && (
          <motion.div
            className="absolute -bottom-1 w-1 h-1 bg-gray-800 rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        )}
      </motion.div>

      {/* Tooltip */}
      {isHovered && (
        <motion.div
          className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.div>
      )}
    </motion.div>
  );
};

interface DockProps {
  onOpenApp: (appId: string) => void;
  openApps: string[];
}

const Dock: React.FC<DockProps> = ({ onOpenApp, openApps }) => {
  const dockItems = [
    {
      icon: <User className="w-6 h-6 text-gray-700" />,
      label: "About Me",
      appId: "about",
    },
    {
      icon: <FileText className="w-6 h-6 text-gray-700" />,
      label: "Resume",
      appId: "resume",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-gray-700" />,
      label: "Projects",
      appId: "projects",
    },
    {
      icon: <Code className="w-6 h-6 text-gray-700" />,
      label: "Skills",
      appId: "skills",
    },
    {
      icon: <FolderOpen className="w-6 h-6 text-gray-700" />,
      label: "Experience",
      appId: "experience",
    },
    {
      icon: <Mail className="w-6 h-6 text-gray-700" />,
      label: "Contact",
      appId: "contact",
    },
    {
      icon: <Github className="w-6 h-6 text-gray-700" />,
      label: "GitHub",
      appId: "github",
    },
    {
      icon: <Linkedin className="w-6 h-6 text-gray-700" />,
      label: "LinkedIn",
      appId: "linkedin",
    },
  ];

  return (
    <motion.div
      className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-end space-x-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
        {dockItems.map((item) => (
          <DockItem
            key={item.appId}
            icon={item.icon}
            label={item.label}
            appId={item.appId}
            isOpen={openApps.includes(item.appId)}
            onClick={onOpenApp}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Dock;
