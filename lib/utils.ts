/**
 * Format a number with commas: 5000 → "5,000"
 */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

/**
 * Validate Pakistani phone format: 03XX-XXXXXXX
 */
export function isValidPKPhone(phone: string): boolean {
  return /^03\d{2}-?\d{7}$/.test(phone.replace(/\s/g, ""));
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Combine class names, filtering out falsy values
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
