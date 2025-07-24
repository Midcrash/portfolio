"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import WindowManager from "./WindowManager";
import DesktopIcon from "./DesktopIcon";
import InitialTooltip from "../ui/InitialTooltip";

const Desktop: React.FC = () => {
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [minimizedApps, setMinimizedApps] = useState<string[]>([]);
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

  // Desktop icons data
  const desktopIcons = [
    {
      id: "readme",
      name: "README.txt",
      type: "file" as const,
      position: { x: 50, y: 100 },
    },
    {
      id: "coffee-thoughts",
      name: "☕ thoughts.md",
      type: "easter-egg" as const,
      position: { x: 50, y: 200 },
    },
    {
      id: "chat",
      name: "🤖 AI Chat.app",
      type: "app" as const,
      position: { x: 50, y: 300 },
    },
  ];

  const openApp = (appId: string) => {
    if (!openApps.includes(appId)) {
      setOpenApps([...openApps, appId]);
    }
    // If app is minimized, unminimize it
    if (minimizedApps.includes(appId)) {
      setMinimizedApps(minimizedApps.filter((id) => id !== appId));
    }
    setActiveApp(appId);
  };

  const minimizeApp = (appId: string) => {
    if (!minimizedApps.includes(appId)) {
      setMinimizedApps([...minimizedApps, appId]);
    }
  };

  const closeApp = (appId: string) => {
    setOpenApps(openApps.filter((id) => id !== appId));
    if (activeApp === appId) {
      setActiveApp(openApps.length > 1 ? openApps[openApps.length - 2] : null);
    }
  };

  if (isMobile) {
    return (
      <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
        {/* Mobile Wallpaper */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 812"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea;stop-opacity:1" /><stop offset="100%" style="stop-color:%23764ba2;stop-opacity:1" /></linearGradient></defs><rect width="375" height="812" fill="url(%23grad1)" /></svg>')`,
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Mobile Menu Bar */}
        <div className="relative z-50">
          <MenuBar />
        </div>

        {/* Mobile Window Manager */}
        <WindowManager
          openApps={openApps}
          activeApp={activeApp}
          minimizedApps={minimizedApps}
          onCloseApp={closeApp}
          onFocusApp={setActiveApp}
          onMinimizeApp={minimizeApp}
        />

        {/* Mobile Dock */}
        <div className="fixed bottom-0 left-0 right-0 z-40">
          <Dock onOpenApp={openApp} openApps={openApps} />
        </div>

        {/* Initial Tooltip */}
        <InitialTooltip isMobile={true} />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Desktop Wallpaper */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"><defs><linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%23667eea;stop-opacity:1" /><stop offset="100%" style="stop-color:%23764ba2;stop-opacity:1" /></linearGradient></defs><rect width="1920" height="1080" fill="url(%23grad1)" /></svg>')`,
        }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Menu Bar */}
      <MenuBar />

      {/* Window Manager */}
      <WindowManager
        openApps={openApps}
        activeApp={activeApp}
        minimizedApps={minimizedApps}
        onCloseApp={closeApp}
        onFocusApp={setActiveApp}
        onMinimizeApp={minimizeApp}
      />

      {/* Desktop Icons */}
      {desktopIcons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          name={icon.name}
          type={icon.type}
          initialPosition={icon.position}
          onOpenApp={openApp}
          onDoubleClick={(id) => {
            // Handle folder opening or file actions here if needed
            console.log(`Double-clicked desktop icon: ${id}`);
          }}
        />
      ))}

      {/* Dock */}
      <Dock onOpenApp={openApp} openApps={openApps} />

      {/* Initial Tooltip */}
      <InitialTooltip isMobile={false} />
    </div>
  );
};

export default Desktop;
