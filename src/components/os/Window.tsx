"use client";

import React, { useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
  title: string;
  isActive: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  initialPosition?: { x: number; y: number };
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({
  title,
  isActive,
  isMinimized,
  onClose,
  onFocus,
  onMinimize,
  initialPosition = { x: 100, y: 100 },
  children,
}) => {
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  const handleMouseDown = (e: React.PointerEvent) => {
    onFocus();
    dragControls.start(e);
  };

  return (
    <motion.div
      ref={constraintsRef}
      className="fixed inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className={`pointer-events-auto absolute bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col ${
          isActive ? "z-50" : "z-40"
        }`}
        style={{
          width: "800px",
          height: "600px",
          maxWidth: "90vw",
          maxHeight: "80vh",
        }}
        initial={{
          x: initialPosition.x,
          y: initialPosition.y,
          scale: 0.8,
        }}
        animate={{
          x: initialPosition.x,
          y: initialPosition.y,
          scale: isMinimized ? 0.1 : 1,
          opacity: isMinimized ? 0 : 1,
        }}
        drag
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        whileDrag={{ scale: 1.02 }}
        onClick={onFocus}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Title Bar */}
        <div
          className={`flex items-center justify-between px-4 py-2 border-b border-gray-200 cursor-move ${
            isActive ? "bg-gray-100" : "bg-gray-50"
          }`}
          onPointerDown={handleMouseDown}
        >
          {/* Traffic Light Buttons */}
          <div className="flex items-center space-x-2">
            <button
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <X className="w-2 h-2 text-red-800 opacity-0 hover:opacity-100 transition-opacity" />
            </button>
            <button
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize();
              }}
            >
              <Minus className="w-2 h-2 text-yellow-800 opacity-0 hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors">
              <Square className="w-2 h-2 text-green-800 opacity-0 hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Window Title */}
          <div className="flex-1 text-center">
            <h2 className="text-sm font-medium text-gray-800">{title}</h2>
          </div>

          {/* Right spacer to balance the layout */}
          <div className="w-16"></div>
        </div>

        {/* Window Content */}
        {!isMinimized && (
          <div className="flex-1 overflow-auto min-h-0">{children}</div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Window;
