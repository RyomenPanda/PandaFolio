"use client"

import type React from "react"
import { createContext, useContext, useState, useRef, useEffect } from "react"
import { Play, Pause } from "lucide-react"

interface Track {
  title: string
  src: string
}

interface AudioContextType {
  isPlaying: boolean
  toggleAudio: () => void
  volume: number
  setVolume: (volume: number) => void
  playKonamiTrack: (play: boolean) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

const konamiTrack: Track = { title: "Secret", src: "/secret.mp3" }
const defaultTrack: Track = { title: "Track1", src: "/track1.mp3" }

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [volume, setVolume] = useState(0.3)
  const [currentTrack, setCurrentTrack] = useState<Track>(defaultTrack)
  const [isPlaying, setIsPlaying] = useState(true)
  const [konamiModeActive, setKonamiModeActive] = useState(false)
  const [awaitingInteraction, setAwaitingInteraction] = useState(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const lastUserSelectedTrack = useRef<Track>(defaultTrack)

  const tracks: Track[] = [
    defaultTrack,
    { title: "Track2", src: "/track2.mp3" },
    { title: "Track3", src: "/track3.mp3" },
  ]

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.loop = true
    return () => {
      audioRef.current?.pause()
    }
  }, [])

  // Sync audio state with component state
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onPlay = () => {
      setIsPlaying(true)
      setAwaitingInteraction(false)
    }
    const onPause = () => setIsPlaying(false)
    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)

    // Set src and volume
    const trackToPlay = konamiModeActive ? konamiTrack : currentTrack
    if (!audio.src.endsWith(trackToPlay.src)) {
      audio.src = trackToPlay.src
    }
    audio.volume = volume

    // Handle playback
    if (isPlaying) {
      const playTimeout = setTimeout(() => {
        audio.play().catch((error) => {
          if (error.name === "NotAllowedError") {
            setIsPlaying(false) // Autoplay was blocked
            setAwaitingInteraction(true)
          }
        })
      }, 1000) // 1 second delay

      return () => {
        clearTimeout(playTimeout)
        audio.removeEventListener("play", onPlay)
        audio.removeEventListener("pause", onPause)
      }
    } else {
      audio.pause()
    }

    return () => {
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
    }
  }, [isPlaying, currentTrack, volume, konamiModeActive])

  // Handle waiting for user interaction for autoplay
  useEffect(() => {
    if (awaitingInteraction) {
      const startOnInteraction = () => {
        setIsPlaying(true)
      }

      window.addEventListener("click", startOnInteraction)
      window.addEventListener("keydown", startOnInteraction)
      window.addEventListener("scroll", startOnInteraction)

      return () => {
        window.removeEventListener("click", startOnInteraction)
        window.removeEventListener("keydown", startOnInteraction)
        window.removeEventListener("scroll", startOnInteraction)
      }
    }
  }, [awaitingInteraction])

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev)
  }

  const playTrack = (track: Track) => {
    if (!konamiModeActive) {
      lastUserSelectedTrack.current = track
      setCurrentTrack(track)
    }
  }

  const playKonamiTrack = (play: boolean) => {
    setKonamiModeActive(play)
    if (play) {
      setCurrentTrack(konamiTrack)
    } else {
      setCurrentTrack(lastUserSelectedTrack.current)
    }
  }

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, volume, setVolume, playKonamiTrack }}>
      {children}
      <AudioControls
        isPlaying={isPlaying}
        toggleAudio={toggleAudio}
        volume={volume}
        setVolume={setVolume}
        tracks={tracks}
        currentTrack={konamiModeActive ? konamiTrack : currentTrack}
        playTrack={playTrack}
        konamiModeActive={konamiModeActive}
      />
    </AudioContext.Provider>
  )
}

interface ControlsProps {
  isPlaying: boolean
  toggleAudio: () => void
  volume: number
  setVolume: (v: number) => void
  tracks: Track[]
  currentTrack: Track
  playTrack: (t: Track) => void
  konamiModeActive: boolean
}

function AudioControls({
  isPlaying,
  toggleAudio,
  volume,
  setVolume,
  tracks,
  currentTrack,
  playTrack,
  konamiModeActive,
}: ControlsProps) {
  return (
    <div
      className={`fixed top-4 right-4 z-50 bg-black border-2 border-cyan-400 rounded-lg p-2 shadow-lg shadow-cyan-400/20 w-28 flex flex-col items-center gap-2`}
    >
      {/* Play / Pause */}
      <button
        onClick={toggleAudio}
        className="text-cyan-400 hover:text-cyan-300 transition-colors mb-2"
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* Track selector */}
      <select
        className="w-full bg-black border border-cyan-400 text-cyan-400 px-1 py-0.5 text-[10px] font-press cursor-pointer hover:border-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
        value={currentTrack.src}
        onChange={(e) => {
          const track = tracks.find((t) => t.src === e.target.value)
          if (track) playTrack(track)
        }}
        disabled={konamiModeActive}
      >
        {!konamiModeActive ? (
          tracks.map((track) => (
            <option key={track.src} value={track.src} className="bg-black text-cyan-400">
              {track.title}
            </option>
          ))
        ) : (
          <option value={konamiTrack.src}>{konamiTrack.title}</option>
        )}
      </select>

      {/* Volume tower */}
      <div className="flex items-center gap-1 mt-1">
        {/* minus */}
        <button
          onClick={() => setVolume(Math.min(1, volume - 0.2))}
          className="text-cyan-400 hover:text-cyan-300 text-sm font-bold px-1"
        >
          -
        </button>

        {/* signal bars */}
        <div className="flex flex-col-reverse justify-start h-16 w-4 gap-[2px]">
          {Array.from({ length: 5 }).map((_, i) => {
            const level = i + 1
            const filled = volume >= level / 5 - 0.0001
            return (
              <div
                key={level}
                className={`w-full rounded-sm ${filled ? "bg-cyan-400" : "bg-gray-700"}`}
                style={{ height: `${level * 3}px` }}
              />
            )
          })}
        </div>

        {/* plus */}
        <button
          onClick={() => setVolume(Math.min(1, volume + 0.2))}
          className="text-cyan-400 hover:text-cyan-300 text-sm font-bold px-1"
        >
          +
        </button>
      </div>
    </div>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error("useAudio must be used within AudioProvider")
  }
  return context
}
