"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Database, Cloud, Wrench, Users, TrendingUp } from "lucide-react";

const SkillsApp: React.FC = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code className="w-6 h-6" />,
      color: "blue",
      skills: [
        { name: "React", level: 90 },
        { name: "React Native", level: 85 },
        { name: "Next.js", level: 80 },
        { name: "TypeScript", level: 75 },
        { name: "iOS Development", level: 70 },
        { name: "Tailwind CSS", level: 85 },
      ],
    },
    {
      title: "Backend Development",
      icon: <Database className="w-6 h-6" />,
      color: "green",
      skills: [
        { name: "Python", level: 85 },
        { name: "Firebase", level: 90 },
        { name: "Node.js", level: 75 },
        { name: "API Integration", level: 80 },
        { name: "Real-time Systems", level: 75 },
        { name: "POS Systems", level: 70 },
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6" />,
      color: "purple",
      skills: [
        { name: "Firebase Hosting", level: 85 },
        { name: "Firebase Auth", level: 90 },
        { name: "Firebase Firestore", level: 85 },
        { name: "CI/CD", level: 70 },
        { name: "Desktop Applications", level: 80 },
        { name: "Real-time Data", level: 75 },
      ],
    },
    {
      title: "Tools & Platforms",
      icon: <Wrench className="w-6 h-6" />,
      color: "yellow",
      skills: [
        { name: "Git", level: 90 },
        { name: "VS Code", level: 95 },
        { name: "Square API", level: 80 },
        { name: "Sensor Hardware", level: 70 },
        { name: "Load Cell Systems", level: 75 },
        { name: "Business Consulting", level: 80 },
      ],
    },
  ];

  const softSkills = [
    { name: "Problem Solving", icon: <TrendingUp className="w-5 h-5" /> },
    { name: "Technical Communication", icon: <Users className="w-5 h-5" /> },
    {
      name: "Cross-functional Collaboration",
      icon: <Wrench className="w-5 h-5" />,
    },
    { name: "Customer Focus", icon: <Users className="w-5 h-5" /> },
    { name: "Strategic Consulting", icon: <Users className="w-5 h-5" /> },
    { name: "Workflow Optimization", icon: <TrendingUp className="w-5 h-5" /> },
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Skills</h1>
          <p className="text-gray-600">
            Technical expertise and professional competencies
          </p>
        </div>

        {/* Technical Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="bg-white border border-gray-200 rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div
                  className={`p-2 rounded-lg bg-${category.color}-100 text-${category.color}-600 mr-3`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-${category.color}-500`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          duration: 0.8,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Professional Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
              >
                <div className="text-blue-600">{skill.icon}</div>
                <span className="text-gray-700 font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education & Background */}
        <motion.div
          className="mt-8 bg-green-50 border border-green-200 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-xl font-bold text-gray-800 mb-3">
            Education & Background
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">
                B.S. Software Engineering, San Jose State University (2021)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">
                Full-stack Development Experience (2021-Present)
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">
                Customer-facing Application Development
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-700">
                Business Technology Consulting
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SkillsApp;
