"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import WindowManager from "./WindowManager";

const Desktop: React.FC = () => {
  const [openApps, setOpenApps] = useState<string[]>([]);
  const [activeApp, setActiveApp] = useState<string | null>(null);

  const openApp = (appId: string) => {
    if (!openApps.includes(appId)) {
      setOpenApps([...openApps, appId]);
    }
    setActiveApp(appId);
  };

  const closeApp = (appId: string) => {
    setOpenApps(openApps.filter((id) => id !== appId));
    if (activeApp === appId) {
      setActiveApp(openApps.length > 1 ? openApps[openApps.length - 2] : null);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* macOS Wallpaper */}
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
        onCloseApp={closeApp}
        onFocusApp={setActiveApp}
      />

      {/* Dock */}
      <Dock onOpenApp={openApp} openApps={openApps} />
    </div>
  );
};

export default Desktop;
