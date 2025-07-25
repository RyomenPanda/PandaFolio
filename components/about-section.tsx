"use client"

import { useEffect, useState, useRef } from "react"

export function AboutSection() {
  const [displayText, setDisplayText] = useState("")
  const [hasStarted, setHasStarted] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const fullText = `> INITIALIZING PLAYER PROFILE...
> LOADING PERSONAL DATA...
> STATUS: ONLINE

Hello! I'm a passionate junior year developer currently pursuing 
Bachelors in Computer Science and Engineering. With a background 
in both design and computer science, I bridge the gap between 
aesthetics and technology. I love solving complex problems and learning new skills. 

When I'm not coding, you can find me exploring ideas or tinkering 
with new tech gadgets.

> PROFILE LOADED SUCCESSFULLY
> READY FOR NEXT LEVEL`

  // Observe visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasStarted(true)
            observer.disconnect()
          }
        })
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // Typewriter when started
  useEffect(() => {
    if (!hasStarted) return
    let index = 0
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [hasStarted])

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl mx-auto" data-parallax="0.3">
        <div className="bg-black border-2 border-green-400 rounded-lg p-8 shadow-lg shadow-green-400/20 relative w-[700px] h-[500px] overflow-y-auto">
          <div className="absolute top-4 left-4 flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>

          <div className="mt-8">
            <pre className="text-green-400 font-mono text-sm md:text-base leading-relaxed whitespace-pre-wrap">
              {displayText}
              <span className="animate-pulse">█</span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}
