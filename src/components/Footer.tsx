import { Github, Youtube, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-background pt-16 pb-32 md:pb-16 mt-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
        
        <div className="mb-12 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-semibold font-sans tracking-tight mb-4">
            Let&apos;s <span className="text-primary italic font-serif">connect</span>.
          </h2>
          <p className="max-w-md text-foreground/70 font-mono text-sm leading-relaxed mb-8">
            Always open to discussing product design, creative development, 
            or partnership opportunities. Based worldwide.
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full md:w-auto mt-8 md:mt-0">
          <div className="flex gap-6 items-center">
            <a href="https://github.com/Musk172" target="_blank" rel="noopener noreferrer" className="p-3 bg-background border border-border rounded-full hover:bg-foreground hover:text-background transition-colors dark:hover:text-black">
              <Github size={20} />
            </a>
            <a href="https://youtube.com/" target="_blank" rel="noopener noreferrer" className="p-3 bg-background border border-border rounded-full hover:bg-foreground hover:text-background transition-colors dark:hover:text-black">
              <Youtube size={20} />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="p-3 bg-background border border-border rounded-full hover:bg-foreground hover:text-background transition-colors dark:hover:text-black">
              <Instagram size={20} />
            </a>
          </div>
          <div className="text-sm font-mono text-foreground/50 text-left md:text-right mt-4">
            &copy; {new Date().getFullYear()} Developed with Next.js 14
          </div>
        </div>
      </div>
      
      {/* Abstract Background Element */}
      <h1 className="absolute -bottom-10 lg:-bottom-20 left-0 text-[15vw] font-bold text-foreground/5 pointer-events-none select-none tracking-tighter whitespace-nowrap overflow-hidden">
        PORTFOLIO2026
      </h1>
    </footer>
  );
}
