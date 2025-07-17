"use client";

import React, { useState, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import {
  FileText,
  Folder,
  Image,
  Music,
  Video,
  Archive,
  Code,
  Settings,
  Coffee,
  Heart,
} from "lucide-react";

interface DesktopIconProps {
  id: string;
  name: string;
  type:
    | "file"
    | "folder"
    | "app"
    | "image"
    | "music"
    | "video"
    | "archive"
    | "code"
    | "easter-egg";
  initialPosition: { x: number; y: number };
  onDoubleClick?: (id: string) => void;
  onOpenApp?: (appId: string) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  name,
  type,
  initialPosition,
  onDoubleClick,
  onOpenApp,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const constraintsRef = useRef(null);

  const getIcon = () => {
    const iconProps = {
      size: 32,
      className: "text-white drop-shadow-lg",
    };

    switch (type) {
      case "file":
        return <FileText {...iconProps} />;
      case "folder":
        return (
          <Folder {...iconProps} className="text-blue-400 drop-shadow-lg" />
        );
      case "app":
        return (
          <Settings {...iconProps} className="text-gray-300 drop-shadow-lg" />
        );
      case "image":
        return (
          <Image {...iconProps} className="text-green-400 drop-shadow-lg" />
        );
      case "music":
        return (
          <Music {...iconProps} className="text-purple-400 drop-shadow-lg" />
        );
      case "video":
        return <Video {...iconProps} className="text-red-400 drop-shadow-lg" />;
      case "archive":
        return (
          <Archive {...iconProps} className="text-yellow-400 drop-shadow-lg" />
        );
      case "code":
        return <Code {...iconProps} className="text-blue-300 drop-shadow-lg" />;
      case "easter-egg":
        return name.includes("❤️") ? (
          <Heart {...iconProps} className="text-pink-400 drop-shadow-lg" />
        ) : name.includes("☕") ? (
          <Coffee {...iconProps} className="text-amber-400 drop-shadow-lg" />
        ) : (
          <FileText {...iconProps} className="text-yellow-300 drop-shadow-lg" />
        );
      default:
        return <FileText {...iconProps} />;
    }
  };

  const handleClick = () => {
    setIsSelected(!isSelected);

    // Single-click to open apps/files
    if (onDoubleClick) {
      onDoubleClick(id);
    }

    // For files that should open windows (like desktop files)
    if (
      onOpenApp &&
      (type === "file" ||
        type === "easter-egg" ||
        type === "code" ||
        type === "app")
    ) {
      onOpenApp(id);
    }

    // For folders, we could implement folder opening later
    if (type === "folder") {
      console.log(`Opening folder: ${name}`);
    }
  };

  const handleDoubleClick = () => {
    // Remove double-click functionality since we're using single-click
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setIsSelected(true);
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setIsDragging(false);

    // Update position based on drag offset
    const newPosition = {
      x: Math.max(0, position.x + info.offset.x),
      y: Math.max(50, position.y + info.offset.y), // Keep below menu bar
    };

    setPosition(newPosition);
  };

  return (
    <motion.div
      ref={constraintsRef}
      className="fixed select-none cursor-pointer z-10"
      style={{
        left: position.x,
        top: position.y,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: isDragging ? 2 : 0,
      }}
      transition={{
        delay: Math.random() * 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.1}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      whileHover={{
        scale: 1.1,
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.95 }}
      whileDrag={{
        scale: 1.1,
        zIndex: 50,
        rotate: 5,
      }}
    >
      {/* Selection highlight */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 bg-blue-500/25 rounded-lg border border-blue-400/60 -m-2 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Icon container */}
      <div className="flex flex-col items-center w-16 space-y-1 relative z-10">
        {/* Icon */}
        <motion.div
          className="w-12 h-12 flex items-center justify-center"
          animate={{
            y: isDragging ? -2 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {getIcon()}
        </motion.div>

        {/* Label */}
        <motion.span
          className="text-white text-xs text-center font-medium max-w-16 break-words leading-tight drop-shadow-lg px-1 py-0.5 rounded"
          style={{
            textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
            backgroundColor: isSelected
              ? "rgba(59, 130, 246, 0.3)"
              : "transparent",
          }}
          animate={{
            backgroundColor: isSelected
              ? "rgba(59, 130, 246, 0.3)"
              : "transparent",
          }}
        >
          {name}
        </motion.span>
      </div>

      {/* Tooltip for easter eggs */}
      {showTooltip && type === "easter-egg" && !isDragging && (
        <motion.div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap z-50"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
        >
          Click me! 😉
        </motion.div>
      )}

      {/* Drag indicator */}
      {isDragging && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border border-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      )}
    </motion.div>
  );
};

export default DesktopIcon;
