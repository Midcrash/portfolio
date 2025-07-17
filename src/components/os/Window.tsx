"use client";

import React, { useRef, useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { X, Minus, Square, ArrowLeft } from "lucide-react";

interface WindowProps {
  title: string;
  isActive: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  initialPosition?: { x: number; y: number };
  children: React.ReactNode;
  isMobile?: boolean;
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
  isMobile = false,
}) => {
  const dragControls = useDragControls();
  const constraintsRef = useRef(null);

  // Window dimensions state
  const [dimensions, setDimensions] = useState({
    width: 600,
    height: 500,
  });

  // Window position state
  const [position, setPosition] = useState(initialPosition);

  // Resize state
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e: React.PointerEvent) => {
    if (!isMobile) {
      onFocus();
      dragControls.start(e);
    }
  };

  // Resize handlers
  const handleResizeStart = (e: React.PointerEvent, direction: string) => {
    e.stopPropagation();
    setIsResizing(true);
    onFocus();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = dimensions.width;
    const startHeight = dimensions.height;

    const handleResizeMove = (e: PointerEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = position.x;
      let newY = position.y;

      // Calculate new dimensions and position based on resize direction
      if (direction.includes("right")) {
        newWidth = Math.max(300, Math.min(1200, startWidth + deltaX));
      }
      if (direction.includes("left")) {
        newWidth = Math.max(300, Math.min(1200, startWidth - deltaX));
        newX = position.x + (startWidth - newWidth);
      }
      if (direction.includes("bottom")) {
        newHeight = Math.max(200, Math.min(800, startHeight + deltaY));
      }
      if (direction.includes("top")) {
        newHeight = Math.max(200, Math.min(800, startHeight - deltaY));
        newY = position.y + (startHeight - newHeight);
      }

      setDimensions({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    };

    const handleResizeEnd = () => {
      setIsResizing(false);
      document.removeEventListener("pointermove", handleResizeMove);
      document.removeEventListener("pointerup", handleResizeEnd);
    };

    document.addEventListener("pointermove", handleResizeMove);
    document.addEventListener("pointerup", handleResizeEnd);
  };

  // Mobile version
  if (isMobile) {
    return (
      <motion.div
        className="fixed inset-0 pointer-events-auto bg-white z-50"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={onFocus}
      >
        {/* Mobile Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
          <button
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
            onClick={onClose}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

          <button
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-auto h-full pb-14">{children}</div>
      </motion.div>
    );
  }

  // Desktop version
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
        } ${isResizing ? "select-none" : ""}`}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          maxWidth: "90vw",
          maxHeight: "80vh",
        }}
        initial={{
          x: position.x,
          y: position.y,
          scale: 0.8,
        }}
        animate={{
          x: position.x,
          y: position.y,
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
        {/* Desktop Title Bar */}
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

        {/* Desktop Content */}
        {!isMinimized && (
          <div className="flex-1 overflow-auto min-h-0 relative">
            {children}

            {/* Resize Handles */}
            {!isMobile && (
              <>
                {/* Corner Handles */}
                <div
                  className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize opacity-0 hover:opacity-100 transition-opacity"
                  onPointerDown={(e) => handleResizeStart(e, "top-left")}
                  style={{ background: "transparent" }}
                />
                <div
                  className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize opacity-0 hover:opacity-100 transition-opacity"
                  onPointerDown={(e) => handleResizeStart(e, "top-right")}
                  style={{ background: "transparent" }}
                />
                <div
                  className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize opacity-0 hover:opacity-100 transition-opacity"
                  onPointerDown={(e) => handleResizeStart(e, "bottom-left")}
                  style={{ background: "transparent" }}
                />
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                  onPointerDown={(e) => handleResizeStart(e, "bottom-right")}
                >
                  {/* Visible resize handle in bottom-right corner */}
                  <div className="absolute bottom-0 right-0 w-3 h-3">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      className="opacity-40 hover:opacity-80 transition-opacity"
                    >
                      <path d="M12 12L12 8L8 12Z" fill="currentColor" />
                      <path d="M12 12L12 4L4 12Z" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                {/* Edge Handles */}
                <div
                  className="absolute top-0 left-3 right-3 h-1 cursor-n-resize opacity-0 hover:opacity-100 transition-opacity"
                  onPointerDown={(e) => handleResizeStart(e, "top")}
                  style={{ background: "transparent" }}
                />
                <div
                  className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize opacity-0 hover:opacity-100 transition-opacity"
                  onPointerDown={(e) => handleResizeStart(e, "bottom")}
                  style={{ background: "transparent" }}
                />
                <div
                  className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize opacity-0 hover:opacity-100 transition-opacity"
                  onPointerDown={(e) => handleResizeStart(e, "left")}
                  style={{ background: "transparent" }}
                />
                <div
                  className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize opacity-0 hover:opacity-100 transition-opacity"
                  onPointerDown={(e) => handleResizeStart(e, "right")}
                  style={{ background: "transparent" }}
                />
              </>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Window;
