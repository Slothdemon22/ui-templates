"use client";

import { AgencySectionHeading } from "@/components/agency/custom/AgencySectionHeading";
import { InteractiveGridPattern } from "@/components/agency/magicui/interactive-grid-pattern";
import { Button } from "@/components/agency/ui/button";
import { Checkbox } from "@/components/agency/ui/checkbox";
import { Input } from "@/components/agency/ui/input";
import { Textarea } from "@/components/agency/ui/textarea";
import { agencyCaseStudies } from "@/data/agency/caseStudies";
import { cn } from "@/lib/agency/utils";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

function AgencyContactSection() {
  const headingRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const testimonialRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const currentCaseStudy = agencyCaseStudies[currentIndex];

  useGSAP(() => {
    if (headingRef.current && gsap.effects?.fadeUpOnScroll) {
      gsap.effects.fadeUpOnScroll(headingRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    if (formRef.current && gsap.effects?.staggerFadeUpOnScroll) {
      gsap.effects.staggerFadeUpOnScroll(formRef.current, {
        start: "top 85%",
        duration: 0.5,
        yOffset: 40,
        ease: "sine.out",
        once: true,
        stagger: 0.15,
        childSelector: "form > *",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const animateOut = () => {
    const tl = gsap.timeline();
    tl.to([contentRef.current, logoRef.current, testimonialRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.out",
    });
    return tl;
  };

  const animateIn = () => {
    const tl = gsap.timeline();
    tl.set([contentRef.current, logoRef.current, testimonialRef.current], { opacity: 0, y: 20 });
    tl.to([contentRef.current, logoRef.current, testimonialRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1,
    });
    return tl;
  };

  const handleNext = () => {
    animateOut().then(() => {
      setCurrentIndex((prev) => (prev + 1) % agencyCaseStudies.length);
    });
  };

  const handlePrevious = () => {
    animateOut().then(() => {
      setCurrentIndex((prev) => (prev - 1 + agencyCaseStudies.length) % agencyCaseStudies.length);
    });
  };

  useEffect(() => {
    if (currentIndex >= 0) animateIn();
  }, [currentIndex]);

  return (
    <section
      className="px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-12 lg:py-24"
      aria-labelledby="contact-heading"
      role="region"
    >
      <AgencySectionHeading
        ref={headingRef}
        badge="Contact Us"
        heading="Get in Touch"
        description="Tell us what you're building and we'll reply quickly."
        size="md"
        align="center"
        as="h2"
        id="contact-heading"
        className="mb-6 sm:mb-8 md:mb-14"
        showDescriptionToScreenReaders={true}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 xl:gap-10">
        <div className="lg:col-span-1">
          <div ref={formRef} className="space-y-4 sm:space-y-6">
            <form className="space-y-4 sm:space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-text-heading text-sm font-medium sm:text-base">
                  Name
                </label>
                <Input id="name" type="text" placeholder="Enter your name" required />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-text-heading text-sm font-medium sm:text-base">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Enter your email" required />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-text-heading text-sm font-medium sm:text-base"
                >
                  Message
                </label>
                <Textarea id="message" placeholder="Type your message..." rows={4} required />
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox id="terms" className="mt-1" required />
                <label htmlFor="terms" className="text-label text-xs sm:text-sm cursor-pointer">
                  I accept the Terms
                </label>
              </div>

              <Button type="submit" className="bg-primary hover:bg-primary/90 w-full py-3 sm:py-4">
                Submit
              </Button>
            </form>
          </div>
        </div>

        <div className="relative rounded-2xl lg:col-span-2">
          <div className="bg-primary absolute inset-0 h-full w-full rounded-2xl"></div>
          <div
            style={{
              backgroundImage:
                "url(https://pbs.twimg.com/media/GqMIQdAXgAA_C4K?format=jpg&name=4096x4096)",
            }}
            className="bg-background relative flex h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border bg-cover opacity-85 sm:h-80 lg:h-full"
          >
            <InteractiveGridPattern
              className={cn(
                "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
              )}
            />
          </div>

          <div className="absolute bottom-0 w-full">
            <div ref={contentRef} className="relative p-4 sm:p-6 lg:p-8">
              <div className="absolute inset-0 w-full rounded-b-2xl bg-gradient-to-t from-gray-500/40 to-transparent"></div>

              {currentCaseStudy.testimonial && (
                <div
                  ref={testimonialRef}
                  className="mt-4 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm sm:mt-6 sm:p-4"
                >
                  <div className="mb-3 flex flex-col sm:mb-4">
                    <div className="mb-3 flex items-center sm:mb-4">
                      <img
                        ref={logoRef}
                        src={currentCaseStudy.logo_src}
                        className="aspect-auto max-h-6 w-auto sm:max-h-8"
                        alt={`${currentCaseStudy.name} logo`}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <blockquote className="text-sm leading-tight font-medium text-gray-200 italic sm:text-base lg:text-lg">
                      {currentCaseStudy.testimonial}
                    </blockquote>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <p className="text-xs font-medium text-white sm:text-sm">
                        {currentCaseStudy.founder_name}
                      </p>
                      <p className="text-xs text-gray-300">{currentCaseStudy.position}</p>
                    </div>
                    <div className="flex gap-1.5 sm:gap-2">
                      <button
                        onClick={handlePrevious}
                        className="group flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:h-8 sm:w-8"
                        aria-label="Previous testimonial"
                        type="button"
                      >
                        <svg
                          className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={handleNext}
                        className="group flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/20 sm:h-8 sm:w-8"
                        aria-label="Next testimonial"
                        type="button"
                      >
                        <svg
                          className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { AgencyContactSection };

