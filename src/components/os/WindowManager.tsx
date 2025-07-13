"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Window from "./Window";
import AboutApp from "../apps/AboutApp";
import ResumeApp from "../apps/ResumeApp";
import ProjectsApp from "../apps/ProjectsApp";
import SkillsApp from "../apps/SkillsApp";
import ExperienceApp from "../apps/ExperienceApp";
import ContactApp from "../apps/ContactApp";

interface WindowManagerProps {
  openApps: string[];
  activeApp: string | null;
  minimizedApps: string[];
  onCloseApp: (appId: string) => void;
  onFocusApp: (appId: string) => void;
  onMinimizeApp: (appId: string) => void;
}

const WindowManager: React.FC<WindowManagerProps> = ({
  openApps,
  activeApp,
  minimizedApps,
  onCloseApp,
  onFocusApp,
  onMinimizeApp,
}) => {
  const getAppComponent = (appId: string) => {
    switch (appId) {
      case "about":
        return <AboutApp />;
      case "resume":
        return <ResumeApp />;
      case "projects":
        return <ProjectsApp />;
      case "skills":
        return <SkillsApp />;
      case "experience":
        return <ExperienceApp />;
      case "contact":
        return <ContactApp />;
      case "github":
        window.open("https://github.com", "_blank");
        return null;
      case "linkedin":
        window.open("https://linkedin.com", "_blank");
        return null;
      default:
        return null;
    }
  };

  const getAppTitle = (appId: string) => {
    switch (appId) {
      case "about":
        return "About Me";
      case "resume":
        return "Resume";
      case "projects":
        return "Projects";
      case "skills":
        return "Skills";
      case "experience":
        return "Experience";
      case "contact":
        return "Contact";
      default:
        return "App";
    }
  };

  return (
    <div className="fixed inset-0 pt-8 pb-20 z-30">
      <AnimatePresence>
        {openApps.map((appId, index) => {
          const content = getAppComponent(appId);
          if (!content) return null;

          return (
            <Window
              key={appId}
              title={getAppTitle(appId)}
              isActive={activeApp === appId}
              isMinimized={minimizedApps.includes(appId)}
              onClose={() => onCloseApp(appId)}
              onFocus={() => onFocusApp(appId)}
              onMinimize={() => onMinimizeApp(appId)}
              initialPosition={{
                x: 50 + index * 30,
                y: 50 + index * 30,
              }}
            >
              {content}
            </Window>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default WindowManager;
