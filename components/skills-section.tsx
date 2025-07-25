"use client"

import { useState } from "react"

interface Skill {
  name: string
  category: "frontend" | "backend" | "tools"
  level: number
}

const skills: Skill[] = [
  { name: "React", category: "frontend", level: 50 },
  { name: "TypeScript", category: "frontend", level: 65 },
  { name: "Node.js", category: "backend", level: 60 },
  { name: "Python", category: "backend", level: 95 },
  { name: "PostgreSQL", category: "backend", level: 80 },
  { name: "SQLite", category: "backend", level: 78 },
  { name: "Oracle Cloud", category: "tools", level: 95 },
  { name: "Git", category: "tools", level: 95 },
  { name: "Adobe Photoshop", category: "tools", level: 75 },
  { name: "Adobe Illustrator", category: "tools", level: 60 },
  { name: "Adobe After Effects", category: "tools", level: 85 },
  { name: "Adobe Premiere Pro", category: "tools", level: 90 },
  { name: "Blender", category: "tools", level: 70 },
  { name: "Unity", category: "tools", level: 65 },
  { name: "Blender", category: "tools", level: 70 },
  { name: "HTML", category: "frontend", level: 85 },
  { name: "CSS", category: "frontend", level: 50 },
  { name: "JavaScript", category: "frontend", level: 50 },
  { name: "Django", category: "backend", level: 90 }
]

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "frontend" | "backend" | "tools">("all")

  const filteredSkills = activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory)

  const categories = [
    { key: "all" as const, label: "ALL", color: "cyan" },
    { key: "frontend" as const, label: "FRONTEND", color: "green" },
    { key: "backend" as const, label: "BACKEND", color: "purple" },
    { key: "tools" as const, label: "TOOLS", color: "yellow" },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-6xl mx-auto" data-parallax="0.1">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400">
          SKILL TREE
        </h2>

        {/* Category toggles - arcade style switches */}
        <div className="flex justify-center mb-12">
          <div className="bg-black border-2 border-cyan-400 rounded-lg p-2 flex gap-2">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
                className={`px-4 py-2 font-bold text-sm transition-all duration-300 rounded ${
                  activeCategory === category.key
                    ? `bg-${category.color}-400 text-black`
                    : `text-${category.color}-400 hover:bg-${category.color}-400/20`
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="group bg-black border-2 border-green-400 rounded-lg p-6 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/20"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-green-400 group-hover:text-cyan-400 transition-colors">
                  {skill.name}
                </h3>
                <span className="text-sm text-gray-400 uppercase">{skill.category}</span>
              </div>

              {/* Skill level bar */}
              <div className="relative h-4 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-1000 ease-out"
                  style={{ width: `${skill.level}%` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">LEVEL</span>
                <span className="text-sm font-bold text-cyan-400">{skill.level}%</span>
              </div>

              {/* Pixel decoration */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 group-hover:bg-cyan-400 transition-colors animate-ping" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
