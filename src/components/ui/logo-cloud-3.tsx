"use client";

import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { cn } from "@/lib/utils";

type Logo = {
  src: string;
  alt: string;
  name?: string;
  width?: number;
  height?: number;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
  logos: Logo[];
};

export function LogoCloud({ className, logos, ...props }: LogoCloudProps) {
  return (
    <div
      {...props}
      className={cn(
        "overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black,transparent)]",
        className
      )}
    >
      <InfiniteSlider gap={42} reverse duration={60} durationOnHover={150}>
        {logos.map((logo) => (
          <div 
            key={`logo-${logo.alt}`} 
            className="flex items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
          >
            <img
              alt={logo.alt}
              className="pointer-events-none h-6 md:h-7 select-none dark:brightness-0 dark:invert"
              height={logo.height || "auto"}
              loading="lazy"
              src={logo.src}
              width={logo.width || "auto"}
            />
            {logo.name && (
              <span className="font-bold text-lg md:text-xl tracking-tight select-none mt-1">
                {logo.name}
              </span>
            )}
          </div>
        ))}
      </InfiniteSlider>
    </div>
  );
}
