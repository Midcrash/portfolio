"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Window from "./Window";
import AboutApp from "../apps/AboutApp";
import ResumeApp from "../apps/ResumeApp";
import ProjectsApp from "../apps/ProjectsApp";
import SkillsApp from "../apps/SkillsApp";
import ExperienceApp from "../apps/ExperienceApp";
import ContactApp from "../apps/ContactApp";
import ChatApp from "../apps/ChatApp";
import VSCodeApp from "../apps/VSCodeApp";
import TextViewerApp from "../apps/TextViewerApp";

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
      case "chat":
        return <ChatApp />;
      case "readme":
        return (
          <TextViewerApp
            title="README.txt"
            content="Welcome to Tyrae Yao's Portfolio! 🚀

This is a fully interactive macOS experience showcasing my journey as a Software Engineer with a strong foundation in software development. Built with React, Next.js, and lots of passion for creating exceptional user experiences.

About Me:
- Software Engineer at Loadstar Sensors (Aug 2023 - June 2025)
- Freelance Tech Consultant (Jul 2021 - Present)
- B.S. in Software Engineering from San Jose State University (2022)
- Specializing in React Native, Firebase, and customer-facing applications

What you'll find here:
- My professional experience and technical skills
- Projects like iVMI (ivmi.com) and EFT Guessr (eftguessr.com)
- Contact information and ways to connect
- Interactive macOS-style interface built from scratch

Feel free to explore all the apps and discover the details of my work. I'm passionate about bridging technical complexity with business value, and I love creating solutions that make a real impact.

If you'd like to connect or learn more about my work, check out the Contact app or connect with me on LinkedIn!

Thanks for visiting my portfolio! 

Built with ❤️ by Tyrae Yao
Tech Stack: React, Next.js, TypeScript, Tailwind CSS, Framer Motion"
          />
        );
      case "coffee-thoughts":
        return (
          <TextViewerApp
            title="☕ thoughts.md"
            content="# Random Developer Thoughts ☕

- Why do we call it 'debugging' when it should be 'de-bugging'?
- CSS is like a foreign language that sometimes works by accident
- The best code is the code that future you can understand
- Coffee = Code fuel ☕
- There are only 10 types of people: those who understand binary and those who don't
- 'It works on my machine' - every developer's favorite phrase
- Rubber duck debugging is real and it works!
- Stack Overflow is basically the developer's holy grail
- Git commit messages reveal your true personality
- The more you learn, the more you realize how much you don't know

Keep coding and stay caffeinated! 🚀

---
*Written at 3 AM with the help of excessive amounts of coffee*"
          />
        );
      case "vscode":
        return <VSCodeApp />;
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
      case "chat":
        return "AI Chat";
      case "readme":
        return "README.txt";
      case "coffee-thoughts":
        return "☕ thoughts.md";
      case "vscode":
        return "Visual Studio Code";
      default:
        return "App";
    }
  };

  return (
    <div
      className={`fixed inset-0 ${
        isMobile ? "pt-14 pb-14" : "pt-8 pb-20"
      } z-30 pointer-events-none`}
    >
      <AnimatePresence>
        {openApps.map((appId, index) => {
          const content = getAppComponent(appId);
          if (!content) return null;

          // Only show active app on mobile
          if (isMobile && activeApp !== appId) return null;

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
                x: isMobile ? 0 : 50 + index * 30,
                y: isMobile ? 0 : 50 + index * 30,
              }}
              isMobile={isMobile}
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
