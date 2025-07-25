"use client"

import { useEffect, useState } from "react"

const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
]

export function KonamiCode({ onActivate }: { onActivate: () => void }) {
  const [sequence, setSequence] = useState<string[]>([])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setSequence((prev) => {
        const newSequence = [...prev, event.code].slice(-KONAMI_CODE.length)

        if (
          newSequence.length === KONAMI_CODE.length &&
          newSequence.every((key, index) => key === KONAMI_CODE[index])
        ) {
          onActivate()
          return []
        }

        return newSequence
      })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onActivate])

  return null
}
