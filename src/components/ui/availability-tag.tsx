"use client"

import { useState, useEffect, useRef } from "react"

export function AvailabilityTag() {
  const [isHovered, setIsHovered] = useState(false)
  const [widths, setWidths] = useState({ initial: 0, hover: 0 })
  const row1Ref = useRef<HTMLSpanElement>(null)
  const row2Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (row1Ref.current && row2Ref.current) {
      setWidths({
        initial: row1Ref.current.scrollWidth,
        hover: row2Ref.current.scrollWidth,
      })
    }
  }, [])

  const rowH = 20 // px — one visible row height

  return (
    <button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center justify-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-3 py-1.5 pointer-events-auto cursor-default select-none"
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

      <div
        style={{
          height: rowH,
          width: isHovered ? widths.hover || "auto" : widths.initial || "auto",
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
          {/* Row 1 */}
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
            Open to Opportunities
          </span>

          {/* Row 2 */}
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
            Can I create you a beautiful website/app?
          </span>
        </div>
      </div>

      {/* Arrow indicator */}
      <svg
        className="h-3 w-3 shrink-0 text-muted-foreground transition-all duration-300 ml-1"
        style={{
          transform: isHovered ? "translateX(2px) rotate(-45deg)" : "translateX(0) rotate(0)",
          opacity: isHovered ? 1 : 0.5,
        }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    </button>
  )
}
