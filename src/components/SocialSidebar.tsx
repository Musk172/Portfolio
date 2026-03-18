"use client"

import React from "react"
import { Linkedin, Instagram, Youtube, Dribbble } from "lucide-react"

const socials = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/",
    color: "#0077b5",
    Icon: Linkedin,
  },
  {
    id: "instagram",
    name: "Instagram",
    url: "https://instagram.com/",
    color: "#e1306c",
    Icon: Instagram,
  },
  {
    id: "youtube",
    name: "YouTube",
    url: "https://youtube.com/",
    color: "#ff0000",
    Icon: Youtube,
  },
  {
    id: "dribbble",
    name: "Dribbble",
    url: "https://dribbble.com/",
    color: "#ea4c89",
    Icon: Dribbble,
  },
]

export function SocialSidebar() {
  return (
    // hide-cursor class tells CustomCursor to vanish
    <div className="fixed top-1/2 -translate-y-1/2 right-4 md:right-8 lg:right-12 z-50 pointer-events-auto hide-cursor">
      <ul className="flex flex-col items-center gap-3 list-none m-0 p-0">
        {socials.map((social) => {
          const Icon = social.Icon
          return (
            <li key={social.id} className="relative group">
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                // width/height reduced from 50px to 44px to make icons a little smaller
                className="relative flex items-center justify-center w-[44px] h-[44px] rounded-full border border-border/60 bg-secondary/30 backdrop-blur-md text-foreground/70 overflow-hidden transition-all duration-300 ease-in-out hover:border-foreground/30 hover:shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:text-white"
              >
                {/* Background fill sliding up */}
                <div
                  className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out group-hover:h-full z-0"
                  style={{ backgroundColor: social.color }}
                />
                {/* Icon instance — z-10 puts it over the background fill */}
                <Icon
                  size={20} // icon size reduced from 30px to 20px
                  className="relative z-10 transition-colors duration-300"
                />
              </a>

              {/* Tooltip for portrait mode (slides in from left to right, sits on the left of the icon) */}
              <div
                className="absolute right-full top-1/2 -translate-y-1/2 mr-4 px-2.5 py-1.5 rounded-md text-white text-xs font-semibold tracking-wide opacity-0 invisible transition-all duration-300 group-hover:opacity-100 group-hover:visible group-hover:mr-3 pointer-events-none"
                style={{ backgroundColor: social.color }}
              >
                {social.name}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
