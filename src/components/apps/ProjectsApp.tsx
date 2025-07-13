"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Zap, Shield, Smartphone } from "lucide-react";

const ProjectsApp: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management and payment processing",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe API", "Redis"],
      icon: <Smartphone className="w-8 h-8" />,
      color: "blue",
      demo: "https://demo.example.com",
      github: "https://github.com/example/project1",
    },
    {
      id: 2,
      title: "Security Dashboard",
      description:
        "Enterprise security monitoring dashboard with threat detection and analytics",
      tech: ["Vue.js", "Python", "MongoDB", "Docker", "Kubernetes"],
      icon: <Shield className="w-8 h-8" />,
      color: "green",
      demo: "https://demo.example.com",
      github: "https://github.com/example/project2",
    },
    {
      id: 3,
      title: "Performance Analytics",
      description:
        "Real-time performance monitoring and analytics platform for web applications",
      tech: ["Angular", "Go", "InfluxDB", "Grafana", "AWS"],
      icon: <Zap className="w-8 h-8" />,
      color: "yellow",
      demo: "https://demo.example.com",
      github: "https://github.com/example/project3",
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
