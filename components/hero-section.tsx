"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { PandaLogo } from "./panda-logo"

export function HeroSection() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()

  useEffect(() => {
    if (!mountRef.current) return

    // Three.js setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    sceneRef.current = scene
    rendererRef.current = renderer

    // Create starfield
    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({ color: 0x00ffff, size: 2 })

    const starsVertices = []
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = (Math.random() - 0.5) * 2000
      starsVertices.push(x, y, z)
    }

    starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starsVertices, 3))
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Create neon grid
    const gridHelper = new THREE.GridHelper(100, 50, 0x00ff00, 0x004400)
    gridHelper.position.y = -20
    scene.add(gridHelper)

    camera.position.z = 5

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      stars.rotation.x += 0.0005
      stars.rotation.y += 0.0005
      gridHelper.rotation.y += 0.002

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  const scrollToAbout = () => {
    const target = document.getElementById("about")
    if (!target) return
    const y = target.getBoundingClientRect().top + window.scrollY - 80 // scroll 80px less
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div ref={mountRef} className="fixed inset-0 pointer-events-none -z-10" />

      <div className="relative z-20 text-center" data-parallax="0.5">
        <PandaLogo className="mx-auto mb-8 animate-pulse" />
        <h1 className="text-6xl md:text-8xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 animate-pulse">
          SOUMIK CHOWDHURY
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-green-400">{"> Ready to explore my journey?"}</p>
        <button
          onClick={scrollToAbout}
          className="font-press group relative px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 font-bold text-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 transform hover:scale-105"
        >
          <span className="relative z-10">DIVE IN</span>
          <div className="absolute inset-0 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </button>
      </div>

      {/* Floating pixels */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  )
}
