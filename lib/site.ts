export const siteConfig = {
  // Organisation identity
  name:        "Faizan Global Relief Foundation Canada",
  shortName:   "FGRF Canada",
  legalName:   "Faizan Global Relief Foundation Canada",
  description: "A Canadian charitable organization dedicated to advancing community well-being, relieving poverty, supporting education, and promoting public benefit initiatives across Canada.",
  siteUrl:     "https://www.fgrfcanada.ca",

  // CRA registration
  registrationStatus: "pending" as "pending" | "registered",
  craNumber:          "", // Add when registered

  // Contact & location
  address:    "1202 Dunsmure Road, Hamilton, Ontario",
  city:       "Hamilton",
  province:   "Ontario",
  postalCode: "L8H 2X5",
  country:    "CA",
  countryName: "Canada",
  phone:      "+1 905-481-0301",
  email:      "info@fgrfcanada.ca",

  // Geographic coordinates (Hamilton, ON)
  geo: {
    latitude:  43.2441,
    longitude: -79.8530,
  },

  // Social profiles (add URLs when accounts are created)
  social: {
    twitter:   "",
    facebook:  "",
    instagram: "",
    linkedin:  "",
    youtube:   "",
  },

  // SEO keywords
  keywords: [
    "Canadian charity",
    "charitable organization Canada",
    "poverty relief Canada",
    "community support Hamilton Ontario",
    "food security Canada",
    "education support Canada",
    "CRA registered charity",
    "nonprofit Hamilton",
    "FGRF Canada",
    "Faizan Global Relief Foundation Canada",
    "donate Canada",
    "charitable giving Canada",
    "community welfare",
    "relief programs Canada",
  ],
};

export const navItems = [
  { label: "Home",          href: "/"            },
  { label: "About Us",      href: "/about"        },
  { label: "Our Mission",   href: "/mission"      },
  { label: "Our Programs",  href: "/programs"     },
  { label: "Governance",    href: "/governance"   },
  { label: "Get Involved",  href: "/get-involved" },
  { label: "Donate",        href: "/donate"       },
  { label: "News & Updates",href: "/news"         },
  { label: "Contact Us",    href: "/contact"      },
];
