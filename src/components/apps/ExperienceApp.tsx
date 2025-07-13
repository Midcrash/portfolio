"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Calendar,
  Award,
  TrendingUp,
  Users,
} from "lucide-react";

const ExperienceApp: React.FC = () => {
  const [selectedExperience, setSelectedExperience] = useState(0);

  const experiences = [
    {
      id: 0,
      title: "Senior Solution Engineer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      period: "Jan 2022 - Present",
      type: "Full-time",
      description:
        "Leading technical sales and customer success initiatives for enterprise clients",
      achievements: [
        "Increased deal closure rate by 40% through improved technical discovery",
        "Built and maintained relationships with 50+ enterprise clients",
        "Designed custom integrations for Fortune 500 companies",
        "Mentored 3 junior solution engineers",
        "Contributed to $2M+ in annual recurring revenue",
      ],
      skills: [
        "Solution Engineering",
        "Enterprise Sales",
        "API Integration",
        "Customer Success",
        "Technical Leadership",
      ],
      highlights: [
        {
          icon: <TrendingUp className="w-4 h-4" />,
          text: "40% faster deal closure",
        },
        { icon: <Users className="w-4 h-4" />, text: "50+ enterprise clients" },
        { icon: <Award className="w-4 h-4" />, text: "$2M+ ARR contribution" },
      ],
    },
    {
      id: 1,
      title: "Solution Engineer",
      company: "InnovateTech",
      location: "San Francisco, CA",
      period: "Mar 2020 - Dec 2021",
      type: "Full-time",
      description:
        "Supported sales team with technical expertise and delivered custom solutions",
      achievements: [
        "Supported 100+ technical demos and proof-of-concepts",
        "Achieved 95% customer satisfaction rating",
        "Developed reusable integration templates",
        "Created technical documentation and training materials",
        "Reduced implementation time by 30% through process optimization",
      ],
      skills: [
        "Technical Sales",
        "API Documentation",
        "Customer Training",
        "Process Optimization",
      ],
      highlights: [
        { icon: <Users className="w-4 h-4" />, text: "100+ demos delivered" },
        {
          icon: <Award className="w-4 h-4" />,
          text: "95% satisfaction rating",
        },
        {
          icon: <TrendingUp className="w-4 h-4" />,
          text: "30% faster implementation",
        },
      ],
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "StartupXYZ",
      location: "San Francisco, CA",
      period: "Jun 2019 - Feb 2020",
      type: "Full-time",
      description:
        "Developed scalable web applications and improved system performance",
      achievements: [
        "Built responsive web applications using React and Node.js",
        "Implemented CI/CD pipelines reducing deployment time by 60%",
        "Optimized database queries improving performance by 50%",
        "Collaborated with UX team to enhance user experience",
        "Maintained 99.9% uptime for production applications",
      ],
      skills: [
        "React",
        "Node.js",
        "PostgreSQL",
        "CI/CD",
        "Performance Optimization",
      ],
      highlights: [
        {
          icon: <TrendingUp className="w-4 h-4" />,
          text: "60% faster deployments",
        },
        { icon: <Award className="w-4 h-4" />, text: "99.9% uptime" },
        {
          icon: <TrendingUp className="w-4 h-4" />,
          text: "50% performance gain",
        },
      ],
    },
  ];

  const currentExperience = experiences[selectedExperience];

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Experience</h1>
          <p className="text-gray-600">
            Professional journey and key achievements
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timeline Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Timeline
            </h2>
            <div className="space-y-3">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedExperience === index
                      ? "bg-blue-100 border-2 border-blue-300"
                      : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedExperience(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-2">
                    <Briefcase className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {exp.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{exp.company}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {exp.period}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Experience Details */}
          <div className="lg:col-span-2">
            <motion.div
              key={selectedExperience}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 rounded-xl p-6"
            >
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {currentExperience.title}
                </h2>
                <div className="flex items-center text-gray-600 mb-2">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span className="font-medium">
                    {currentExperience.company}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{currentExperience.location}</span>
                  <span className="mx-2">•</span>
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{currentExperience.period}</span>
                </div>
                <p className="text-gray-700">{currentExperience.description}</p>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Key Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {currentExperience.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-blue-50 p-3 rounded-lg"
                    >
                      <div className="text-blue-600">{highlight.icon}</div>
                      <span className="text-sm font-medium text-gray-700">
                        {highlight.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Key Achievements
                </h3>
                <ul className="space-y-2">
                  {currentExperience.achievements.map((achievement, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start space-x-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Key Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {currentExperience.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ExperienceApp;
