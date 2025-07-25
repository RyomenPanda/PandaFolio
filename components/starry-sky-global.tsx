"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function StarrySkyGlobal() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Setup scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0) // transparent background
    mountRef.current.appendChild(renderer.domElement)

    // Create starfield
    const starsGeometry = new THREE.BufferGeometry()
    const starsMaterial = new THREE.PointsMaterial({ color: 0x00ffff, size: 1.5 })

    const starVertices: number[] = []
    for (let i = 0; i < 8000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = (Math.random() - 0.5) * 2000
      starVertices.push(x, y, z)
    }

    starsGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3))
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    // Neon grid helper – matches the Hero Section
    const gridHelper = new THREE.GridHelper(100, 50, 0x00ff00, 0x004400)
    gridHelper.position.y = -20
    scene.add(gridHelper)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)
      stars.rotation.x += 0.0005
      stars.rotation.y += 0.0005
      gridHelper.rotation.y += 0.002
      renderer.render(scene, camera)
    }
    animate()

    // Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed inset-0 pointer-events-none z-0" />
} 