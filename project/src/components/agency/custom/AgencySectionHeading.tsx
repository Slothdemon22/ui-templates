"use client";

import { cn } from "@/lib/agency/utils";
import type { LucideIcon } from "lucide-react";
import { forwardRef } from "react";

export interface AgencySectionHeadingProps {
  badge: string;
  heading: string;
  description?: string;
  icon?: LucideIcon;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "center" | "right";
  className?: string;
  headingClassName?: string;
  badgeClassName?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  id?: string;
  showDescriptionToScreenReaders?: boolean;
}

const sizeVariants = {
  sm: {
    badge: "text-xs px-3 py-1",
    heading: "text-xl sm:text-2xl leading-tight",
    description: "text-sm leading-snug",
    spacing: "space-y-2",
  },
  md: {
    badge: "text-xs sm:text-sm px-4 py-1 sm:px-6",
    heading: "text-2xl sm:text-3xl md:text-4xl leading-tight",
    description: "text-sm sm:text-base leading-snug",
    spacing: "space-y-1 ",
  },
  lg: {
    badge: "text-sm px-4 py-1 sm:px-6",
    heading: "text-3xl sm:text-4xl md:text-5xl leading-tight",
    description: "text-base sm:text-md leading-snug",
    spacing: "space-y-4 sm:space-y-6",
  },
  xl: {
    badge: "text-sm px-6 py-1 sm:px-8",
    heading: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight",
    description: "text-lg sm:text-xl leading-snug",
    spacing: "space-y-6 sm:space-y-8",
  },
};

const alignVariants = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const AgencySectionHeading = forwardRef<HTMLDivElement, AgencySectionHeadingProps>(
  (
    {
      badge,
      heading,
      description,
      icon: Icon,
      size = "md",
      align = "center",
      className,
      headingClassName,
      badgeClassName,
      as: Component = "h2",
      id,
      showDescriptionToScreenReaders = false,
      ...props
    },
    ref
  ) => {
    const variant = sizeVariants[size];
    const alignment = alignVariants[align];

    return (
      <header
        ref={ref}
        className={cn("z-10", variant.spacing, alignment, className)}
        role="banner"
        {...props}
      >
        <div
          className={cn(
            "bg-tag-bg w-fit rounded-3xl",
            variant.badge,
            align === "center" && "md:mx-auto",
            badgeClassName
          )}
          role="banner"
        >
          <p className="text-tag align-middle font-medium">
            {Icon && (
              <span className="mt-1.5 mr-2 inline-block self-center">
                <Icon height={12} width={12} aria-hidden="true" />
              </span>
            )}
            {badge}
          </p>
        </div>

        <Component
          id={id}
          className={cn(
            "text-heading font-semibold",
            variant.heading,
            align === "center" && "md:mx-auto",
            headingClassName
          )}
        >
          {heading}
        </Component>

        {description && (
          <p
            className={cn(
              "text-label",
              variant.description,
              align === "center" && "md:mx-auto",
              !showDescriptionToScreenReaders && "sr-only"
            )}
            aria-live="polite"
          >
            {description}
          </p>
        )}
      </header>
    );
  }
);

AgencySectionHeading.displayName = "AgencySectionHeading";

export { AgencySectionHeading };

