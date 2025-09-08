/**
 * Takes an array of reference strings (e.g., first name, last name) and
 * returns useful candidates: a base slug, a username (with short random suffix),
 * and an email local-part. The backend must still enforce uniqueness.
 *
 * Example:
 *   const { base, username, emailLocal } = generateString([firstName, lastName]);
 *   // username -> "john-doe-3f9q"
 *   // email    -> `${emailLocal}@yourdomain.com`
 */
export function generateString(references: string[]) {
  const tokens = (references ?? [])
    .map((s) => canonicalToken(s))
    .filter(Boolean);

  // --- base slug for displaying or further composing (e.g., "john-doe")
  const base = slugify(tokens, "-", 32);

  // --- username: keep room for a 5-char suffix ("-abcd")
  const baseForUsername = truncate(base || "user", 27);
  const username = `${baseForUsername}-${rand(4)}`;

  // --- email local-part (e.g., "john.doe" or "user.abcd")
  const emailBase = slugify(tokens, ".", 64);
  const emailLocal = emailBase || `user.${rand(4)}`;

  return { base, username, emailLocal };
}

/* -------------------- helpers -------------------- */

function canonicalToken(input: string): string {
  return (input || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents/diacritics
    .replace(/[^a-z0-9]+/g, ""); // keep only a–z, 0–9
}

function slugify(parts: string[], sep: string, maxLen: number): string {
  const joined = parts
    .join(sep)
    .replace(new RegExp(`[${escapeRegExp(sep)}]+`, "g"), sep) // collapse multiple seps
    .replace(
      new RegExp(`^${escapeRegExp(sep)}|${escapeRegExp(sep)}$`, "g"),
      ""
    ); // trim seps
  return truncate(joined, maxLen);
}

function truncate(s: string, max: number): string {
  return s.length > max ? s.slice(0, max) : s;
}

function rand(len = 4): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  const g: any = globalThis as any;
  const cryptoObj = g?.crypto;

  if (cryptoObj?.getRandomValues) {
    const buf = new Uint32Array(len);
    cryptoObj.getRandomValues(buf);
    for (let i = 0; i < len; i++) out += alphabet[buf[i] % alphabet.length];
  } else {
    for (let i = 0; i < len; i++)
      out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
