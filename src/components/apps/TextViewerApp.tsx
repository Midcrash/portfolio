"use client";

import React from "react";
import { motion } from "framer-motion";

interface TextViewerAppProps {
  title: string;
  content: string;
  isCode?: boolean;
}

const TextViewerApp: React.FC<TextViewerAppProps> = ({
  title,
  content,
  isCode = false,
}) => {
  return (
    <div className="p-6 h-full overflow-hidden select-text">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
          <div className="h-px bg-gray-200 mb-4"></div>
        </div>

        {/* Content */}
        <div className="h-full overflow-y-auto">
          <div
            className={`
              p-4 rounded-lg h-full
              ${
                isCode
                  ? "bg-gray-900 text-green-400 font-mono text-sm"
                  : "bg-gray-50 text-gray-800"
              }
            `}
          >
            <pre className="whitespace-pre-wrap leading-relaxed">{content}</pre>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TextViewerApp;
