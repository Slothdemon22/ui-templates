export const agencyCaseStudies = [
  {
    main_image_src:
      "https://res.cloudinary.com/dieth2xb3/image/upload/v1756356325/Screenshot_2025-08-28_at_10.14.32_AM_vndeou.png",
    project_title: "Reimagining business insurance with a data-driven, AI-powered platform design.",
    logo_src:
      "https://cdn.prod.website-files.com/62528d398a42424ab6390ee1/665dcd0c7dc5304519a9a4e0_Standard%20Draft.png",
    description:
      "We designed, built & deployed on Standard Draft, an AI-powered legal signing platform. It was a multi-year journey.",
    features: [
      "R&D-ed & built first-of-it's kind legal contract templating engine to draft & negotiate enterprise-ready NDAs in minutes via wizard-style interface.",
      "Cut down contract creation time from ~31 days to hours. >10x faster. Several times cheaper.",
    ],
    case_study_link: "#",
    name: "Standard Draft",
    demo_images: [
      "https://res.cloudinary.com/dieth2xb3/image/upload/v1756356325/Screenshot_2025-08-28_at_10.14.32_AM_vndeou.png",
      "https://res.cloudinary.com/dieth2xb3/image/upload/v1756356325/Screenshot_2025-08-28_at_10.14.32_AM_vndeou.png",
      "https://res.cloudinary.com/dieth2xb3/image/upload/v1756356325/Screenshot_2025-08-28_at_10.14.32_AM_vndeou.png",
    ],
    test_img:
      "https://cdn.prod.website-files.com/62528d398a42424ab6390ee1/667adecbe7684da501b70952_image%2014.jpg",
    testimonial:
      `"Ionio didn't disappear after the MVP was built. They continued to work with us to fix bugs and make improvements based on user feedback."`,
    founder_name: "Ryan Samii",
    position: "Founder & CEO",
  },
  {
    main_image_src:
      "https://res.cloudinary.com/dieth2xb3/image/upload/v1756356657/Screenshot_2025-08-28_at_10.20.39_AM_v5cnur.png",
    project_title: "Enhancing Perlon AI’s user experience for sales success",
    logo_src: "https://cdn.prod.website-files.com/62528d398a42424ab6390ee1/6659ae5c3907ce45e187ce85_dex-logo.png",
    description:
      "Ionio designed, trained, built & deployed an AI-powered personalized slide deck creation & analytics SaaS platform from scratch in ~8 weeks.",
    features: [
      "Create slide decks in minutes rather than hours. Personalized decks convert more. Successful outcomes.",
      "Dex scrapes Google, LinkedIn & company website for your prospect's info.",
      "Drastically cut down repetitive labor for SDRs from 20+ hours/month down to just ~2h. 10x faster. 20x cheaper.",
    ],
    case_study_link: "#",
    name: "Dex",
    demo_images: [
      "https://res.cloudinary.com/dieth2xb3/image/upload/v1756356657/Screenshot_2025-08-28_at_10.20.39_AM_v5cnur.png",
      "https://res.cloudinary.com/dieth2xb3/image/upload/v1756356657/Screenshot_2025-08-28_at_10.20.39_AM_v5cnur.png",
      "https://res.cloudinary.com/dieth2xb3/image/upload/v1756356657/Screenshot_2025-08-28_at_10.20.39_AM_v5cnur.png",
    ],
    test_img:
      "https://cdn.prod.website-files.com/62528d398a42424ab6390ee1/667adece3c44f7ae7233676d_video%2011.jpg",
    testimonial:
      `"Even though we are from the US and working with a company overseas, they made the experience very personable."`,
    founder_name: "Reid Chong",
    position: "Founder & CEO",
  },
  {
    main_image_src:
      "https://res.cloudinary.com/dieth2xb3/image/upload/v1756356701/Screenshot_2025-08-28_at_10.21.20_AM_qr8ko9.png",
    project_title: "Refining Scout’s interface and UX for scalable AI automation",
    logo_src: "https://veerview.ai/assets/images/image05.jpg?v=505d141a",
    description:
      "Ionio designed, developed and deployed Veerview AI, a prospecting & data enrichment SaaS for outbound sales —  12 weeks, team of 3.",
    features: [
      "Scrape emails from our ~54million brand & employees database based on 50+ datapoints with <5 clicks.",
      "Enrich data from 10+ sources with proprietary scraper for ecommerce & website data, SEO metrics & social media metrics through a single portal",
    ],
    case_study_link: "#",
    name: "Veerview",
    demo_images: [
      "https://res.cloudinary.com/dieth2xb3/image/upload/v1756356701/Screenshot_2025-08-28_at_10.21.20_AM_qr8ko9.png",
      "https://res.cloudinary.com/dieth2xb3/image/upload/v1756356701/Screenshot_2025-08-28_at_10.21.20_AM_qr8ko9.png",
      "https://res.cloudinary.com/dieth2xb3/image/upload/v1756356701/Screenshot_2025-08-28_at_10.21.20_AM_qr8ko9.png",
    ],
    test_img:
      "https://cdn.prod.website-files.com/62528d398a42424ab6390ee1/667adecbea18eeb8f0d91b57_video%204.jpg",
    testimonial:
      `"Communication is free-flowing and Veerview can almost always get a hold of someone on Ionio’s team throughout the day."`,
    founder_name: "TJ Gottfried",
    position: "Founder",
  },
];

export interface AgencyCaseStudyType {
  main_image_src: string;
  project_title: string;
  logo_src: string;
  description: string;
  features: string[];
  case_study_link: string;
  name: string;
  demo_images: string[];
  test_img?: string;
  testimonial?: string;
  founder_name?: string;
  position?: string;
}

