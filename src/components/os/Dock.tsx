"use client";

import React, { useState, useRef, useEffect } from "react";
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
}

const DockItem: React.FC<DockItemProps> = ({
  icon,
  appId,
  isOpen,
  onClick,
  mouseX,
  index,
  onScaleChange,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useMotionValue(0);
  const scale = useSpring(1, { damping: 25, stiffness: 400 });
  const y = useSpring(0, { damping: 25, stiffness: 400 });

  useEffect(() => {
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
  }, [mouseX, distance, scale, y, index, onScaleChange]);

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center justify-end cursor-pointer"
      onClick={() => onClick(appId)}
      style={{
        scale,
        y,
      }}
    >
      {/* App Icon */}
      <div
        className={`relative w-12 h-12 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 shadow-lg flex items-center justify-center border-2 transition-colors ${
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
  const [iconScales, setIconScales] = useState<number[]>(new Array(8).fill(1)); // Initialize with 8 icons, scale 1
  const mouseX = useMotionValue(0);
  const dockRef = useRef<HTMLDivElement>(null);

  const dockItems = [
    {
      icon: <User className="w-6 h-6 text-gray-700" />,
      label: "About Me",
      appId: "about",
    },
    {
      icon: <FileText className="w-6 h-6 text-gray-700" />,
      label: "Resume",
      appId: "resume",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-gray-700" />,
      label: "Projects",
      appId: "projects",
    },
    {
      icon: <Code className="w-6 h-6 text-gray-700" />,
      label: "Skills",
      appId: "skills",
    },
    {
      icon: <FolderOpen className="w-6 h-6 text-gray-700" />,
      label: "Experience",
      appId: "experience",
    },
    {
      icon: <Mail className="w-6 h-6 text-gray-700" />,
      label: "Contact",
      appId: "contact",
    },
    {
      icon: <Github className="w-6 h-6 text-gray-700" />,
      label: "GitHub",
      appId: "github",
    },
    {
      icon: <Linkedin className="w-6 h-6 text-gray-700" />,
      label: "LinkedIn",
      appId: "linkedin",
    },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setHoveredIndex(null);
    mouseX.set(0);
    // Reset all scales to 1 for proper spacing reset
    setIconScales(new Array(dockItems.length).fill(1));
  };

  const handleScaleChange = (index: number, scale: number) => {
    setIconScales((prev) => {
      const newScales = [...prev];
      newScales[index] = scale;
      return newScales;
    });
  };

  // Calculate dynamic spacing based on icon scales
  const getIconSpacing = (index: number) => {
    const scale = iconScales[index] || 1;
    const baseSpacing = 16; // Increased from 8 to 16 for more space
    const extraSpacing = (scale - 1) * 35; // Increased from 20 to 35 for more dramatic spacing
    return baseSpacing + extraSpacing;
  };

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
        {dockItems.map((item, index) => (
          <motion.div
            key={item.appId}
            className="relative"
            animate={{
              marginLeft: index === 0 ? 0 : getIconSpacing(index),
              marginRight:
                index === dockItems.length - 1
                  ? 0
                  : getIconSpacing(index) * 0.3,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onMouseEnter={() => setHoveredIndex(index)}
          >
            <DockItem
              icon={item.icon}
              appId={item.appId}
              isOpen={openApps.includes(item.appId)}
              onClick={onOpenApp}
              mouseX={mouseX}
              index={index}
              onScaleChange={handleScaleChange}
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
      </motion.div>
    </motion.div>
  );
};

export default Dock;
