import React, { useState } from "react";
import { Link } from "react-router-dom";
import data from "../Pages/Home/data.json";

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("web");

  const filteredProjects = data.projects.filter(
    (project) => project.category === activeCategory
  );

  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8" id="portfolio">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-4xl font-bold text-black">
            Our Recent <span className="text-[#0088cc]">Projects</span>
          </h2>

          {/* Category Tabs */}
          <div className="mb-12 flex justify-center space-x-8">
            {["video", "web", "design"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative pb-2 text-lg font-medium transition-colors ${
                  activeCategory === category
                    ? "text-[#0088cc]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {category === "video"
                  ? "Video Editing"
                  : category === "web"
                  ? "Web Development"
                  : "Graphic Design"}
                {activeCategory === category && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0088cc]" />
                )}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:gap-5">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={project.link}
                className="group lg:max-w-[480px] relative lg:ml-20 overflow-hidden rounded-3xl bg-gray-900"
              >
                <div className="relative min-h-[450px] lg:min-h-[520px] aspect-[16/10] overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="object-cover bg-cover lg:w-[95%] transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 flex w-full items-center justify-between p-6">
                  <h3 className="text-lg lg:text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                  <div className="rounded-full border border-white/25 p-2 transition-colors group-hover:border-white/50">
                    <svg
                      className="w-9 h-9 lg:w-12 lg:h-12"
                      width="60"
                      height="60"
                      viewBox="0 0 60 60"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M38.8451 22.4084C38.8448 21.8784 38.6341 21.3702 38.2593 20.9954C37.8846 20.6207 37.3764 20.41 36.8464 20.4096L26.1785 20.4068C25.6479 20.4068 25.139 20.6176 24.7638 20.9928C24.3886 21.368 24.1778 21.8768 24.1778 22.4074C24.1778 22.938 24.3886 23.4469 24.7638 23.8221C25.139 24.1973 25.6479 24.4081 26.1785 24.4081L32.0173 24.409L21.142 35.2843C20.7669 35.6594 20.5562 36.1681 20.5562 36.6985C20.5562 37.229 20.7669 37.7377 21.142 38.1128C21.5171 38.4878 22.0258 38.6985 22.5562 38.6985C23.0866 38.6985 23.5953 38.4878 23.9704 38.1128L34.8457 27.2375V33.0753C34.8457 33.3381 34.8975 33.5982 34.998 33.8409C35.0986 34.0837 35.2459 34.3042 35.4317 34.49C35.6175 34.6758 35.838 34.8231 36.0808 34.9237C36.3235 35.0242 36.5836 35.076 36.8464 35.076C37.1091 35.076 37.3692 35.0242 37.612 34.9237C37.8547 34.8231 38.0753 34.6758 38.261 34.49C38.4468 34.3042 38.5942 34.0837 38.6947 33.8409C38.7953 33.5982 38.847 33.3381 38.847 33.0753L38.8451 22.4084Z"
                        fill="white"
                      />
                      <circle
                        cx="30"
                        cy="30"
                        r="29"
                        stroke="white"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
