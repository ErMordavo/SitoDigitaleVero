"use client"

import { useEffect, useState, useRef } from "react"
import { STORAGE_KEYS } from "@/lib/config"
import { X, Volume2, VolumeX } from "lucide-react"

export function IntroVideo() {
  const [show, setShow] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    try {
      const seen = sessionStorage.getItem(STORAGE_KEYS.introSeen)
      if (!seen) setShow(true)
    } catch {
      setShow(true)
    }
  }, [])

  useEffect(() => {
    if (show && videoRef.current) {
      videoRef.current.play().catch(e => {
        console.log("Autoplay bloccato, utente deve interagire")
        setIsPlaying(false)
      })
    }
  }, [show])

  const close = () => {
    setExiting(true)
    if (videoRef.current) {
      videoRef.current.pause()
    }
    try {
      sessionStorage.setItem(STORAGE_KEYS.introSeen, "1")
    } catch {
      // ignore
    }
    setTimeout(() => setShow(false), 1000)
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVideoEnd = () => {
    close()
  }

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-[200] transition-opacity duration-1000 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
      role="dialog"
      aria-label="Intro Toolnest"
    >
      {/* Video fullscreen */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted={isMuted}
        loop={false}
        playsInline
        onEnded={handleVideoEnd}
        onPlaying={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/Video/131048-749689316.mp4" type="video/mp4" />
      </video>

      {/* Overlay scuro trasparente opzionale (rimuovi se non vuoi) */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Bottone mute/unmute */}
      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-6 right-24 z-[201] rounded-full bg-black/50 p-3 backdrop-blur-sm transition-all hover:bg-black/70"
        aria-label={isMuted ? "Attiva audio" : "Disattiva audio"}
      >
        {isMuted ? (
          <VolumeX className="h-5 w-5 text-white" />
        ) : (
          <Volume2 className="h-5 w-5 text-white" />
        )}
      </button>

      {/* Bottone Skip */}
      <button
        type="button"
        onClick={close}
        className="absolute bottom-6 right-6 z-[201] rounded-full bg-black/50 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-black/70"
      >
        <X className="mr-2 inline h-4 w-4" />
        Skip intro
      </button>

      {/* Loading spinner */}
      {!isPlaying && (
        <div className="absolute inset-0 z-[202] flex items-center justify-center bg-black">
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/20 border-t-white"></div>
            <p className="text-white/80">Caricamento...</p>
          </div>
        </div>
      )}
    </div>
  )
}