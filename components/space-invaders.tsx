"use client"

import { useEffect, useRef } from "react"

export function SpaceInvaders({
  show,
  onClose,
}: {
  show: boolean
  onClose: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>()

  // game state refs
  const shipX = useRef(120)
  const bullets = useRef<{ x: number; y: number }[]>([])
  const invaders = useRef<{ x: number; y: number; dir: number }[]>([])
  const stars = useRef<{ x: number; y: number; size: number }[]>([])
  const gameOver = useRef(false)

  useEffect(() => {
    if (!show) return

    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    // preload sprites
    const shipImg  = new Image()
    shipImg.src    = "/spaceship.png"
    const alienImg = new Image()
    alienImg.src   = "/alien.png"

    // preload shot sound
    const shootSfx = new Audio("/shoot.wav")
    shootSfx.volume = 0.4                // adjust

    // lock page scroll
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    // create invaders 6x3 grid
    invaders.current = Array.from({ length: 18 }).map((_, i) => ({
      x: 20 + (i % 6) * 40,
      y: 20 + Math.floor(i / 6) * 30,
      dir: 1,
    }))
    bullets.current = []
    shipX.current = 120

    // generate static background stars
    stars.current = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * 300,
      y: Math.random() * 250,
      size: Math.random() * 1.2 + 0.3,
    }))

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") shipX.current = Math.max(0, shipX.current - 8)
      if (e.key === "ArrowRight") shipX.current = Math.min(240, shipX.current + 8)
      if (e.key === " " || e.key === "Enter") {
        bullets.current.push({ x: shipX.current + 12, y: 220 })
        // play sound (rewind so rapid fire works)
        shootSfx.currentTime = 0
        shootSfx.play().catch(() => {})
      }
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)

    const loop = () => {
      // update
      bullets.current.forEach(b => (b.y -= 6))
      bullets.current = bullets.current.filter(b => b.y > -10)

      invaders.current.forEach(inv => (inv.x += inv.dir))
      if (invaders.current.some(inv => inv.x < 0) || invaders.current.some(inv => inv.x > 280)) {
        invaders.current.forEach(inv => {
          inv.dir *= -1
          inv.y += 4
        })
      }

      // collision
      invaders.current = invaders.current.filter(inv => {
        const hit = bullets.current.find(b => Math.abs(b.x - inv.x - 10) < 10 && Math.abs(b.y - inv.y - 10) < 10)
        if (hit) hit.y = -20
        return !hit
      })

      // draw background (space)
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, 300, 250)
      ctx.fillStyle = "#00ffff"
      stars.current.forEach((s) => ctx.fillRect(s.x, s.y, s.size, s.size))

      // Draw ship (replace with sprite if desired)
      const shipWidth = 25
      const shipHeight = 10
      if (shipImg.complete) {
        ctx.drawImage(shipImg, shipX.current, 230, shipWidth, shipHeight)
      } else {
        ctx.fillStyle = "#00ffff"
        ctx.fillRect(shipX.current, 230, shipWidth, shipHeight)
      }

      invaders.current.forEach(inv => {
        if (alienImg.complete) {
          ctx.drawImage(alienImg, inv.x, inv.y, 20, 10)
        } else {
          ctx.fillStyle = "#ff00ff"
          ctx.fillRect(inv.x, inv.y, 20, 10)
        }
      })

      ctx.fillStyle = "#ffff00"
      bullets.current.forEach(b => ctx.fillRect(b.x, b.y, 3, 6))

      // win check
      if (invaders.current.length === 0) {
        ctx.fillStyle = "#00ff00"
        ctx.font = "16px monospace"
        ctx.fillText("YOU WIN!", 110, 125)
        return
      }

      // lose check – any invader reaches ship Y-level
      if (!gameOver.current && invaders.current.some((inv) => inv.y + 10 >= 230)) {
        gameOver.current = true
      }

      if (gameOver.current) {
        ctx.fillStyle = "#ff0000"
        ctx.font = "16px monospace"
        ctx.fillText("GAME OVER!", 98, 125)
        return
      }

      frameRef.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(frameRef.current!)
      window.removeEventListener("keydown", handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-black border-2 border-cyan-400 p-4 rounded-lg shadow-lg shadow-cyan-400/30">
        <canvas ref={canvasRef} width={300} height={250} />
        <button
          onClick={onClose}
          className="mt-2 w-full text-center bg-red-600 hover:bg-red-500 text-white text-xs font-bold py-1 rounded"
        >
          QUIT (ESC)
        </button>
      </div>
    </div>
  )
} 