"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  Zap,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Package,
  Briefcase,
} from "lucide-react";

// Image Carousel Component
const ImageCarousel: React.FC<{ images: string[]; projectTitle: string }> = ({
  images,
  projectTitle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-gray-100">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${projectTitle} screenshot ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent && !parent.querySelector(".fallback-message")) {
              const fallback = document.createElement("div");
              fallback.className =
                "fallback-message w-full h-full flex items-center justify-center text-gray-400";
              fallback.textContent = "Image not found";
              parent.appendChild(fallback);
            }
          }}
        />
      </AnimatePresence>

      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

const ProjectsApp: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "macOS Portfolio",
      description:
        "Front-End interactive macOS portfolio website using React, Framer Motion.",
      tech: ["React", "Framer Motion", "TypeScript", "Next.js"],
      icon: <Briefcase className="w-8 h-8" />,
      color: "blue",
      demo: "https://tyrae.dev",
      github: "https://github.com/Midcrash/portfolio",
      images: [
        "/projects/macOS-portfolio/screenshot1.png",
        "/projects/macOS-portfolio/screenshot2.png",
        "/projects/macOS-portfolio/screenshot3.png",
      ],
    },
    {
      id: 2,
      title: "EFT Guessr",
      description:
        "Interactive gaming platform showcasing custom game mechanics and user interface elements with comprehensive analytics and scoring system",
      tech: [
        "React",
        "Firebase Firestore",
        "Game Development",
        "Analytics",
        "Backend Interface",
      ],
      icon: <Zap className="w-8 h-8" />,
      color: "blue",
      demo: "https://eftguessr.com",
      github: "https://github.com/Midcrash",
      images: [
        "/projects/eft-guessr/screenshot1.png",
        "/projects/eft-guessr/screenshot2.png",
        "/projects/eft-guessr/screenshot3.png",
      ],
    },
    {
      id: 3,
      title: "iVMI",
      description:
        "Full-stack inventory management solution providing seamless web and iOS mobile application experience with real-time data synchronization",
      tech: [
        "React Native",
        "Firebase",
        "Authentication",
        "Database Management",
        "Hosting",
      ],
      icon: <Smartphone className="w-8 h-8" />,
      color: "blue",
      demo: "https://ivmi.com",
      github: "https://github.com/Midcrash",
      images: [
        "/projects/ivmi/screenshot1.png",
        "/projects/ivmi/screenshot2.png",
        "/projects/ivmi/screenshot3.png",
      ],
    },
    {
      id: 4,
      title: "Inventory Hero",
      description:
        "Real-time inventory management application designed for restaurant teams to efficiently track in-store stock levels. Features an intuitive checklist system that enables inventory staff to identify and prioritize items requiring restocking, ensuring optimal inventory levels across operations.",
      tech: [
        "React",
        "Firebase",
        "Real-time Database",
        "Inventory Management",
        "Restaurant Operations",
        "Team Collaboration",
      ],
      icon: <Package className="w-8 h-8" />,
      color: "blue",
      demo: "https://inventory-hero.example.com",
      github: "https://github.com/Midcrash",
      images: [
        "/projects/inventory-hero/screenshot1.png",
        "/projects/inventory-hero/screenshot2.png",
        "/projects/inventory-hero/screenshot3.png",
      ],
    },
    {
      id: 5,
      title: "Portfolio V1 Minecraft",
      description:
        "Front-End interactive 3d portfolio website using React, React Three Fiber (Three.js). Learned how to use Blender to create 3D models and textures.",
      tech: ["React", "React Three Fiber", "Minecraft", "Blender"],
      icon: <Package className="w-8 h-8" />,
      color: "blue",
      demo: "https://r3f-minecraft-portfolio.vercel.app/",
      github: "https://github.com/Midcrash",
      images: [
        "/projects/portfolio-v1/screenshot1.png",
        "/projects/portfolio-v1/screenshot2.png",
        "/projects/portfolio-v1/screenshot3.png",
      ],
    },
  ];

  return (
    <div className="p-6 h-full overflow-y-auto select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Projects</h1>
          <p className="text-gray-600">
            A showcase of my technical work and contributions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-2 rounded-lg bg-${project.color}-100 text-${project.color}-600`}
                  >
                    {project.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ExternalLink className="w-4 h-4 text-gray-600" />
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="w-4 h-4 text-gray-600" />
                  </motion.a>
                </div>
              </div>

              {/* Image Carousel */}
              <ImageCarousel
                images={project.images}
                projectTitle={project.title}
              />

              {/* Project Description */}
              <p className="text-gray-600 mb-4">{project.description}</p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Section */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Open Source Contributions
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">
                  React Three Fiber
                </h3>
                <p className="text-sm text-gray-600">
                  Added performance optimizations for 3D rendering
                </p>
              </div>
              <span className="text-sm text-gray-500">+150 lines</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Next.js</h3>
                <p className="text-sm text-gray-600">
                  Fixed TypeScript definitions for API routes
                </p>
              </div>
              <span className="text-sm text-gray-500">+50 lines</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Tailwind CSS</h3>
                <p className="text-sm text-gray-600">
                  Contributed new utility classes for animations
                </p>
              </div>
              <span className="text-sm text-gray-500">+200 lines</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectsApp;
