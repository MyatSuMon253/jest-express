export function isValidEmail(input: string) {
  if (typeof input !== "string") {
    return false;
  }

  const email = input.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}
