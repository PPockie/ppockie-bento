import { useEffect, useState } from "react";
import { Projects } from "../database/projects/AllProject";
import { TbSun, TbMoon } from "react-icons/tb";
import { HiCube } from "react-icons/hi2";
import { RiMapPin2Fill } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

const ProjectComponent = ({ toggleSwitch: [theme, setTheme] }) => {
  const PROJECT_PER_PAGE_SIZE = 4;
  const [currentPage, setCurrentPage] = useState(0);
  const [allProjects, setAllProjects] = useState([]);
  const [visibleProjects, setVisibleProjects] = useState([]);

  // Variable to track animation
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setAllProjects(Projects);
  }, []);

  useEffect(() => {
    if (allProjects.length > 0) {
      const start = currentPage * PROJECT_PER_PAGE_SIZE;
      const end = start + PROJECT_PER_PAGE_SIZE;
      const sliced = allProjects.slice(start, end);
      setVisibleProjects(sliced);
    }
  }, [currentPage, allProjects]);

  const totalPages = Math.ceil(allProjects.length / PROJECT_PER_PAGE_SIZE);

  const handlePrev = () => {
    if (isAnimating || currentPage === 0) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
      setIsAnimating(false);
    }, 500);
  };

  const handleNext = () => {
    if (isAnimating || currentPage === totalPages - 1) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
      setIsAnimating(false);
    }, 500);
  };
  return (
    <div className="grid grid-cols-2 grid-rows-7 h-full gap-4">
      <div className="col-span-1 row-span-1 flex items-center !px-4 gap-4">
        <HiCube className="text-4xl text-teal-400" />
        <h2
          className={`text-4xl ${
            theme === "dark" ? "text-white/90" : "text-gray-900"
          } tracking-wider font-osake font-bold select-none`}
        >
          Projects
        </h2>
      </div>
      <div className="toggle-theme p-4 col-span-1 row-span-1 flex justify-end items-center">
        <button
          className={`rounded-full h-14 w-14 flex justify-center items-center cursor-pointer ${
            theme === "dark"
              ? "bg-gray-950/40 hover:bg-yellow-400 hover:shadow-yellow-600/50"
              : "bg-gray-900/5 hover:bg-sky-400 hover:shadow-sky-600/50"
          } hover:shadow-lg  duration-100 group`}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <TbSun
              className={`text-xl text-gray-900/50 group-hover:text-white transition-colors duration-100`}
            />
          ) : (
            <TbMoon
              className={`text-xl text-white group-hover:text-white transition-colors duration-100`}
            />
          )}
        </button>
      </div>
      <AnimatePresence mode="wait">
        {visibleProjects.map((project, idx) => {
          const delayStart = idx * 0.1;
          const delayExit = (idx > 0 ? idx - 1 : idx) * 0.1;
          return (
            <motion.div
              key={project.id || idx}
              className={`col-span-1 ${
                idx >= 2 ? "row-span-2" : "row-span-3"
              } bg-sky-400/5 border-3 border-teal-400 rounded-3xl p-4 relative`}
              initial={{ scale: 0.2, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                duration: 0.5,
                stiffness: 120,
                damping: 17,
                delay: delayStart,
              }}
              exit={{
                scale: 0.97,
                opacity: 0,
                y: ((-30) - idx),
                transition: {
                  duration: 0.3,
                  delay: delayExit,
                },
              }}
              
            >
              <div className="absolute z-20 px-2 bottom-4 left-4">
                <h2 className=" text-teal-400 font-bold font-special-golthic text-xl">
                  {project.title}
                </h2>

                {project.position.map((item, i) => (
                  <div key={i} className="flex !mb-2.5 items-center gap-1">
                    <RiMapPin2Fill className="text-sm text-white/50" />
                    <p className="text-sm font-special-golthic text-white/50">
                      {item}
                    </p>
                  </div>
                ))}

                <div className="flex items-center gap-2 flex-wrap">
                  {project.tools.map((item, i) => (
                    <div
                      key={i}
                      className={`badge ${
                        theme === "dark"
                          ? "bg-teal-50 text-teal-500"
                          : "bg-gray-900/5 text-teal-400"
                      } font-special-golthic !px-3 !rounded-xl border-0 select-none`}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      <motion.div
        className="pagination col-span-2 row-span-2 p-4 w-full flex justify-end"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{
          type: "spring",
          duration: 0.5,
          stiffness: 150,
          damping: 17,
          delay: 0,
        }}
      >
        <div className="join gap-2">
          <button
            onClick={handlePrev}
            className={`join-item btn rounded-full !border-0 text-2xl pb-1 ${
              theme === "dark"
                ? "bg-gray-950/40"
                : "bg-gray-900/5 !text-gray-800/50"
            } shadow-none h-14 w-14 flex justify-center items-center text-white hover:text-sky-400`}
          >
            «
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${
                i === currentPage
                  ? "bg-teal-400 hover:brightness-70 transition-all duration-100 !text-white"
                  : "bg-gray-950/40 !text-white/50"
              } join-item btn text-lg !border-0 rounded-full ${
                theme === "dark"
                  ? "bg-gray-950/40 !text-gray-900"
                  : "bg-gray-900/5 !text-gray-800/50"
              } shadow-none h-14 w-14 flex justify-center items-cente`}
              onClick={() => setCurrentPage(i)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            className={`join-item btn rounded-full !border-0 text-2xl pb-1 ${
              theme === "dark"
                ? "bg-gray-950/40"
                : "bg-gray-900/5 !text-gray-800/50"
            } shadow-none h-14 w-14 flex justify-center items-center text-white hover:!text-sky-400`}
          >
            »
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectComponent;
