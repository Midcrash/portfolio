"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoginScreenProps {
  onLoginComplete: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginComplete }) => {
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const passwordText = "portfolio";

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Show password input with Welcome Back animation
    const passwordTimer = setTimeout(() => {
      setShowPasswordInput(true);
    }, 1000);

    // Start typing animation shortly after
    const typingTimer = setTimeout(() => {
      setShowTyping(true);
    }, 2000);

    return () => {
      clearTimeout(passwordTimer);
      clearTimeout(typingTimer);
    };
  }, []);

  useEffect(() => {
    if (showTyping) {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < passwordText.length) {
          setTypedText(passwordText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
          // Complete login after typing
          setTimeout(() => {
            setShowLogin(false);
            setTimeout(onLoginComplete, 500);
          }, 1000);
        }
      }, 150);

      return () => clearInterval(typeInterval);
    }
  }, [showTyping, onLoginComplete]);

  return (
    <AnimatePresence>
      {showLogin && (
        <motion.div
          className="fixed inset-0 z-50"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background wallpaper with blur */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${
                isMobile ? "375 812" : "1920 1080"
              }"><defs><radialGradient id="macosGrad" cx="50%" cy="30%" r="70%"><stop offset="0%" style="stop-color:%234f46e5;stop-opacity:1" /><stop offset="50%" style="stop-color:%237c3aed;stop-opacity:1" /><stop offset="100%" style="stop-color:%23ec4899;stop-opacity:1" /></radialGradient></defs><rect width="${
                isMobile ? "375" : "1920"
              }" height="${
                isMobile ? "812" : "1080"
              }" fill="url(%23macosGrad)" /></svg>')`,
            }}
          />

          {/* Blur overlay */}
          <div className="absolute inset-0 backdrop-blur-2xl bg-black/20" />

          {/* Login content with overall blur-to-focus */}
          <motion.div
            className={`relative h-full flex flex-col items-center justify-center ${
              isMobile ? "px-6" : ""
            }`}
            initial={{
              filter: "blur(10px)",
              opacity: 0.7,
            }}
            animate={{
              filter: "blur(0px)",
              opacity: 1,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.3,
            }}
          >
            {/* User avatar placeholder */}
            <motion.div
              className={`${
                isMobile ? "w-24 h-24" : "w-32 h-32"
              } rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-8 flex items-center justify-center text-white ${
                isMobile ? "text-3xl" : "text-4xl"
              } font-bold shadow-2xl`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            >
              TY
            </motion.div>

            {/* Animated Welcome Back text with blur-to-focus */}
            <div className={`${isMobile ? "mb-6" : "mb-8"}`}>
              <motion.h1
                className={`${
                  isMobile ? "text-4xl" : "text-6xl"
                } font-light text-white text-center tracking-wide`}
                initial={{
                  filter: "blur(20px)",
                  opacity: 0,
                  scale: 1.1,
                }}
                animate={{
                  filter: "blur(0px)",
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  delay: 1.2,
                }}
                style={{
                  textShadow: "0 4px 20px rgba(255,255,255,0.3)",
                }}
              >
                Welcome Back
              </motion.h1>
            </div>

            {/* Password input */}
            <AnimatePresence>
              {showPasswordInput && (
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {/* Glassmorphism input container */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl" />

                    <div
                      className={`relative px-6 py-4 ${
                        isMobile ? "w-72" : "w-80"
                      }`}
                    >
                      <div className="flex items-center">
                        {/* Lock icon */}
                        <div
                          className={`${
                            isMobile ? "w-5 h-5" : "w-6 h-6"
                          } mr-4 text-white/70`}
                        >
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>

                        {/* Typed text display */}
                        <div
                          className={`flex-1 text-white ${
                            isMobile ? "text-base" : "text-lg"
                          } font-light`}
                        >
                          {typedText && (
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              {"•".repeat(typedText.length)}
                            </motion.span>
                          )}

                          {/* Blinking cursor */}
                          {showTyping && (
                            <motion.span
                              className="text-white/70 ml-1"
                              animate={{ opacity: [1, 0] }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                repeatType: "reverse",
                              }}
                            >
                              |
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtle hint text */}
                  <motion.p
                    className={`text-white/60 text-center mt-4 ${
                      isMobile ? "text-xs" : "text-sm"
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    🚧 Work In Progress 🚧
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginScreen;
