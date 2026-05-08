"use client";

import { AgencySectionHeading } from "@/components/agency/custom/AgencySectionHeading";
import { Marquee } from "@/components/agency/magicui/marquee";
import { Button } from "@/components/agency/ui/button";
import { agencyCaseStudies } from "@/data/agency/caseStudies";
import "@/lib/agency/gsap-effects";
import { useGSAP } from "@gsap/react";
import Autoplay from "embla-carousel-autoplay";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { Sparkles } from "lucide-react";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/agency/ui/carousel";

gsap.registerPlugin(ScrollTrigger);

function AgencyHeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef(null);

  useGSAP(() => {
    const headingElement = heroRef?.current?.querySelector("h1");
    if (headingElement) {
      SplitText.create(headingElement, {
        type: "lines, words",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.words, {
            duration: 0.6,
            y: 10,
            opacity: 0.5,
            filter: "blur(6px)",
            autoAlpha: 0,
            stagger: 0.06,
          });
        },
      });
    }

    if (heroRef?.current && caseStudiesRef?.current) {
      gsap.effects.fadeUpOnScroll(caseStudiesRef.current, {
        start: "top 80%",
        duration: 0.8,
        markers: false,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="item-center flex flex-col flex-nowrap p-5">
      <div
        ref={heroRef}
        className="hero space-y-4 pt-[116px] pb-[48px] md:pt-[128px] md:pb-[128px] md:text-center lg:pt-[140px] lg:pb-[96px]"
      >
        <AgencySectionHeading
          badge="AI Strategy & Development"
          heading="AI Transformation Partner for Growing Businesses"
          description="We build, train, & deploy custom-LLMs (GPT4, Mistral, Llama3) and other generative AI technologies into products & services at scale — thousands of users & millions of interactions."
          icon={Sparkles}
          size="lg"
          align="center"
          as="h1"
          className="heading max-w-4/5 mx-auto"
          headingClassName="md:mx-auto md:w-2/3 leading-tight"
          showDescriptionToScreenReaders={true}
        />

        <div
          aria-label="Call to action buttons"
          className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-center"
        >
          <Button type="button" className="cursor-pointer">
            Talk to our founder
          </Button>
          <Button type="button" className="cursor-pointer" variant="outline">
            View Case Studies
          </Button>
        </div>

        <div className="relative" role="region" aria-label="Our trusted clients">
          <h2 className="!sr-only">Companies We've Helped Transform</h2>
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-12 bg-gradient-to-r from-gray-50 via-gray-50/90 to-transparent md:w-48"></div>
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-12 bg-gradient-to-l from-gray-50 via-gray-50/90 to-transparent md:w-48"></div>

          <Marquee pauseOnHover className="mt-14">
            {agencyCaseStudies.map((caseStudy, index) => (
              <div
                key={`${caseStudy.name}-${index}`}
                className="group mx-1 flex-shrink-0 cursor-pointer md:mx-4"
              >
                <div className="relative flex h-16 items-center justify-center p-4 transition-all duration-300 ease-in-out">
                  <img
                    src={caseStudy.logo_src}
                    alt={`${caseStudy.project_title} logo`}
                    className="max-h-full max-w-full object-contain opacity-80 grayscale filter transition-all duration-300 ease-in-out hover:opacity-100 hover:brightness-110 hover:grayscale-0"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </div>

        <Carousel
          ref={caseStudiesRef}
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnInteraction: false,
            }),
          ]}
          aria-label="case-studies"
          id="case-studies-section"
          className="relative mt-14 w-full"
        >
          <h2 className="!sr-only">Featured Case Studies</h2>
          <div className="pointer-events-none absolute top-0 left-0 z-5 h-full w-12 bg-gradient-to-r from-gray-50/80 via-gray-50/20 to-transparent md:w-36"></div>
          <div className="pointer-events-none absolute top-0 right-0 z-5 h-full w-12 bg-gradient-to-l from-gray-50/90 via-gray-50/20 to-transparent md:w-36"></div>

          <CarouselContent>
            {agencyCaseStudies.map((caseStudy, index) => (
              <CarouselItem
                key={`${caseStudy.name}-carousel-${index}`}
                className="md:basis-1/2 lg:basis-1/4"
                data-carousel-item
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${agencyCaseStudies.length}: ${caseStudy.name}`}
              >
                <div className="w-full max-w-sm space-y-3 text-left">
                  <div className="bg-tag-bg flex aspect-square items-center justify-center rounded-md p-4">
                    <img
                      src={caseStudy.main_image_src}
                      className="max-h-full max-w-full object-contain"
                      alt={`${caseStudy.name} project preview - ${caseStudy.project_title}`}
                      loading={index < 4 ? "eager" : "lazy"}
                      decoding={index < 4 ? "sync" : "async"}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-heading text-md leading-snug">{caseStudy.project_title}</p>
                    <div className="flex items-center gap-3">
                      <p className="text-heading text-sm font-medium">Standard Draft</p>
                      <p className="text-heading text-sm">[AI DOCUMENT]</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-0 z-50 size-9 translate-x-0 border-0 bg-gray-500/50" />
          <CarouselNext className="right-0 z-50 size-9 translate-x-0 border-0 bg-gray-500/50" />
        </Carousel>
      </div>
    </div>
  );
}

export { AgencyHeroSection };

