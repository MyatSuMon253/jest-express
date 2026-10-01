import { isValidEmail } from "../../utils/validator.js";

describe("isValidEmail", () => {
  test("should return false for a non-string input", () => {
    expect(isValidEmail(123 as any)).toBe(false);
    expect(isValidEmail(null as any)).toBe(false);
    expect(isValidEmail(undefined as any)).toBe(false);
    expect(isValidEmail({} as any)).toBe(false);
    expect(isValidEmail([] as any)).toBe(false);
  });

  test("should return false for a invalid email string", () => {
    expect(isValidEmail("not-an-email")).toBe(false);
    expect(isValidEmail("user@")).toBe(false);
    expect(isValidEmail("@domain.com")).toBe(false);
    expect(isValidEmail("user@domain")).toBe(false);
    expect(isValidEmail("user@domain.")).toBe(false);
  });

  test("should return true for a valid email string", () => {
    expect(isValidEmail("myat@gmail.com")).toBe(true);
    expect(isValidEmail("myat.su@gmail.com.mm")).toBe(true);
  });
});
