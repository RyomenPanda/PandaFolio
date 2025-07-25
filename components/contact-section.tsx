"use client"

import type React from "react"

import { useState, useEffect } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [now, setNow] = useState<string>("")

  useEffect(() => {
    // Run only on client to avoid SSR mismatch
    setNow(new Date().toLocaleString())
    const interval = setInterval(() => setNow(new Date().toLocaleString()), 60000) // update every minute
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setStatus("error")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section className="min-h-screen flex items-center justify-center py-20 px-4">
      <div className="max-w-4xl mx-auto w-full" data-parallax="0.02">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400">
          CONTACT TERMINAL
        </h2>

        <div className="bg-black border-2 border-green-400 rounded-lg p-8 shadow-lg shadow-green-400/20 relative">
          {/* Terminal header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-green-400">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-green-400 font-mono">contact@terminal.exe</span>
            </div>
            <div className="text-green-400 text-sm">{now}</div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-green-400 font-mono mb-2">{"> ENTER_NAME:"}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-2 border-cyan-400 rounded px-4 py-3 text-green-400 font-mono focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="Player name..."
              />
            </div>

            <div>
              <label className="block text-green-400 font-mono mb-2">{"> ENTER_EMAIL:"}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-2 border-cyan-400 rounded px-4 py-3 text-green-400 font-mono focus:border-yellow-400 focus:outline-none transition-colors"
                placeholder="player@email.com"
              />
            </div>

            <div>
              <label className="block text-green-400 font-mono mb-2">{"> ENTER_MESSAGE:"}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-transparent border-2 border-cyan-400 rounded px-4 py-3 text-green-400 font-mono focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                placeholder="Your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-transparent border-2 border-green-400 text-green-400 font-mono py-4 rounded hover:bg-green-400 hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "> TRANSMITTING..." : "> SEND_MESSAGE"}
            </button>
          </form>

          {/* Status messages */}
          {status === "success" && (
            <div className="mt-6 p-4 border-2 border-green-400 rounded bg-green-400/10">
              <p className="text-green-400 font-mono">{"> MESSAGE_SENT_SUCCESSFULLY"}</p>
              <p className="text-green-400 font-mono text-sm mt-1">{"> THANK_YOU_FOR_CONTACTING_ME"}</p>
              <p className="text-green-400 font-mono text-sm mt-1">{"> BACKEND_IN_PROGRESS_COMING_SOON"}</p>
            </div>
          )}

          {status === "error" && (
            <div className="mt-6 p-4 border-2 border-red-400 rounded bg-red-400/10">
              <p className="text-red-400 font-mono">{"> ERROR: MESSAGE_TRANSMISSION_FAILED"}</p>
              <p className="text-red-400 font-mono text-sm mt-1">{"> PLEASE_TRY_AGAIN_LATER"}</p>
            </div>
          )}

          {/* Blinking cursor */}
          <div className="absolute bottom-4 right-4">
            <span className="text-green-400 font-mono animate-pulse">█</span>
          </div>
        </div>

        {/* Social links */}
        <div className="flex justify-center gap-6 mt-12">
              {[
                { name: "GitHub", url: "https://github.com/RyomenPanda" },
                { name: "LinkedIn", url: "https://linkedin.com/" },
                { name: "Twitter", url: "https://twitter.com/ryomenpanda" },
                { name: "Email", url: "mailto:soumikchowdhury@p4nda.me" },
              ].map(({ name, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                >
                  <button className="px-6 py-3 bg-transparent border-2 border-purple-400 text-purple-400 font-mono rounded hover:bg-purple-400 hover:text-black transition-all duration-300">
                    {name}
                    <div className="absolute inset-0 bg-purple-400 opacity-0 group-hover:opacity-20 transition-opacity rounded"></div>
                  </button>
                </a>
              ))}
            </div>
      </div>
    </section>
  )
}
