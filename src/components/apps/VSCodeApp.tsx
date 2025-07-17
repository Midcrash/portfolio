"use client";

import React, { useState } from "react";
import {
  Files,
  Search,
  GitBranch,
  Bug,
  Package,
  Settings,
  Terminal,
  X,
  Minus,
  Square,
  Play,
  Folder,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

const VSCodeApp: React.FC = () => {
  const [activeFile, setActiveFile] = useState("portfolio.tsx");
  const [showTerminal, setShowTerminal] = useState(true);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([
    "src",
    "components",
  ]);

  const toggleFolder = (folder: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folder)
        ? prev.filter((f) => f !== folder)
        : [...prev, folder]
    );
  };

  const fileTree: FileTreeItem[] = [
    {
      name: "portfolio",
      type: "folder" as const,
      children: [
        {
          name: "src",
          type: "folder" as const,
          children: [
            {
              name: "components",
              type: "folder" as const,
              children: [
                { name: "Desktop.tsx", type: "file" as const, icon: "🔷" },
                { name: "Dock.tsx", type: "file" as const, icon: "🔷" },
                { name: "Window.tsx", type: "file" as const, icon: "🔷" },
              ],
            },
            {
              name: "app",
              type: "folder" as const,
              children: [
                { name: "page.tsx", type: "file" as const, icon: "🔷" },
                { name: "globals.css", type: "file" as const, icon: "🎨" },
              ],
            },
          ],
        },
        { name: "package.json", type: "file" as const, icon: "📦" },
        { name: "README.md", type: "file" as const, icon: "📄" },
        { name: "tsconfig.json", type: "file" as const, icon: "🔧" },
      ],
    },
  ];

  const codeContent = `// Welcome to my portfolio VSCode easter egg! 🎉
import React from "react";
import { motion } from "framer-motion";

const Portfolio: React.FC = () => {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Thanks for exploring my portfolio! 🚀
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Easter Egg Discovered! 🥚
            </h2>
            <p className="text-white/90">
              You found my VSCode easter egg! This shows I pay attention 
              to detail and love creating immersive experiences.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Tech Stack 💻
            </h2>
            <ul className="text-white/90 space-y-2">
              <li>• React & Next.js</li>
              <li>• TypeScript</li>
              <li>• Tailwind CSS</li>
              <li>• Framer Motion</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Portfolio;`;

  interface FileTreeItem {
    name: string;
    type: "file" | "folder";
    icon?: string;
    children?: FileTreeItem[];
  }

  const renderFileTree = (items: FileTreeItem[], depth = 0) => {
    return items.map((item, index) => (
      <div key={index} style={{ marginLeft: depth * 16 }}>
        {item.type === "folder" ? (
          <div>
            <div
              className="flex items-center py-1 px-2 hover:bg-white/5 cursor-pointer text-xs"
              onClick={() => toggleFolder(item.name)}
            >
              {expandedFolders.includes(item.name) ? (
                <ChevronDown className="w-3 h-3 text-gray-400 mr-1" />
              ) : (
                <ChevronRight className="w-3 h-3 text-gray-400 mr-1" />
              )}
              <Folder className="w-3 h-3 text-blue-400 mr-2" />
              <span className="text-gray-300">{item.name}</span>
            </div>
            {expandedFolders.includes(item.name) && item.children && (
              <div>{renderFileTree(item.children, depth + 1)}</div>
            )}
          </div>
        ) : (
          <div
            className={`flex items-center py-1 px-2 hover:bg-white/5 cursor-pointer text-xs ${
              activeFile === item.name ? "bg-white/10" : ""
            }`}
            onClick={() => setActiveFile(item.name)}
          >
            <span className="mr-2">{item.icon}</span>
            <span className="text-gray-300">{item.name}</span>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="h-full bg-gray-900 text-white font-mono text-sm flex flex-col">
      {/* Title Bar */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-xs text-gray-400">
          Visual Studio Code - portfolio
        </div>
        <div className="flex items-center space-x-2">
          <Minus className="w-3 h-3 text-gray-400" />
          <Square className="w-3 h-3 text-gray-400" />
          <X className="w-3 h-3 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-12 bg-gray-800 flex flex-col items-center py-4 space-y-4 border-r border-gray-700">
          <Files className="w-5 h-5 text-blue-400" />
          <Search className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <GitBranch className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <Bug className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <Package className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <div className="flex-1"></div>
          <Settings className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        </div>

        {/* File Explorer */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center text-xs text-gray-400 uppercase tracking-wide">
              <Files className="w-4 h-4 mr-2" />
              Explorer
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {renderFileTree(fileTree)}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Tab Bar */}
          <div className="flex bg-gray-800 border-b border-gray-700">
            <div className="flex items-center px-4 py-2 bg-gray-900 border-r border-gray-700 text-xs">
              <span className="mr-2">🔷</span>
              {activeFile}
              <X className="w-3 h-3 ml-2 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto bg-gray-900 p-4">
              <pre className="text-xs leading-relaxed">
                <code className="text-gray-300">{codeContent}</code>
              </pre>
            </div>
          </div>

          {/* Terminal */}
          {showTerminal && (
            <div className="h-48 bg-gray-900 border-t border-gray-700 flex flex-col">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-xs text-gray-400">
                    <Terminal className="w-4 h-4 mr-2" />
                    Terminal
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Play className="w-3 h-3 text-gray-400 hover:text-white cursor-pointer" />
                  <X
                    className="w-3 h-3 text-gray-400 hover:text-white cursor-pointer"
                    onClick={() => setShowTerminal(false)}
                  />
                </div>
              </div>
              <div className="flex-1 p-4 font-mono text-xs">
                <div className="text-green-400">$ npm run dev</div>
                <div className="text-gray-400 mt-1">
                  <div>{"> portfolio@0.1.0 dev"}</div>
                  <div>{"> next dev"}</div>
                  <div className="mt-1">{"✓ Ready in 1.2s"}</div>
                  <div>{"○ Local: http://localhost:3000"}</div>
                  <div>{"○ Network: http://192.168.1.100:3000"}</div>
                  <div className="mt-1">
                    <span className="text-green-400">
                      Portfolio is running! 🚀
                    </span>
                  </div>
                </div>
                <div className="text-green-400 mt-2">
                  $ <span className="animate-pulse">|</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VSCodeApp;
