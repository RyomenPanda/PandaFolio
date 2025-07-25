"use client"

import { useState } from "react"

interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
}

const experiences: Experience[] = [
  {
    id: "1",
    title: "Diploma in Computer Science and Technology",
    company: "Diploma Course",
    period: "2020 - 2023",
    description:
      "I completed my diploma in Computer Science and Technology & learned about the basics of computer science.",
    technologies: ["C", "HTML", "CSS", "JavaScript"],
  },
  {
    id: "2",
    title: "Freelance Video Editing",
    company: "Freelance",
    period: "2023 - 2024",
    description:
      "I started freelancing as a video editor and gained experience in video editing and graphic design.",
    technologies: ["Adobe Premiere Pro", "Adobe After Effects", "Adobe Photoshop", "Adobe Illustrator"],
  },
  {
    id: "3",
    title: "Bachelor of Technology in Computer Science and Engineering",
    company: "Major in CS",
    period: "2024 - Present",
    description:
      "I am currently pursuing my Bachelors in Computer Science and Engineering. I am learning about the advanced concepts of computer science and engineering.",
    technologies: ["C++", "Java", "Python", "SQL", "React", "Node.js", "Docker"],
  },
]

export function ExperienceTimeline() {
  const [selectedExperience, setSelectedExperience] = useState<string | null>(null)

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl mx-auto" data-parallax="0.2">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
          ADVENTURE LOG
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 transform -translate-y-1/2"></div>

          {/* Experience cartridges */}
          <div className="flex justify-between items-center relative z-10">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`group cursor-pointer transition-all duration-300 ${
                  selectedExperience === exp.id ? "scale-110" : "hover:scale-105"
                }`}
                onClick={() => setSelectedExperience(selectedExperience === exp.id ? null : exp.id)}
              >
                {/* Cartridge */}
                <div className="relative w-32 h-48 bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-cyan-400 rounded-lg shadow-lg group-hover:shadow-cyan-400/50 transition-all duration-300">
                  <div className="absolute top-4 left-4 right-4 h-8 bg-black rounded border border-cyan-400"></div>
                  <div className="absolute top-16 left-4 right-4 bottom-4 bg-gradient-to-b from-cyan-400/20 to-purple-400/20 rounded">
                    <div className="p-2 text-center">
                      <div className="text-xs font-bold text-cyan-400 mb-1">{exp.company}</div>
                      <div className="text-xs text-green-400">{exp.period}</div>
                    </div>
                  </div>

                  {/* Cartridge label */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-center text-cyan-400 font-mono">
                    LVL {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Experience details modal */}
          {selectedExperience && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-black border-2 border-cyan-400 rounded-lg p-6 max-w-2xl w-full shadow-lg shadow-cyan-400/20">
                {(() => {
                  const exp = experiences.find((e) => e.id === selectedExperience)!
                  return (
                    <>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-cyan-400">{exp.title}</h3>
                          <p className="text-green-400">
                            {exp.company} • {exp.period}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedExperience(null)}
                          className="text-red-400 hover:text-red-300 text-xl"
                        >
                          ✕
                        </button>
                      </div>

                      <p className="text-gray-300 mb-4">{exp.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-purple-600/20 border border-purple-400 rounded text-purple-400 text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </>
                  )
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
