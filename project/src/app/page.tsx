import { AgencyFooter } from "@/components/agency/custom/AgencyFooter";
import { AgencyNavbar } from "@/components/agency/custom/AgencyNavbar";
import { AgencyCaseStudiesSection } from "@/components/agency/landing/AgencyCaseStudiesSection";
import { AgencyContactSection } from "@/components/agency/landing/AgencyContactSection";
import { AgencyHeroSection } from "@/components/agency/landing/AgencyHeroSection";
import { AgencyProcessSection } from "@/components/agency/landing/AgencyProcessSection";
import { AgencyTestimonialSection } from "@/components/agency/landing/AgencyTestimonialSection";

export default function Home() {
  return (
    <div className="agency-scope min-h-screen w-full">
      <AgencyNavbar />
      <main id="main-content" role="main">
        <div className="mx-auto max-w-6xl">
          <AgencyHeroSection />
          <AgencyCaseStudiesSection />
          <AgencyProcessSection />
          <AgencyTestimonialSection />
          <AgencyContactSection />
        </div>
      </main>
      <AgencyFooter />
    </div>
  );
}
