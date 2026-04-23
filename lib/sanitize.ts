// Input sanitization utilities for server-side validation
// These run only in API route handlers, never in client components.

// Characters/sequences commonly used in injection attacks
const INJECTION_PATTERNS = [
  /<script[\s\S]*?>[\s\S]*?<\/script>/gi,   // Script tags
  /<[^>]+>/g,                                // Any HTML tag
  /javascript:/gi,                           // JS protocol
  /vbscript:/gi,                             // VBScript protocol
  /on\w+\s*=/gi,                             // Event handlers (onclick=, etc.)
  /data:\s*text\/html/gi,                    // Data URI HTML
  /\bexec\s*\(/gi,                           // exec() calls
  /\beval\s*\(/gi,                           // eval() calls
  /\bunion\s+select\b/gi,                    // SQL UNION SELECT
  /\bdrop\s+table\b/gi,                      // SQL DROP TABLE
  /\binsert\s+into\b/gi,                     // SQL INSERT INTO
  /\bdelete\s+from\b/gi,                     // SQL DELETE FROM
  /\bselect\s+.*\bfrom\b/gi,                 // SQL SELECT FROM
  /--\s*$/m,                                 // SQL comment
  /\/\*[\s\S]*?\*\//g,                       // Block comments
  /\x00/g,                                   // Null bytes
];

/** Strip all detected injection patterns from a string. */
export function sanitize(input: string): string {
  let result = input;
  for (const pattern of INJECTION_PATTERNS) {
    result = result.replace(pattern, "");
  }
  return result.trim();
}

/** Validate that a string contains no control characters except newlines/tabs. */
export function hasControlChars(input: string): boolean {
  // Allow \n (10), \r (13), \t (9) - reject everything else below 0x20
  return /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(input);
}

/** Validate email more strictly than a simple regex. */
export function isValidEmail(email: string): boolean {
  if (email.length > 254) return false;
  // RFC 5321 local part max 64 chars
  const [local, domain] = email.split("@");
  if (!local || !domain) return false;
  if (local.length > 64) return false;
  // Must have at least one dot in domain, no consecutive dots
  if (!domain.includes(".")) return false;
  if (/\.{2,}/.test(email)) return false;
  // No special characters that signal injection
  if (/[<>()[\]\\,;:]/.test(email)) return false;
  const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return pattern.test(email);
}

/** Detect common spam content patterns. */
export function isSpam(text: string): boolean {
  const spamPatterns = [
    /\bviagra\b/i,
    /\bcialis\b/i,
    /\bcasino\b/i,
    /\bpoker\b/i,
    /\bloan\s+offer\b/i,
    /\bcrypto\s+investment\b/i,
    /\bclick\s+here\b/i,
    /https?:\/\//gi,     // URLs in contact messages are usually spam
    /\bseo\s+service\b/i,
    /\bbacklink\b/i,
  ];
  return spamPatterns.some((p) => p.test(text));
}
