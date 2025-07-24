"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  transform,
  MotionValue,
} from "framer-motion";
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
  appId: string;
  isOpen: boolean;
  onClick: (appId: string) => void;
  mouseX: MotionValue<number>;
  index: number;
  onScaleChange?: (index: number, scale: number) => void;
  isMobile?: boolean;
}

const DockItem: React.FC<DockItemProps> = ({
  icon,
  appId,
  isOpen,
  onClick,
  mouseX,
  index,
  onScaleChange,
  isMobile = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useMotionValue(0);
  const scale = useSpring(1, { damping: 25, stiffness: 400 });
  const y = useSpring(0, { damping: 25, stiffness: 400 });

  useEffect(() => {
    if (isMobile) {
      // Disable hover effects on mobile
      scale.set(1);
      y.set(0);
      return;
    }

    const updateMouseDistance = () => {
      if (ref.current && mouseX) {
        const rect = ref.current.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const mouseXValue = mouseX.get();

        // Calculate distance from mouse to item center
        const distanceFromMouse = Math.abs(mouseXValue - itemCenterX);
        distance.set(distanceFromMouse);

        // Scale based on distance (closer = bigger)
        const maxDistance = 150;
        const normalizedDistance = Math.min(distanceFromMouse / maxDistance, 1);
        const targetScale = transform(normalizedDistance, [0, 1], [1.8, 1]);
        const targetY = transform(normalizedDistance, [0, 1], [-20, 0]);

        scale.set(targetScale);
        y.set(targetY);

        // Notify parent of scale change for spacing calculations
        onScaleChange?.(index, targetScale);
      }
    };

    const unsubscribeMouseX = mouseX?.onChange(updateMouseDistance);

    return () => {
      unsubscribeMouseX?.();
    };
  }, [mouseX, distance, scale, y, index, onScaleChange, isMobile]);

  return (
    <motion.div
      ref={ref}
      className={`relative flex flex-col items-center justify-end cursor-pointer ${
        isMobile ? "touch-manipulation" : ""
      }`}
      onClick={() => onClick(appId)}
      style={isMobile ? {} : { scale, y }}
      whileTap={isMobile ? { scale: 0.9 } : {}}
    >
      {/* App Icon */}
      <div
        className={`relative ${
          isMobile ? "w-10 h-10" : "w-12 h-12"
        } rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg flex items-center justify-center border-2 transition-colors ${
          isOpen ? "border-blue-400" : "border-gray-300"
        }`}
      >
        {icon}

        {/* Active indicator */}
        {isOpen && (
          <div className="absolute -bottom-2 w-1 h-1 bg-gray-800 rounded-full" />
        )}
      </div>
    </motion.div>
  );
};

interface DockProps {
  onOpenApp: (appId: string) => void;
  openApps: string[];
}

const Dock: React.FC<DockProps> = ({ onOpenApp, openApps }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [iconScales, setIconScales] = useState<number[]>(new Array(8).fill(1));
  const [isMobile, setIsMobile] = useState(false);
  const mouseX = useMotionValue(0);
  const dockRef = useRef<HTMLDivElement>(null);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleAppClick = (appId: string) => {
    // Handle external links directly without adding to openApps
    if (appId === "github") {
      window.open("https://github.com/Midcrash", "_blank");
      return;
    }
    if (appId === "linkedin") {
      window.open("https://www.linkedin.com/in/tyrae-yao-08b684154/", "_blank");
      return;
    }

    // For regular apps, call onOpenApp
    onOpenApp(appId);
  };

  const iconSize = isMobile ? "w-5 h-5" : "w-6 h-6";

  const portfolioApps = [
    {
      icon: <User className={`${iconSize} text-gray-700`} />,
      label: "About Me",
      appId: "about",
    },
    {
      icon: <FileText className={`${iconSize} text-gray-700`} />,
      label: "Resume",
      appId: "resume",
    },
    {
      icon: <Briefcase className={`${iconSize} text-gray-700`} />,
      label: "Projects",
      appId: "projects",
    },
    {
      icon: <Code className={`${iconSize} text-gray-700`} />,
      label: "Skills",
      appId: "skills",
    },
    {
      icon: <FolderOpen className={`${iconSize} text-gray-700`} />,
      label: "Experience",
      appId: "experience",
    },
    {
      icon: <Mail className={`${iconSize} text-gray-700`} />,
      label: "Contact",
      appId: "contact",
    },
    {
      icon: <Github className={`${iconSize} text-gray-700`} />,
      label: "GitHub",
      appId: "github",
    },
    {
      icon: <Linkedin className={`${iconSize} text-gray-700`} />,
      label: "LinkedIn",
      appId: "linkedin",
    },
  ];

  const systemApps = [
    {
      icon: (
        <Image
          src="/vscode.png"
          alt="VS Code"
          width={24}
          height={24}
          className={iconSize.includes("w-5") ? "w-5 h-5" : "w-6 h-6"}
        />
      ),
      label: "VS Code",
      appId: "vscode",
    },
  ];

  const dockItems = [...portfolioApps, ...systemApps];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMobile) {
      mouseX.set(e.clientX);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
      setHoveredIndex(null);
      mouseX.set(0);
      setIconScales(new Array(dockItems.length).fill(1));
    }
  };

  const handleScaleChange = (index: number, scale: number) => {
    if (!isMobile) {
      setIconScales((prev) => {
        const newScales = [...prev];
        newScales[index] = scale;
        return newScales;
      });
    }
  };

  // Calculate dynamic spacing based on icon scales (desktop only)
  const getIconSpacing = (index: number) => {
    if (isMobile) return 8; // Fixed spacing on mobile

    const scale = iconScales[index] || 1;
    const baseSpacing = 16;
    const extraSpacing = (scale - 1) * 35;
    return baseSpacing + extraSpacing;
  };

  if (isMobile) {
    return (
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/10 backdrop-blur-xl border-t border-white/20"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-center py-1 px-2 overflow-x-auto scrollbar-hide">
          <div className="flex items-center space-x-2">
            {/* Portfolio Apps */}
            {portfolioApps.map((item, index) => (
              <div key={item.appId} className="flex-shrink-0">
                <DockItem
                  icon={item.icon}
                  appId={item.appId}
                  isOpen={openApps.includes(item.appId)}
                  onClick={handleAppClick}
                  mouseX={mouseX}
                  index={index}
                  onScaleChange={handleScaleChange}
                  isMobile={true}
                />
              </div>
            ))}

            {/* Divider */}
            <div className="mx-1 w-px h-6 bg-white/20 flex-shrink-0"></div>

            {/* System Apps */}
            {systemApps.map((item, index) => {
              const globalIndex = portfolioApps.length + index;
              return (
                <div key={item.appId} className="flex-shrink-0">
                  <DockItem
                    icon={item.icon}
                    appId={item.appId}
                    isOpen={openApps.includes(item.appId)}
                    onClick={handleAppClick}
                    mouseX={mouseX}
                    index={globalIndex}
                    onScaleChange={handleScaleChange}
                    isMobile={true}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.div
        ref={dockRef}
        className="relative flex items-end justify-center bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-visible"
        style={{
          padding: isHovered ? "12px 20px 20px 20px" : "8px 16px 16px 16px",
        }}
        animate={{
          padding: isHovered ? "12px 20px 20px 20px" : "8px 16px 16px 16px",
        }}
        transition={{ duration: 0.3 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        {/* Portfolio Apps */}
        {portfolioApps.map((item, index) => (
          <motion.div
            key={item.appId}
            className="relative"
            animate={{
              marginLeft: index === 0 ? 0 : getIconSpacing(index),
              marginRight: getIconSpacing(index) * 0.3,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onMouseEnter={() => setHoveredIndex(index)}
          >
            <DockItem
              icon={item.icon}
              appId={item.appId}
              isOpen={openApps.includes(item.appId)}
              onClick={handleAppClick}
              mouseX={mouseX}
              index={index}
              onScaleChange={handleScaleChange}
              isMobile={false}
            />

            {/* Show tooltip only on hover */}
            {hoveredIndex === index && (
              <motion.div
                className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap pointer-events-none z-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* Divider */}
        <div className="mx-3 w-px h-8 bg-white/20"></div>

        {/* System Apps */}
        {systemApps.map((item, index) => {
          const globalIndex = portfolioApps.length + index;
          return (
            <motion.div
              key={item.appId}
              className="relative"
              animate={{
                marginLeft: index === 0 ? 0 : getIconSpacing(globalIndex),
                marginRight:
                  index === systemApps.length - 1
                    ? 0
                    : getIconSpacing(globalIndex) * 0.3,
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onMouseEnter={() => setHoveredIndex(globalIndex)}
            >
              <DockItem
                icon={item.icon}
                appId={item.appId}
                isOpen={openApps.includes(item.appId)}
                onClick={handleAppClick}
                mouseX={mouseX}
                index={globalIndex}
                onScaleChange={handleScaleChange}
                isMobile={false}
              />

              {/* Show tooltip only on hover */}
              {hoveredIndex === globalIndex && (
                <motion.div
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap pointer-events-none z-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Dock;
