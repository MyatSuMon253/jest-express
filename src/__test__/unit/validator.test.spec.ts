import { isValidEmail } from "../../utils/validator.js";

describe("isValidEmail", () => {
  test("should return false for a non-string input", () => {
    expect(isValidEmail(123 as any)).toBe(false);
  });

  it("returns true for a valid email", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
  });

  it("returns false for an email missing @", () => {
    expect(isValidEmail("userexample.com")).toBe(false);
  });

  it("returns false for an email missing domain", () => {
    expect(isValidEmail("user@")).toBe(false);
  });

  it("returns false for an email missing TLD", () => {
    expect(isValidEmail("user@example")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });

  it("returns false for a non-string input", () => {
    // @ts-expect-error testing invalid input type
    expect(isValidEmail(null)).toBe(false);
  });
});
