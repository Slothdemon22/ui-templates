"use client";

import { AgencyImageCarousel } from "@/components/agency/custom/AgencyImageCarousel";
import { AgencySectionHeading } from "@/components/agency/custom/AgencySectionHeading";
import { Button } from "@/components/agency/ui/button";
import type { AgencyCaseStudyType } from "@/data/agency/caseStudies";
import { agencyCaseStudies } from "@/data/agency/caseStudies";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyCardProps {
  caseStudy: AgencyCaseStudyType;
  index: number;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (cardRef.current && gsap.effects?.fadeUpOnScroll) {
      gsap.effects.fadeUpOnScroll(contentRef.current, {
        start: "top 90%",
        duration: 0.8,
        markers: false,
      });

      gsap.effects.fadeUpOnScroll(imageRef.current, {
        start: "top 90%",
        duration: 0.8,
        delay: 0.2,
        markers: false,
      });
    }
  }, [index]);

  return (
    <section
      ref={cardRef}
      className="grid grid-cols-1 gap-8 rounded-lg p-4 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-4 lg:grid-cols-12 lg:gap-12"
      aria-labelledby={`case-study-${index}-title`}
      role="article"
    >
      <div ref={contentRef} className="col-span-1 space-y-6 lg:col-span-5">
        <div className="space-y-6">
          <div className="flex items-center">
            <img
              src={caseStudy.logo_src}
              className="aspect-auto max-h-8 w-auto"
              alt={`${caseStudy.name} company logo`}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="space-y-3">
            <p className="text-tag text-sm font-normal">{caseStudy.name}</p>

            <h3
              id={`case-study-${index}-title`}
              className="text-h4 text-heading pr-4 text-2xl leading-tight font-semibold lg:text-3xl"
            >
              {caseStudy.project_title}
            </h3>
          </div>

          <div className="space-y-4">
            <h4 className="sr-only">Key Features</h4>
            <ul className="list-disc space-y-3 pl-4" role="list">
              {caseStudy.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="text-label text-sm">
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button variant="outline" className="w-full transition-all duration-200 hover:shadow-md sm:w-auto">
          View case study
          <span className="sr-only"> for {caseStudy.name}</span>
        </Button>
      </div>

      <div
        ref={imageRef}
        className="col-span-1 aspect-[4/3] lg:col-span-7"
        role="region"
        aria-label={`${caseStudy.name} project screenshots`}
      >
        <AgencyImageCarousel
          images={caseStudy.demo_images}
          caseStudyId={index}
          caseStudyName={caseStudy.name}
        />
      </div>
    </section>
  );
};

function AgencyCaseStudiesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 90%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-7xl px-5 py-16 md:py-24"
      aria-labelledby="case-studies-heading"
      role="region"
    >
      <AgencySectionHeading
        ref={headingRef}
        badge="Designs That Drive Growth"
        heading="Recent case studies"
        description="Explore our latest projects featuring AI-powered platforms, business solutions, and innovative designs that have driven measurable growth for our clients."
        size="md"
        align="center"
        as="h2"
        id="case-studies-heading"
        className="mb-8 md:mb-14"
      />

      <div className="space-y-8 md:space-y-24" role="main" aria-label="Case studies collection">
        {agencyCaseStudies.slice(0, 3).map((caseStudy, index) => (
          <div key={`${caseStudy.name}-${index}`}>
            <CaseStudyCard caseStudy={caseStudy} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}

export { AgencyCaseStudiesSection };

