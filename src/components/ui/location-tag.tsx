"use client"

import { useState, useEffect, useRef } from "react"

interface LocationTagProps {
  city?: string
  country?: string
  timezone?: string
}

export function LocationTag({
  city = "Rajasthan",
  country = "India",
  timezone = "IST",
}: LocationTagProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentTime, setCurrentTime] = useState("")
  const [widths, setWidths] = useState({ time: 0, location: 0 })
  const row1Ref = useRef<HTMLSpanElement>(null)
  const row2Ref = useRef<HTMLSpanElement>(null)

  // Keep time up to date every second
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Kolkata",
        }),
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  // Measure widths of both rows
  useEffect(() => {
    if (row1Ref.current && row2Ref.current) {
      setWidths({
        time: row1Ref.current.scrollWidth,
        location: row2Ref.current.scrollWidth,
      })
    }
  }, [currentTime, timezone, city, country])

  const rowH = 20 // px — one visible row height

  return (
    <button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-3 py-1.5 pointer-events-auto cursor-default select-none"
      style={{
        transition: "border-color 500ms ease, background-color 500ms ease, box-shadow 500ms ease",
        ...(isHovered
          ? {
            borderColor: "hsl(var(--foreground) / 0.2)",
            backgroundColor: "hsl(var(--secondary) / 0.8)",
            boxShadow: "0 0 20px rgba(0,0,0,0.06)",
          }
          : {}),
      }}
    >
      {/* Live pulse indicator */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
      </span>

      {/*
        Slot-machine switcher.
        Outer div: fixed height (one row) + overflow-hidden + explicit width (set after mount).
        Inner div: two rows stacked in a flex-col that slides up on hover.
      */}
      <div
        style={{
          height: rowH,
          width: isHovered ? widths.location || "auto" : widths.time || "auto",
          overflow: "hidden",
          position: "relative",
          transition: "width 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            transform: isHovered ? `translateY(-${rowH}px)` : "translateY(0px)",
            transition: "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Row 1 — Current time (default visible) */}
          <span
            ref={row1Ref}
            style={{
              height: rowH,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "hsl(var(--foreground))",
              whiteSpace: "nowrap",
            }}
          >
            {currentTime} {timezone}
          </span>

          {/* Row 2 — Location (revealed on hover) */}
          <span
            ref={row2Ref}
            style={{
              height: rowH,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "hsl(var(--foreground))",
              whiteSpace: "nowrap",
            }}
          >
            {city}, {country}
          </span>
        </div>
      </div>


    </button>
  )
}
