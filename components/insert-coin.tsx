"use client"

import { useEffect, useState } from "react"

export function InsertCoin({ show, onComplete }: { show: boolean; onComplete: () => void }) {
  const [animationPhase, setAnimationPhase] = useState<"coin" | "secret" | "complete">("coin")

  useEffect(() => {
    if (show) {
      setAnimationPhase("coin")

      const timer1 = setTimeout(() => {
        setAnimationPhase("secret")
      }, 2000)

      const timer2 = setTimeout(() => {
        setAnimationPhase("complete")
        onComplete()
      }, 10000)

      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
      }
    }
  }, [show, onComplete])

  if (!show) return null

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      {animationPhase === "coin" && (
        <div className="text-center">
          <div className="relative mb-8">
            <div className="w-16 h-16 bg-yellow-400 rounded-full mx-auto animate-bounce border-4 border-yellow-600 shadow-lg shadow-yellow-400/50">
              <div className="absolute inset-2 bg-yellow-300 rounded-full flex items-center justify-center">
                <span className="text-yellow-800 font-bold text-xl">¢</span>
              </div>
            </div>
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-600 rounded-full animate-pulse"></div>
          </div>
          <p className="text-2xl text-yellow-400 font-mono animate-pulse">COIN INSERTED</p>
        </div>
      )}

      {animationPhase === "secret" && (
        <div className="text-center max-w-2xl px-4">
          <div className="bg-black border-2 border-cyan-400 rounded-lg p-8 shadow-lg shadow-cyan-400/20">
            <h2 className="text-3xl font-bold text-cyan-400 mb-4 animate-pulse">SECRET CLUE UNLOCKED!</h2>
            <div className="text-green-400 font-mono space-y-2">
              <p>{"> ACCESSING_HIDDEN_FILES..."}</p>
              <p>{"> DECRYPTING_EASTER_EGG..."}</p>
              <p>{"> LOADING_SECRET_MESSAGE..."}</p>
            </div>
            <div className="mt-6 p-4 bg-purple-600/20 border border-purple-400 rounded">
              <p className="text-purple-400 font-mono">
                "Thanks for exploring! You found the clue to a hidden easter egg. Enjoy the game
                while you figure it out :D"
                
                HINT: "All true gamers know the Konami Code" 🎮
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
