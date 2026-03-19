"use client"

import React from "react"
import { Linkedin, Dribbble } from "lucide-react"

const XIcon = ({ size = 24, className = "" }: { size?: number | string; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{ marginTop: "2px" }}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const WhatsappIcon = ({ size = 24, className = "" }: { size?: number | string; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M11.996 0A12.001 12.001 0 0 0 0 12.008c0 2.102.545 4.162 1.583 6.01L.003 24l6.115-1.6c1.815.952 3.84 1.454 5.878 1.455h.005c6.623 0 12.005-5.385 12.005-12.016A12.003 12.003 0 0 0 11.996 0zm0 21.821h-.003c-1.78-.001-3.52-.477-5.044-1.38l-.361-.214-3.75 .982.999-3.655-.235-.374a9.96 9.96 0 0 1-1.528-5.37C2.081 6.195 6.478 1.796 12.004 1.796A9.957 9.957 0 0 1 21.956 11.8c-.001 5.514-4.4 9.923-9.96 10.021zm5.46-7.462c-.299-.15-1.767-.872-2.04-.972-.271-.1-.47-.15-.67.15-.198.298-.771.97-.945 1.171-.173.2-.346.223-.646.074-.3-.15-1.264-.467-2.408-1.488-.89-.792-1.49-1.77-1.664-2.07-.174-.3-.018-.462.132-.612.135-.135.299-.35.45-.525.15-.173.2-.298.298-.498.1-.2.05-.374-.025-.523-.075-.15-.67-1.616-.918-2.214-.242-.582-.487-.502-.67-.512-.172-.008-.37-.01-.569-.01-.199 0-.522.075-.796.374-.275.3-1.047 1.022-1.047 2.492 0 1.47 1.072 2.89 1.221 3.09.15.2 2.11 3.221 5.111 4.516.714.308 1.27.493 1.705.632.716.228 1.368.196 1.884.118.577-.087 1.767-.722 2.016-1.42.25-.699.25-1.296.175-1.42-.075-.125-.275-.2-.575-.35z" />
  </svg>
)

const socials = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/pritam172/",
    color: "#0077b5",
    Icon: Linkedin,
  },
  {
    id: "x",
    name: "X",
    url: "https://x.com/Reven_172",
    color: "#000000",
    Icon: XIcon,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    url: "https://wa.me/918872661269?text=Hi!%20%F0%9F%91%8B%20I%20loved%20your%20portfolio.%20I%20have%20an%20exciting%20project%20in%20mind%20and%20I'm%20interested%20in%20working%20with%20you.%20Can%20we%20discuss%20some%20ideas%20and%20your%20pricing%20packages%3F",
    color: "#25D366",
    Icon: WhatsappIcon,
  },
  {
    id: "dribbble",
    name: "Dribbble",
    url: "https://dribbble.com/pritam-verma17647",
    color: "#ea4c89",
    Icon: Dribbble,
  },
]

export function SocialSidebar() {
  return (
    // hide-cursor class tells CustomCursor to vanish
    <div className="hidden md:block fixed top-1/2 -translate-y-1/2 right-4 md:right-8 lg:right-12 z-50 pointer-events-auto hide-cursor">
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
