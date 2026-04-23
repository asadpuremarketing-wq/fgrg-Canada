import { warnIfContentHasBannedTerms } from "@/lib/compliance";

export type TextSection = {
  heading: string;
  body: string[];
};

export type PageEntry = {
  title: string;
  subtitle: string;
  sections: TextSection[];
};

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    videoSrc: string;
    videoPoster: string;
  };
  heroSlides: Array<{
    title: string;
    body: string;
    eyebrow: string;
    imageSrc: string;
  }>;
  whoWeAre: TextSection;
  focusAreas: TextSection[];
  howWeOperate: {
    title: string;
    cards: Array<{
      title: string;
      body: string;
    }>;
  };
  transparency: TextSection;
  governanceCallout: {
    title: string;
    body: string;
    buttonLabel: string;
    buttonHref: string;
  };
  highlightTiles: string[];
  programsShowcase: {
    title: string;
    intro: string;
    cards: Array<{
      title: string;
      excerpt: string;
      complianceNote: string;
      href: string;
    }>;
  };
  introduction: {
    title: string;
    intro: string;
    ctaLabel: string;
    ctaHref: string;
  };
  mediaGallery: {
    title: string;
    intro: string;
  };
  milestones: {
    title: string;
    intro: string;
    items: string[];
  };
  focusTabs: {
    title: string;
    intro: string;
  };
  globalGallery: {
    title: string;
    intro: string;
    images: Array<{
      src: string;
      alt: string;
    }>;
  };
};

export type DonateContent = PageEntry & {
  donationOptionsHeading: string;
  donationOptions: Array<{
    label: string;
    href: string;
  }>;
  ifRegisteredBlock: string;
  ifPendingBlock: string;
};

export type GovernanceContent = PageEntry & {
  documentsHeading: string;
  policiesControlsHeading: string;
  policiesControls: Array<{
    title: string;
    note: string;
  }>;
  boardBiosHeading: string;
  boardBiosSubtitle: string;
};

export type ContactContent = PageEntry & {
  contactHeading: string;
  contactItems: string[];
};

export type SitePagesContent = {
  home: HomeContent;
  about: PageEntry;
  mission: PageEntry;
  programs: PageEntry;
  governance: GovernanceContent;
  getInvolved: PageEntry;
  donate: DonateContent;
  contact: ContactContent;
  privacy: PageEntry;
  terms: PageEntry;
  news: {
    title: string;
    subtitle: string;
    intro: string;
    latestHeading: string;
    listingHeading: string;
    readMoreLabel: string;
  };
};

export const pagesContent: SitePagesContent = {
  // ─── HOME ────────────────────────────────────────────────
  home: {
    hero: {
      eyebrow: "Canadian Charitable Organization",
      title: "Serving Canadian Communities with Integrity and Compassion",
      body: "FGRF Canada is dedicated to poverty relief, education, and community support across Canada - from food drives and Sunday schools to senior programs and emergency relief.",
      videoSrc: "/videos/hero-background.mp4",
      videoPoster: "/images/hero-cinematic.jpeg",
    },
    heroSlides: [
      {
        eyebrow: "Canadian Charitable Organization",
        title: "Serving Canadian Communities with Integrity and Compassion",
        body: "FGRF Canada is dedicated to poverty relief, education, and community support across Canada.",
        imageSrc: "/images/hero-cinematic.jpeg",
      },
      {
        eyebrow: "Food Security & Ramadan Services",
        title: "Supporting Families with Food Hampers & Iftars",
        body: "Providing food hampers, running food drives, and serving free Iftars during Ramadan to support families across Canada.",
        imageSrc: "/images/hero-cinematic.jpeg",
      },
      {
        eyebrow: "Education & Youth Empowerment",
        title: "Building Futures Through Sunday Schools",
        body: "Empowering the next generation through Sunday schools for children and learning sessions for adults.",
        imageSrc: "/images/hero-cinematic.jpeg",
      },
    ],
    whoWeAre: {
      heading: "Who We Are",
      body: [
        "FGRF Canada is committed to serving communities through structured, transparent, and accountable charitable initiatives that improve quality of life and strengthen social well-being.",
        "We operate in compliance with Canadian charitable law and are guided by principles of integrity, compassion, and responsible stewardship.",
      ],
    },
    focusAreas: [
      {
        heading: "Poverty Relief & Food Security",
        body: [
          "We provide structured support to individuals and families through food hampers, food drives, and essential relief programs across Canada.",
        ],
      },
      {
        heading: "Education & Sunday Schools",
        body: [
          "We organize Sunday schools for kids and adults, alongside workshops and seminars that promote skills development and community growth.",
        ],
      },
    ],
    howWeOperate: {
      title: "How We Operate",
      cards: [
        {
          title: "Board Oversight & Approvals",
          body: "Program planning and major decisions are reviewed and approved by our independent Canadian Board of Directors.",
        },
        {
          title: "Regulatory Compliance",
          body: "All operations follow CRA Charities Directorate guidance, the Income Tax Act (Canada), and the Canada Not-for-profit Corporations Act.",
        },
        {
          title: "Community-Centred Design",
          body: "Programs are informed by demonstrated community need within Canada and evidence-based program design principles.",
        },
        {
          title: "Financial Transparency",
          body: "We maintain proper books and records in accordance with Canadian accounting standards for not-for-profit organizations.",
        },
      ],
    },
    transparency: {
      heading: "Governance & Transparency",
      body: [
        "We are committed to responsible governance, regulatory compliance, and financial transparency in accordance with the Canada Revenue Agency's Charities Directorate requirements.",
      ],
    },
    governanceCallout: {
      title: "Governance & Transparency",
      body: "Governance information is structured for clarity and published as documents become available.",
      buttonLabel: "View Governance Information",
      buttonHref: "/governance",
    },
    highlightTiles: [
      "Canada-Based",
      "Food Drives",
      "Sunday Schools",
      "Senior Programs",
      "Emergency Relief",
    ],
    programsShowcase: {
      title: "Our Programs",
      intro: "FGRF Canada designs and implements structured programs aimed at addressing essential needs and improving quality of life for communities across Canada.",
      cards: [
        {
          title: "Food & Essential Support",
          excerpt:
            "Delivering food hampers, community food drives, and Ramadan Iftars to combat food insecurity and provide dignity to those in need.",
          complianceNote:
            "Subject to Board approval, regulatory compliance, and available funding.",
          href: "/programs",
        },
        {
          title: "Education & Sunday Schools",
          excerpt:
            "Comprehensive Sunday school programs for children and adults, fostering learning, skills development, and community engagement.",
          complianceNote:
            "Subject to Board approval, regulatory compliance, and available funding.",
          href: "/programs",
        },
        {
          title: "Senior Care & Emergency Relief",
          excerpt:
            "Supporting our seniors through social gatherings and providing rapid response for emergencies like floods and power outages.",
          complianceNote:
            "Subject to Board approval, regulatory compliance, and available funding.",
          href: "/programs",
        },
      ],
    },
    introduction: {
      title: "About FGRF Canada",
      intro:
        "A Canadian organization established to deliver charitable programs that provide tangible public benefit - governed independently within Canada by a Canadian Board of Directors.",
      ctaLabel: "Learn About Us",
      ctaHref: "/about",
    },
    mediaGallery: {
      title: "Community Gallery",
      intro: "Visual documentation of FGRF Canada community engagement and organizational activities.",
    },
    milestones: {
      title: "Our Commitments",
      intro: "These pillars reflect the governance, accountability, and transparency model that guides every aspect of our operations.",
      items: [
        "Independent Canadian Board Oversight",
        "Books & Records Maintained",
        "CRA-Ready Transparency",
        "Annual Reporting (as applicable)",
      ],
    },
    focusTabs: {
      title: "Our Focus Areas",
      intro: "Explore each of our core charitable focus areas - all designed for Canadian communities and aligned with CRA-recognized charitable purposes.",
    },
    globalGallery: {
      title: "Community Impact Gallery",
      intro: "A visual record of FGRF Canada's community service and charitable activities across the country.",
      images: [
        { src: "/images/gallery/volunteers-community.jpeg", alt: "Volunteers serving the community" },
        { src: "/images/gallery/education-children.jpeg",   alt: "Youth education program" },
        { src: "/images/gallery/education-class.jpeg",      alt: "Classroom learning session" },
        { src: "/images/gallery/donation-giving.jpeg",      alt: "Charitable donation and giving" },
        { src: "/images/gallery/mission-impact.jpeg",       alt: "Mission and community impact" },
        { src: "/images/gallery/community-support.jpg",     alt: "Community support initiative" },
        { src: "/images/gallery/board-meeting.jpg",         alt: "Board governance meeting" },
        { src: "/images/gallery/hero-cinematic.jpeg",       alt: "FGRF Canada community outreach" },
      ],
    },
  },

  // ─── ABOUT ───────────────────────────────────────────────
  about: {
    title: "About Us",
    subtitle:
      "FGRF Canada is a Canadian organization established to deliver charitable programs that provide tangible public benefit.",
    sections: [
      {
        heading: "Who We Are",
        body: [
          "FGRF Canada is a Canadian organization established to deliver charitable programs that provide tangible public benefit.",
          "Our foundation operates independently within Canada and is governed by a Canadian Board of Directors in accordance with federal and provincial regulations.",
        ],
      },
      {
        heading: "Our Commitments",
        body: [
          "Public accountability - we publish governance information and maintain open communication with our community and regulators.",
          "Responsible financial management - we maintain proper books and records in accordance with Canadian accounting standards.",
          "Evidence-based program design - all programs are developed using documented need assessments and compliance reviews.",
          "Community-centred service delivery - programs are designed to address real needs within Canadian communities.",
        ],
      },
      {
        heading: "Independent Canadian Governance",
        body: [
          "FGRF Canada operates under a Board of Directors that exercises independent oversight in accordance with the Canada Not-for-profit Corporations Act and applicable provincial legislation.",
        ],
      },
    ],
  },

  // ─── MISSION ─────────────────────────────────────────────
  mission: {
    title: "Our Mission & Charitable Purposes",
    subtitle:
      "To advance charitable initiatives in Canada that relieve poverty, advance education, and support community well-being in accordance with Canadian charitable law.",
    sections: [
      {
        heading: "Our Mission",
        body: [
          "To advance charitable initiatives in Canada that relieve poverty, advance education, and support community well-being in accordance with Canadian charitable law.",
        ],
      },
      {
        heading: "Our Charitable Purposes",
        body: [
          "To relieve poverty by providing assistance to individuals and families in need within Canada, including food security programs.",
          "To advance education through Sunday schools, workshops, seminars, and community-based learning initiatives.",
          "To promote community development and social well-being for seniors and vulnerable groups.",
          "To undertake activities that are recognized as charitable under Canadian law.",
        ],
      },
      {
        heading: "Legal Compliance",
        body: [
          "All activities are conducted exclusively for charitable purposes and in compliance with the Income Tax Act (Canada). FGRF Canada is committed to meeting all requirements of the CRA Charities Directorate.",
        ],
      },
    ],
  },

  // ─── PROGRAMS ────────────────────────────────────────────
  programs: {
    title: "Our Programs",
    subtitle:
      "FGRF Canada designs and implements Canada-based charitable programs focused on food security, education, senior care, and emergency relief.",
    sections: [
      {
        heading: "Food Support & Ramadan Services",
        body: [
          "Our food security programs include the distribution of food hampers, organizing community food drives, and providing free Iftars during the month of Ramadan to support those in need across Canada.",
        ],
      },
      {
        heading: "Sunday School & Education",
        body: [
          "We offer structured Sunday school programs for both children and adults, fostering a environment of learning, skills development, and community engagement.",
        ],
      },
      {
        heading: "Senior Care & Social Gatherings",
        body: [
          "We host weekend gatherings, senior dinners, and interactive games to build social connections and support the well-being of our senior community members.",
        ],
      },
      {
        heading: "Emergency Relief & Response",
        body: [
          "FGRF Canada provides critical assistance during local emergencies such as floods and power outages, ensuring that families receive immediate support when they need it most.",
        ],
      },
    ],
  },

  // ─── GOVERNANCE ──────────────────────────────────────────
  governance: {
    title: "Governance & Transparency",
    subtitle:
      "FGRF Canada is governed by an independent Canadian Board of Directors and is committed to regulatory compliance, financial accountability, and public transparency.",
    sections: [
      {
        heading: "Board of Directors",
        body: [
          "FGRF Canada is governed by a Canadian Board of Directors responsible for strategic oversight, compliance, and fiduciary accountability.",
        ],
      },
      {
        heading: "Financial Accountability",
        body: [
          "We maintain proper books and records in accordance with Canadian accounting standards for not-for-profit organizations.",
          "Annual filings (T3010) will be publicly available through the CRA Charities Listing once registration is confirmed.",
        ],
      },
      {
        heading: "Compliance Framework",
        body: [
          "FGRF Canada operates in accordance with: the Income Tax Act (Canada), the Canada Not-for-profit Corporations Act, CRA Charities Directorate Guidance, and applicable provincial legislation.",
        ],
      },
    ],
    documentsHeading: "Public Documents",
    policiesControlsHeading: "Policies & Controls",
    policiesControls: [
      { title: "Financial Controls Policy", note: "Document upload pending" },
      { title: "Safeguarding Policy", note: "Document upload pending" },
      { title: "Diversity, Equity & Inclusion Policy", note: "Document upload pending" },
      { title: "Human Resources Policy", note: "Document upload pending" },
    ],
    boardBiosHeading: "Board of Directors",
    boardBiosSubtitle: "Board member profiles will be published as they are confirmed.",
  },

  // ─── GET INVOLVED ─────────────────────────────────────────
  getInvolved: {
    title: "Get Involved",
    subtitle:
      "Support FGRF Canada's charitable initiatives by volunteering your time, partnering with us, or engaging your organization.",
    sections: [
      {
        heading: "Volunteer",
        body: [
          "Support our charitable initiatives by volunteering your time and expertise. We welcome volunteers who share our commitment to community well-being and responsible stewardship.",
        ],
      },
      {
        heading: "Partner With Us",
        body: [
          "We welcome collaboration with community organizations aligned with our charitable purposes. Partnerships are reviewed through our governance and compliance processes before being formalized.",
        ],
      },
      {
        heading: "Corporate Engagement",
        body: [
          "Organizations interested in structured partnerships may contact us for compliance-aligned collaboration opportunities that support our Canadian charitable mandate.",
        ],
      },
    ],
  },

  // ─── DONATE ──────────────────────────────────────────────
  donate: {
    title: "Donate",
    subtitle:
      "Support charitable initiatives that strengthen Canadian communities.",
    sections: [
      {
        heading: "Support Our Work",
        body: [
          "Your donation supports FGRF Canada's capacity to deliver community support, educational, and youth development programs for Canadians in need.",
          "Donations are processed through a compliant Canadian payment provider and applied in accordance with our financial controls and Board-approved policies.",
        ],
      },
      {
        heading: "Tax Receipts",
        body: [
          "FGRF Canada's charitable registration is currently in process. Official tax receipts will be issued once registration is approved by the CRA.",
        ],
      },
    ],
    donationOptionsHeading: "Donation Options",
    donationOptions: [
      { label: "Donate via Stripe", href: "/donate/stripe" },
      { label: "Donate via CanadaHelps", href: "/donate/canadahelps" },
    ],
    ifRegisteredBlock:
      "FGRF Canada is a Registered Charity. Official tax receipts will be issued for eligible donations.",
    ifPendingBlock:
      "Charitable registration is currently in process. Tax receipts will be issued once registration is approved by the Canada Revenue Agency.",
  },

  // ─── CONTACT ─────────────────────────────────────────────
  contact: {
    title: "Contact Us",
    subtitle: "Reach out to FGRF Canada for general inquiries, partnership discussions, or volunteer opportunities.",
    contactHeading: "General Contact",
    sections: [
      {
        heading: "Get in Touch",
        body: [
          "We aim to respond to all general inquiries in a timely and professional manner. For regulatory or compliance-related correspondence, please indicate the nature of your inquiry in your message.",
        ],
      },
    ],
    contactItems: [
      "FGRF Canada",
      "Address: 1202 Dunsmure Road, Hamilton, Ontario",
      "Email: info@fgrfcanada.ca",
      "Phone: 905-481-0301",
    ],
  },

  // ─── PRIVACY ─────────────────────────────────────────────
  privacy: {
    title: "Privacy Policy",
    subtitle: "This policy explains how FGRF Canada collects, uses, and protects personal information in accordance with Canadian privacy legislation.",
    sections: [
      {
        heading: "Information We Collect",
        body: [
          "We may collect personal information when you contact us, subscribe to updates, or make a donation. This information is used solely to respond to inquiries, process donations, and fulfill our charitable purposes.",
        ],
      },
      {
        heading: "How We Use Your Information",
        body: [
          "Personal information is used to communicate with you, issue tax receipts (where applicable), and improve our programs. We do not sell or share personal information with third parties except as required by law.",
        ],
      },
      {
        heading: "Data Retention & Security",
        body: [
          "We retain personal information only as long as necessary to fulfill the purposes for which it was collected, or as required by applicable legislation. Appropriate technical and administrative safeguards are maintained to protect your information.",
        ],
      },
      {
        heading: "Policy Updates",
        body: [
          "We may update this policy periodically to reflect operational, legal, or compliance changes. Material changes will be communicated via our website.",
        ],
      },
    ],
  },

  // ─── TERMS ───────────────────────────────────────────────
  terms: {
    title: "Terms of Use",
    subtitle: "These terms describe the conditions for access and use of the FGRF Canada website.",
    sections: [
      {
        heading: "Use of Website",
        body: [
          "By accessing this website, you agree to use it only for lawful purposes and in accordance with these terms. The content provided is for general information about FGRF Canada's charitable activities.",
        ],
      },
      {
        heading: "Intellectual Property",
        body: [
          "All content on this website, including text, graphics, and logos, is the property of FGRF Canada and is protected by applicable Canadian intellectual property laws.",
        ],
      },
      {
        heading: "Limitations",
        body: [
          "Content is provided for general information and may be updated to reflect governance, compliance, or operational changes. FGRF Canada is not liable for any reliance placed on the information contained on this website.",
        ],
      },
    ],
  },

  // ─── NEWS ────────────────────────────────────────────────
  news: {
    title: "News & Updates",
    subtitle: "Program updates, annual reports, impact summaries, and community announcements from FGRF Canada.",
    intro:
      "This section publishes updates related to governance milestones, program developments, annual reports, impact summaries, and community announcements. No political commentary or off-topic messaging is included.",
    latestHeading: "Latest Updates",
    listingHeading: "All Updates",
    readMoreLabel: "Read update",
  },
};

if (process.env.NODE_ENV !== "production") {
  const values = JSON.stringify(pagesContent);
  warnIfContentHasBannedTerms("pagesContent", [values]);
}
