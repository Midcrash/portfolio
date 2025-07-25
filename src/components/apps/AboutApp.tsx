"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Globe, Heart } from "lucide-react";

const AboutApp: React.FC = () => {
  return (
    <div className="p-6 h-full overflow-y-auto select-none">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            TY
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tyrae Yao</h1>
          <p className="text-xl text-gray-600">Software Engineer</p>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <motion.div
            className="bg-gray-50 rounded-lg p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <MapPin className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Location</p>
            <p className="font-semibold">San Jose, CA</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-lg p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Experience</p>
            <p className="font-semibold">4+ Years</p>
          </motion.div>

          <motion.div
            className="bg-gray-50 rounded-lg p-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Globe className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Timezone</p>
            <p className="font-semibold">PST (GMT-8)</p>
          </motion.div>
        </div>

        {/* About Me Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                I&apos;m a Software Engineer with a strong foundation in
                software development and a passion for bridging technical
                complexity with business value. Currently transitioning from my
                role as a Software Engineer to focus on customer-facing
                technical solutions.
              </p>
              <p>
                My journey began with a B.S. in Software Engineering from San
                Jose State University, where I developed expertise in full-stack
                development. At Loadstar Sensors, I led development of
                customer-facing iOS and web applications using React Native, and
                built scalable backend infrastructure with Firebase. During my
                freelance work, I developed several custom solutions—including
                KPI dashboards and inventory management systems—by integrating
                various APIs and technologies.
              </p>
              <p>
                I thrive in environments where I can combine technical depth
                with customer empathy, helping organizations solve complex
                problems through innovative technology solutions. My experience
                spans from real-time sensor data systems to API integrations and
                custom dashboards. I am currently working learning and
                implementing the usage of AI into my personal projects.
              </p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Heart className="w-6 h-6 text-red-500 mr-2" />
              What I Love
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Technical</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• React Native & React</li>
                  <li>• Firebase & real-time systems</li>
                  <li>• Python & desktop applications</li>
                  <li>• API integrations & POS systems</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Personal</h3>
                <ul className="space-y-1 text-gray-700">
                  <li>• Problem solving</li>
                  <li>• Customer success</li>
                  <li>• Cross-functional collaboration</li>
                  <li>• Strategic consulting</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutApp;
