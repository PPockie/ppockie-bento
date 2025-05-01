import React, { useEffect, useState } from "react";
import "./App.css";
import ProjectComponent from "./pages/Projects";
import BlogComponent from "./pages/Blog";
import { PiClipboardTextFill, PiUserFill } from "react-icons/pi";
import { HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [theme, setTheme] = useState("dark");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const colorTheme = {
    background: {
      light: {
        bg: "bg-gray-100",
        text: "",
      },
      dark: "bg-gray-900",
    },
    profile: {
      light: "bg-pink-400",
      dark: "bg-pink-600",
    },
    blog: {
      light: "bg-blue-100",
      dark: "bg-blue-900",
    },
    project: {
      light: "bg-green-100",
      dark: "bg-green-900",
    },
    skill: {
      light: "bg-yellow-200/5 border-3  border-yellow-200",
      dark: "bg-yellow-400/5 border-3  border-yellow-400",
    },
    contact: {
      light: "bg-yellow-100",
      dark: "bg-yellow-900",
    },
  };

  return (
    <div
      className={`w-screen h-screen grid grid-cols-4 grid-rows-5 gap-4 !p-4 ${colorTheme.background[theme].bg}`}
    >
      <AnimatePresence>
        {isVisible ? (
          <motion.div
            className={`profile col-span-2 row-span-2 ${colorTheme.profile[theme]} rounded-3xl p-4 relative shadow-lg shadow-pink-800/40`}
            initial={{ opacity: 0, x: -100, y: -5 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -100, y: -5 }}
            transition={{
              type: "spring",
              bounce: 0.6,
              stiffness: 300,
              damping: 18,
              duration: 0.15,
            }}
          >
            <div className="absolute z-20 top-4 left-4 flex items-start gap-4">
              <PiUserFill className="text-3xl text-white/90" />
              <h2 className="font-osake text-3xl text-white/90 pl-2 select-none">
                Profile
              </h2>
            </div>
          </motion.div>
        ) : (
          <div
            className={`profile col-span-2 row-span-2 bg-transparent rounded-3xl p-4 relative `}
          ></div>
        )}
      </AnimatePresence>
      <div className="project col-span-2 row-span-4 rounded-3xl">
        <ProjectComponent toggleSwitch={[theme, setTheme]} />
      </div>
      <div className="blog col-span-1 row-span-5 rounded-3xl">
        <BlogComponent toggleSwitch={theme} />
      </div>
      <AnimatePresence>
        {isVisible ? (
          <motion.div
            className={`skills col-span-1 row-span-5 ${colorTheme.skill[theme]} rounded-3xl p-4 relative text-white shadow-lg shadow-yellow-800/40`}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{
              type: "spring",
              bounce: 0.6,
              stiffness: 300,
              damping: 14,
              duration: 0.15,
              delay: 0.3,
            }}
          >
            <div className="absolute z-20 top-4 left-4 flex items-start gap-4 select-none">
              <PiClipboardTextFill className="text-3xl text-yellow-400" />
              <h2 className={`font-osake text-3xl text-yellow-400 pl-2`}>
                Skills
              </h2>
            </div>
          </motion.div>
        ) : (
          <div
            className={`skills col-span-1 row-span-5 bg-transparent rounded-3xl p-4 relative text-white`}
          ></div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          className={`contact col-span-2 row-span-3 bg-blue-500 rounded-3xl p-4 relative text-white shadow-lg shadow-blue-800/40`}
          initial={{ opacity: 0, x: 100, y: 5 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: 5 }}
          transition={{
            type: "spring",
            bounce: 0.6,
            stiffness: 300,
            damping: 20,
            duration: 0.15,
            delay: 0.5,
          }}
        >
          <div className="absolute z-20 top-4 left-4 flex items-start gap-4 select-none">
            <HiChatBubbleOvalLeftEllipsis className="text-3xl text-white/90" />
            <h2 className="font-osake text-3xl text-white/90 pl-2">Contact</h2>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;
