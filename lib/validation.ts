/**
 * Shared validation utilities
 * Copied from frontend/lib/validation.ts to keep marketing site independent
 */

/**
 * RFC 5322 compliant email regex with stricter TLD validation.
 * - Requires TLD of 2+ letters (rejects .c, .x, etc.)
 * - Allows standard special characters in local part
 * - Validates domain label format (no consecutive dots, proper start/end)
 */
export const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

/**
 * Validates an email address using a stricter pattern than HTML5 type="email"
 * @param email - The email address to validate
 * @returns Object with isValid boolean and optional error message
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  if (!email || !email.trim()) {
    return { isValid: false, error: "Email is required." };
  }

  const trimmed = email.trim().toLowerCase();

  // Basic length check
  if (trimmed.length > 254) {
    return { isValid: false, error: "Email address is too long." };
  }

  // Local part length check (before @)
  const atIndex = trimmed.indexOf("@");
  if (atIndex > 64) {
    return { isValid: false, error: "Email local part is too long." };
  }

  // Regex validation
  if (!EMAIL_REGEX.test(trimmed)) {
    return { isValid: false, error: "Please enter a valid email address." };
  }

  return { isValid: true };
}
