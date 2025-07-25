"use client"

import { useState } from "react"
import Image from "next/image"

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  image: string
  demoUrl?: string
  githubUrl?: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "URL Shortener",
    description: "A simple and fast URL shortener web application built with Django that converts long URLs into shorter, more manageable links using the TinyURL service.",
    technologies: ["Django", "SQLite", "pyshorteners", "Bootstrap"],
    image: "/project1.png?height=300&width=400",
    demoUrl: "https://short.p4nda.me/",
    githubUrl: "https://github.com/RyomenPanda/URL-Shortener-Django",
  },
  {
    id: "2",
    title: "PandaCode IDE",
    description: "PandaCode is a modern, AI-powered IDE that provides both a native desktop application and web-based interface for seamless code development. It integrates Google Gemini AI for intelligent code assistance.",
    technologies: ["Python", "PyQt6", "JSON", "Google Gemini AI", "Git"],
    image: "/project2.png?height=300&width=400",
    demoUrl: "https://github.com/RyomenPanda/PandaCode",
    githubUrl: "https://github.com/RyomenPanda/PandaCode",
  },
  {
    id: "3",
    title: "PandaNet",
    description: "A modern real-time chat application built with React, TypeScript, and WebSocket technology. PandaNet enables secure messaging, group chats, and media sharing with a sleek, responsive interface.",
    technologies: ["JavaScript", "WebGL", "Web Audio API"],
    image: "/project3.png?height=300&width=400",
    demoUrl: "https://chat.p4nda.me/",
    githubUrl: "https://github.com/RyomenPanda/PandaNet",
  },
  {
    id: "4",
    title: "SSIR",
    description: "System Sounds Instant Replay - A python based app to record system sounds for the last configurable amount of time with a hotkey.",
    technologies: ["Python", "ffmpeg", "PyQT"],
    image: "/project4.png?height=300&width=400",
    demoUrl: "https://github.com/RyomenPanda/System-Sounds-Instant-Replay",
    githubUrl: "https://github.com/RyomenPanda/System-Sounds-Instant-Replay",
  },
]

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevIndex = (currentIndex - 1 + projects.length) % projects.length
  const nextIndex = (currentIndex + 1) % projects.length

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-7xl mx-auto" data-parallax="0.05">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400">
          ARCADE ROW
        </h2>

        {/* Carousel arcade cabinets */}
        <div className="relative w-full flex items-center justify-center py-8 mx-auto -ml-80 md:-ml-40">

          {/* Carousel area (arrows moved below) */}
          <div className="relative w-full max-w-5xl h-96 mx-auto">
            {projects.map((project, index) => {
              const isActive = index === currentIndex
              const isPrev = index === prevIndex
              const isNext = index === nextIndex

              if (!isActive && !isPrev && !isNext) return null

              const scaleClass = isActive ? "scale-100" : "scale-75 opacity-60"
              const positionClass = isActive
                ? "translate-x-0"
                : isPrev
                ? "-translate-x-[22rem]"
                : "translate-x-[22rem]"
              return (
                <div
                  key={project.id}
                  className={`absolute left-1/2 top-0 -translate-x-1/2 ${positionClass} transition-transform duration-500 ${scaleClass} cursor-pointer`}
                  onClick={() => {
                    if (isActive) {
                      setSelectedProject(project.id)
                    } else {
                      setCurrentIndex(index)
                    }
                  }}
                >
                  {/* Arcade Cabinet markup (unchanged) */}
                  <div className={`relative w-80 h-96 bg-gradient-to-b from-gray-800 via-gray-900 to-black border-4 border-yellow-400 rounded-t-3xl rounded-b-lg shadow-2xl ${isActive ? 'hover:shadow-yellow-400/30' : ''} transition-all duration-300`}>
                    {/* Screen */}
                    <div className="absolute top-8 left-8 right-8 h-48 bg-black border-2 border-green-400 rounded-lg overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-green-400/10 animate-pulse" />
                    </div>

                    {/* Control panel */}
                    <div className="absolute bottom-16 left-8 right-8 h-20 bg-gray-700 border-2 border-cyan-400 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-cyan-400 mb-1">{project.title}</h3>
                        <p className="text-xs text-green-400">CLICK TO PLAY</p>
                      </div>
                    </div>

                    {/* Joystick and buttons */}
                    <div className="absolute bottom-4 left-8 w-8 h-8 bg-red-500 rounded-full border-2 border-red-700" />
                    <div className="absolute bottom-4 right-8 flex gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-blue-700" />
                      <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-green-700" />
                    </div>

                    {/* Cabinet number */}
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Arrow controls removed – navigate by clicking side cabinets */}
        </div>

        {/* Project details modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
            <div className="bg-black border-2 border-yellow-400 rounded-lg p-6 max-w-4xl w-full shadow-lg shadow-yellow-400/20">
              {(() => {
                const project = projects.find((p) => p.id === selectedProject)!
                return (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-3xl font-bold text-yellow-400">{project.title}</h3>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="text-red-400 hover:text-red-300 text-2xl"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          width={400}
                          height={300}
                          className="w-full rounded-lg border-2 border-green-400"
                        />
                      </div>

                      <div>
                        <p className="text-gray-300 mb-4">{project.description}</p>

                        <div className="mb-6">
                          <h4 className="text-cyan-400 font-bold mb-2">TECH STACK:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-purple-600/20 border border-purple-400 rounded text-purple-400 text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-4">
                          {project.demoUrl && (
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <button className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded transition-colors">
                                PLAY DEMO
                              </button>
                            </a>
                          )}
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <button className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-bold rounded transition-colors">
                                VIEW CODE
                              </button>
                            </a>
                          )}
                        </div>

                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
