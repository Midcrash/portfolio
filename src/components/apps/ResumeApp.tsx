"use client";

import React from "react";
import { motion } from "framer-motion";
import { Download, GraduationCap, Briefcase, Award } from "lucide-react";

const ResumeApp: React.FC = () => {
  return (
    <div className="p-6 h-full overflow-y-auto">
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
                Senior Solution Engineer
              </h3>
              <p className="text-gray-600 font-medium">TechCorp Solutions</p>
              <p className="text-sm text-gray-500 mb-3">Jan 2022 - Present</p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • Led technical discovery sessions with enterprise clients,
                  resulting in 40% faster deal closure
                </li>
                <li>
                  • Designed and implemented custom integrations for Fortune 500
                  companies
                </li>
                <li>
                  • Collaborated with product teams to influence roadmap based
                  on customer feedback
                </li>
                <li>
                  • Mentored junior engineers and established best practices for
                  solution engineering
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Solution Engineer
              </h3>
              <p className="text-gray-600 font-medium">InnovateTech</p>
              <p className="text-sm text-gray-500 mb-3">Mar 2020 - Dec 2021</p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • Supported sales team with technical expertise during
                  customer demos and POCs
                </li>
                <li>
                  • Developed custom solutions and integrations for mid-market
                  customers
                </li>
                <li>
                  • Created technical documentation and implementation guides
                </li>
                <li>
                  • Achieved 95% customer satisfaction rating in
                  post-implementation surveys
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-800">
                Full Stack Developer
              </h3>
              <p className="text-gray-600 font-medium">StartupXYZ</p>
              <p className="text-sm text-gray-500 mb-3">Jun 2019 - Feb 2020</p>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • Built scalable web applications using React, Node.js, and
                  PostgreSQL
                </li>
                <li>
                  • Implemented CI/CD pipelines and automated testing frameworks
                </li>
                <li>
                  • Collaborated with UX designers to create intuitive user
                  interfaces
                </li>
                <li>
                  • Optimized application performance resulting in 50% faster
                  load times
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
              Bachelor of Science in Computer Science
            </h3>
            <p className="text-gray-600 font-medium">
              University of California, Berkeley
            </p>
            <p className="text-sm text-gray-500 mb-3">2015 - 2019</p>
            <p className="text-gray-700">
              Relevant Coursework: Data Structures, Algorithms, Database
              Systems, Software Engineering, Computer Networks, Machine Learning
            </p>
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2 text-yellow-500" />
            Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800">
                AWS Solutions Architect
              </h3>
              <p className="text-sm text-gray-500">
                Amazon Web Services • 2023
              </p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800">
                Certified Scrum Master
              </h3>
              <p className="text-sm text-gray-500">Scrum Alliance • 2022</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800">
                Salesforce Platform Developer
              </h3>
              <p className="text-sm text-gray-500">Salesforce • 2021</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800">
                Google Cloud Professional
              </h3>
              <p className="text-sm text-gray-500">Google Cloud • 2021</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResumeApp;
