"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Github } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/agency/ui/button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function AgencyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Agency Home",
      href: "/agency",
      description: "Agency landing page",
    },
    {
      name: "Main App",
      href: "/",
      description: "Back to main app home",
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveIndex(-1);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveIndex(-1);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % navLinks.length);
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + navLinks.length) % navLinks.length);
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(navLinks.length - 1);
        break;
      case "Escape":
        closeMenu();
        break;
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen && menuRef.current) {
      const firstLink = menuRef.current.querySelector("a") as HTMLAnchorElement;
      firstLink?.focus();
    }
  }, [isMenuOpen]);

  useGSAP(() => {
    const headerEl = navRef.current;
    if (!headerEl) return;

    let isHidden = false;
    let headerHeight = headerEl.offsetHeight;
    gsap.set(headerEl, { y: 0, willChange: "transform" });

    const onResize = () => {
      headerHeight = headerEl.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const st = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        const scrolled = self.scroll();
        if (isMenuOpen) {
          if (isHidden) isHidden = false;
          gsap.to(headerEl, { y: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
          return;
        }

        if (scrolled <= 0) {
          if (isHidden) isHidden = false;
          gsap.to(headerEl, { y: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
          return;
        }

        if (self.direction === 1) {
          if (!isHidden) {
            isHidden = true;
            gsap.to(headerEl, {
              y: -headerHeight,
              duration: 0.45,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        } else if (self.direction === -1) {
          if (isHidden) {
            isHidden = false;
            gsap.to(headerEl, { y: 0, duration: 0.45, ease: "power2.out", overwrite: "auto" });
          }
        }
      },
    });

    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
      gsap.set(headerEl, { y: 0 });
    };
  }, [isMenuOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="focus:bg-primary focus:text-primary-foreground focus:ring-ring !sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:ring-2 focus:ring-offset-2 focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        ref={navRef}
        className="bg-background fixed inset-x-0 top-2 z-40 mx-auto w-full max-w-6xl rounded-lg px-5"
        role="banner"
        aria-label="Main navigation"
      >
        <div className="container mx-auto">
          <nav className="flex items-center justify-between py-4" role="navigation">
            <div className="flex items-center">
              <Link
                href="/agency"
                className="focus:ring-ring flex items-center gap-2 rounded-md transition-opacity hover:opacity-80 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                aria-label="Agency - Return to landing"
              >
                <span className="text-heading text-sm font-semibold tracking-wide">UI Agency</span>
              </Link>
            </div>

            <ul className="hidden items-center space-x-6 lg:flex" role="menubar">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.name} role="none">
                    <Link
                      href={link.href}
                      className={`text-text-heading hover:text-foreground focus:ring-ring rounded-md px-2 py-1 !text-sm font-medium transition-colors focus:ring-0 focus:outline-none ${
                        isActive ? "text-foreground font-normal" : "text-foreground/70"
                      }`}
                      role="menuitem"
                      onFocus={() => setActiveIndex(index)}
                      onBlur={() => setActiveIndex(-1)}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-3">
              <Link
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="focus:ring-ring flex items-center justify-center rounded-md p-2 transition-colors hover:bg-accent"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 text-primary" />
              </Link>

              <Button size="sm" className="text-sm" aria-label="Work with us">
                Work with us
              </Button>
            </div>

            <div className="lg:hidden">
              <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-md outline-none focus:ring-0 focus:outline-none"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                <span
                  aria-hidden="true"
                  className={`bg-foreground absolute left-1/2 block h-0.5 w-6 -translate-x-1/2 rounded-sm transition-all duration-200 ease-in-out ${
                    isMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-3 rotate-0"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`bg-foreground absolute left-1/2 block h-0.5 w-6 -translate-x-1/2 rounded-sm transition-all duration-200 ease-in-out ${
                    isMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-5 rotate-0"
                  }`}
                />
              </button>
            </div>
          </nav>

          {isMenuOpen && (
            <div className="lg:hidden" ref={menuRef} id="mobile-menu" role="dialog" aria-modal="true">
              <div className="space-y-2 px-2 py-4">
                <ul className="space-y-2" role="menu" aria-label="Mobile navigation options">
                  {navLinks.map((link, index) => {
                    const isActive = pathname === link.href;
                    return (
                      <li key={link.name} role="none">
                        <Link
                          href={link.href}
                          className={`hover:bg-accent hover:text-accent-foreground block rounded-md px-3 py-2 text-base font-medium transition-colors focus:outline-none ${
                            activeIndex === index || isActive
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground/70"
                          }`}
                          role="menuitem"
                          tabIndex={activeIndex === index ? 0 : -1}
                          onClick={closeMenu}
                          onKeyDown={(e) => handleKeyDown(e)}
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export { AgencyNavbar };

