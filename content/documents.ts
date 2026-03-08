import { warnIfContentHasBannedTerms } from "@/lib/compliance";

export type DocumentCategory =
  | "Annual financial statements"
  | "Annual reports"
  | "Policies";

export type GovernanceDocument = {
  category: DocumentCategory;
  title: string;
  year?: number;
  fileUrl?: string;
  status: "available" | "coming_soon";
};

export const governanceDocuments: GovernanceDocument[] = [
  {
    category: "Annual financial statements",
    title: "Annual Financial Statements",
    year: 2025,
    fileUrl: "/documents/annual-financial-statements-2025.txt",
    status: "available",
  },
  {
    category: "Annual reports",
    title: "Annual Report",
    year: 2025,
    fileUrl: "/documents/annual-report-2025.txt",
    status: "available",
  },
  {
    category: "Policies",
    title: "Governance Policy Package",
    status: "coming_soon",
  },
];

export function groupDocumentsByCategory(documents: GovernanceDocument[]) {
  return documents.reduce<Record<DocumentCategory, GovernanceDocument[]>>(
    (acc, item) => {
      acc[item.category].push(item);
      return acc;
    },
    {
      "Annual financial statements": [],
      "Annual reports": [],
      Policies: [],
    },
  );
}

if (process.env.NODE_ENV !== "production") {
  warnIfContentHasBannedTerms("governanceDocuments", [JSON.stringify(governanceDocuments)]);
}
