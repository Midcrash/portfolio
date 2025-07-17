"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, GraduationCap, Briefcase, Award } from "lucide-react";

const ResumeApp: React.FC = () => {
  return (
    <div className="p-6 h-full overflow-y-auto select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Resume</h1>
            <p className="text-gray-600">
              Professional Experience & Background
            </p>
          </div>
          <motion.button
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </motion.button>
        </div>

        {/* Experience Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Briefcase className="w-6 h-6 mr-2 text-blue-500" />
            Professional Experience
          </h2>

          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Software Engineer
              </h3>
              <p className="text-gray-600 font-medium">Loadstar Sensors</p>
              <p className="text-sm text-gray-500 mb-3">Aug 2023 - June 2025</p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • Led full-stack development of customer-facing iOS and web
                  applications using React Native
                </li>
                <li>
                  • Developed desktop application using Python to interface with
                  load cell sensors
                </li>
                <li>
                  • Built and deployed scalable backend infrastructure with
                  Firebase (Auth, Firestore, Hosting)
                </li>
                <li>
                  • Partnered with cross-functional teams to define solutions
                  aligned with real-time sensor hardware
                </li>
                <li>
                  • Enhanced platform accessibility and user engagement through
                  improved UX design
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Tech Consultant
              </h3>
              <p className="text-gray-600 font-medium">Freelance</p>
              <p className="text-sm text-gray-500 mb-3">Jul 2021 - Present</p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • Provided strategic technology consulting for local
                  restaurants & barbershops
                </li>
                <li>
                  • Implemented POS integration (Square), automation, and
                  workflow optimization
                </li>
                <li>
                  • Designed and implemented real-time KPI custom dashboards
                  using React and Next.js
                </li>
                <li>• Built inventory management tools using POS APIs</li>
                <li>
                  • Served as trusted technical advisor delivering practical,
                  cost-effective systems
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <GraduationCap className="w-6 h-6 mr-2 text-green-500" />
            Education
          </h2>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Bachelor of Science in Software Engineering
            </h3>
            <p className="text-gray-600 font-medium">
              San Jose State University
            </p>
            <p className="text-sm text-gray-500 mb-3">2021</p>
            <p className="text-gray-700">
              Relevant Coursework: Software Engineering, Data Structures,
              Algorithms, Database Systems, Computer Networks, Full-stack
              Development, Mobile Application Development
            </p>
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2 text-purple-500" />
            Key Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800">iVMI (ivmi.com)</h3>
              <p className="text-sm text-gray-500 mb-2">
                Full-stack inventory management solution
              </p>
              <p className="text-sm text-gray-600">
                React Native, Firebase, iOS app with seamless web integration
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800">
                EFT Guessr (eftguessr.com)
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Interactive gaming platform
              </p>
              <p className="text-sm text-gray-600">
                React, Firebase Firestore, custom game mechanics and analytics
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResumeApp;
