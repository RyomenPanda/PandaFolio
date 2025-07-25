"use client"

import { useState, useEffect, useContext } from "react"
import { AudioProvider, useAudio } from "@/components/audio-provider"
import { KonamiCode } from "@/components/konami-code"
import { InsertCoin } from "@/components/insert-coin"
import { SpaceInvaders } from "@/components/space-invaders"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceTimeline } from "@/components/experience-timeline"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { ParallaxContainer } from "@/components/parallax-container"
import { ScanLines } from "@/components/scan-lines"
import { StarrySkyGlobal } from "@/components/starry-sky-global"

function PageContent() {
  const [konamiMode, setKonamiMode] = useState(false)
  const [showInsertCoin, setShowInsertCoin] = useState(false)
  const [showInvaders, setShowInvaders] = useState(false)
  const { playKonamiTrack } = useAudio()

  useEffect(() => {
    const root = document.documentElement
    if (konamiMode) {
      root.classList.add("hue-rotate-180")
      playKonamiTrack(true)
    } else {
      root.classList.remove("hue-rotate-180")
      playKonamiTrack(false)
    }
  }, [konamiMode, playKonamiTrack])

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono overflow-x-hidden">
      <StarrySkyGlobal />
      <ScanLines />
      <ParallaxContainer>
        <HeroSection />
        <AboutSection />
        <ExperienceTimeline />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </ParallaxContainer>

      <KonamiCode onActivate={() => setKonamiMode(!konamiMode)} />
      <InsertCoin
        show={showInsertCoin}
        onComplete={() => {
          setShowInsertCoin(false)
          setShowInvaders(true)
        }}
      />

      <SpaceInvaders show={showInvaders} onClose={() => setShowInvaders(false)} />

      {/* Insert Coin Button */}
      <button
        onClick={() => {
          if (!showInsertCoin && !showInvaders) setShowInsertCoin(true)
        }}
        disabled={showInsertCoin || showInvaders}
        className="fixed bottom-4 right-4 z-50 bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg border-2 border-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-300"
      >
        INSERT COIN
      </button>
    </div>
  )
}

export default function Home() {
  return (
    <AudioProvider>
      <PageContent />
    </AudioProvider>
  )
}
