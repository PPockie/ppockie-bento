import { useEffect, useState } from "react";
import { Blogs } from "../database/blogs/AllBlog";
import { TbArrowUpRight } from "react-icons/tb";
import { HiChatBubbleLeftRight } from "react-icons/hi2";

const BlogComponent = ({ toggleSwitch: theme }) => {
  const [AllBlogs, setAllBlogs] = useState([]);

  useEffect(() => {
    setAllBlogs(Blogs);
  }, []);

  const sortDesc = [...AllBlogs].reverse();

  {/* Animation Blog Fade-Right */}

  return (
    <div className="grid grid-cols-2 grid-rows-7 gap-4 h-full">
      <div className="col-span-1 row-span-1 flex items-center !px-4 gap-4">
        <HiChatBubbleLeftRight className="text-4xl text-orange-400" />
        <h2
          className={`text-4xl ${
            theme === "dark" ? "text-white/90" : "text-gray-900"
          } tracking-wider font-osake font-bold select-none`}
        >
          Blog
        </h2>
      </div>
      {sortDesc.slice(0, 3).map((blog, idx) => {
        return (
          <div
            key={idx}
            className={`${
              idx <= 1 ? "col-span-2" : "col-span-1"
            } row-span-2 rounded-3xl bg-orange-400 p-4 relative`}
          >
            <div className="absolute z-20 bottom-4 left-4 !pr-2">
              <h2 className="font-special-golthic font-bold text-xl text-gray-950/90">
                {blog.title}
              </h2>
              <p className="w-full text-sm text-orange-50 line-clamp-2 overflow-hidden text-ellipsis">
                {blog.drescription}
              </p>
            </div>
          </div>
        );
      })}
      <a
        onClick={() => document.getElementById("all_blogs").showModal()}
        className="col-span-1 row-span-2 rounded-3xl bg-orange-400/5 border-3 border-orange-400/70 hover:border-orange-400 p-4 relative  group transition-all duration-200"
      >
        <div className="absolute z-20 bottom-4 left-4 flex justify-between items-center">
          <h2 className="font-special-golthic font-bold text-xl text-orange-400/70 px-2 group-hover:text-orange-400">
            All Blogs
          </h2>
          <TbArrowUpRight className="text-2xl opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-5.5 transition-all duration-300 ml-2" />
        </div>
      </a>
      <dialog id="all_blogs" className="modal">
        <div className="modal-box w-11/12 max-w-5xl h-11/12 !p-6 !px-8 flex flex-col">
          {/* Header (Fixed part) */}
          <div className="w-full flex-shrink-0">
            <form method="dialog">
              <button className="btn btn-md btn-square btn-ghost hover:border hover:border-orange-400 hover:text-orange-400 absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold font-special-golthic text-3xl text-orange-400">
              My Blogs
            </h3>
            <hr className="!my-4 !text-orange-400/20" />
          </div>

          {/* Scrollable Blog Grid */}
          <div
            className="grid grid-cols-3 gap-4 overflow-y-auto flex-grow pr-2"
            style={{ maxHeight: "calc(100% - 6rem)" }}
          >
              {AllBlogs.map((blog, index) => (
                <div
                  key={index}
                  className="col-span-1 card bg-base-100 w-full shadow-sm"
                >
                  <figure>
                    <img
                      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body !p-4">
                    <div className="category badge !px-4 !py-2 !rounded-xl bg-orange-400/70 text-white">
                      {blog.category}
                    </div>
                    <h2 className="card-title font-special-golthic text-xl">
                      {blog.title}
                    </h2>
                    <p className="line-clamp-3">{blog.drescription}</p>
                    <div className="card-actions justify-end !mt-4">
                      <button className="btn bg-orange-400 btn-circle">
                        <TbArrowUpRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default BlogComponent;
