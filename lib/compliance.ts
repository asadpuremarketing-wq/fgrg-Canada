export const hardBannedTerms = [
  "global",
  "international",
  "worldwide",
  "overseas",
  "humanitarian",
  "disaster",
  "lobbying",
  "campaign",
  "partisan",
  "vote",
  "convert",
  "proselytize",
];

const reliefContextTerms = [
  "global",
  "international",
  "worldwide",
  "overseas",
  "humanitarian",
  "disaster",
];

export function findComplianceWarnings(input: string): string[] {
  const normalized = input.toLowerCase();
  const warnings: string[] = [];

  for (const term of hardBannedTerms) {
    const pattern = new RegExp(`\\b${term}\\b`, "i");
    if (pattern.test(normalized)) {
      warnings.push(`Found banned term: "${term}"`);
    }
  }

  if (/\brelief\b/i.test(normalized)) {
    const hasInternationalContext = reliefContextTerms.some((term) =>
      new RegExp(`\\b${term}\\b`, "i").test(normalized),
    );
    if (hasInternationalContext) {
      warnings.push('Found "relief" in international-context phrasing');
    }
  }

  return warnings;
}

export function warnIfContentHasBannedTerms(label: string, values: string[]) {
  if (process.env.NODE_ENV === "production") {
    return;
  }

  const allWarnings = values.flatMap((value, index) => {
    const warnings = findComplianceWarnings(value);
    return warnings.map((warning) => `${warning} (item ${index + 1})`);
  });

  if (allWarnings.length > 0) {
    console.warn(`[Compliance warning] ${label}`, allWarnings);
  }
}
