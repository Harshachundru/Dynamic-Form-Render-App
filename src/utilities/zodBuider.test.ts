import { buildZodSchema } from "./zodBuilder";
import { FormSchema } from "../types/schema";

describe("buildZodSchema", () => {
  const baseSchema: FormSchema = {
    title: "Test",
    fields: [
      { label: "Name", type: "text", name: "name", required: true },
      { label: "Username", type: "text", name: "username", required: true },
      { label: "Email", type: "text", name: "email", required: true },
      { label: "Phone", type: "text", name: "phone", required: true },
      { label: "Password", type: "password", name: "password", required: true },
      { label: "Confirm Password", type: "password", name: "confirmPassword", required: true },
      { label: "About You", type: "textarea", name: "aboutyou", required: true },
      { label: "Age", type: "number", name: "age", required: true },
      { label: "Gender", type: "select", name: "gender", options: ["Male", "Female"], required: true },
      { label: "Accept Terms", type: "checkbox", name: "terms", required: true }
    ]
  };

  const schema = buildZodSchema(baseSchema);

  const validData = {
    name: "John Doe",
    username: "john123",
    email: "john@example.com",
    phone: "1234567890",
    password: "Secure@123",
    confirmPassword: "Secure@123",
    aboutyou: "I am a developer who enjoys coding, building applications, solving problems, collaborating with teams, and creating clean, maintainable code for long-term success in software engineering.",
    age: 30,
    gender: "Male",
    terms: true
  };

  describe("Text Fields", () => {
    it("should validate valid input", () => {
      expect(schema.parse(validData)).toEqual(validData);
    });

    it("should reject name with numbers", () => {
      const result = schema.safeParse({ ...validData, name: "John123" });
      expect(result.success).toBe(false);
      expect(result.error?.format().name?._errors[0]).toContain("must contain only letters");
    });

    it("should reject username with special characters", () => {
      const result = schema.safeParse({ ...validData, username: "john@doe" });
      expect(result.success).toBe(false);
      expect(result.error?.format().username?._errors[0]).toContain("must not contain special characters");
    });

    it("should reject invalid email format", () => {
      const result = schema.safeParse({ ...validData, email: "invalid-email" });
      expect(result.success).toBe(false);
      expect(result.error?.format().email?._errors[0]).toContain("must be a valid email");
    });

    it("should reject phone number with letters", () => {
      const result = schema.safeParse({ ...validData, phone: "12345abcde" });
      expect(result.success).toBe(false);
      expect(result.error?.format().phone?._errors[0]).toContain("must be a valid number");
    });
  });

  describe("Password Fields", () => {
    it("should reject mismatched passwords", () => {
      const result = schema.safeParse({ ...validData, confirmPassword: "Mismatch123" });
      expect(result.success).toBe(false);
      expect(result.error?.format().confirmPassword?._errors[0]).toContain("Passwords do not match");
    });

    it("should reject when confirmPassword is present but password is missing", () => {
      const result = schema.safeParse({ ...validData, password: "", confirmPassword: "somepass" });
      expect(result.success).toBe(false);
      expect(result.error?.format().confirmPassword?._errors[0]).toContain("Passwords do not match");
    });
  });

  describe("Textarea Field", () => {
    it("should reject aboutyou with less than 20 words", () => {
      const result = schema.safeParse({ ...validData, aboutyou: "I am a dev." });
      expect(result.success).toBe(false);
      expect(result.error?.format().aboutyou?._errors[0]).toContain("must be at least 20 words");
    });
  });

  describe("Select Field", () => {
    it("should reject empty select fields", () => {
      const result = schema.safeParse({ ...validData, gender: "" });
      expect(result.success).toBe(false);
      expect(result.error?.format().gender?._errors[0]).toContain("is required");
    });
  });

  describe("Checkbox Field", () => {
    it("should reject unchecked required checkbox", () => {
      const result = schema.safeParse({ ...validData, terms: false });
      expect(result.success).toBe(false);
      expect(result.error?.format().terms?._errors[0]).toContain("is required");
    });
  });

  describe("Edge Case", () => {
    it("should throw error for unsupported field type", () => {
      const testSchema = {
        title: "Invalid Field",
        fields: [{ label: "Unknown", type: "slider", name: "slider", required: true }]
      };
      expect(() => buildZodSchema(testSchema)).toThrow("Unsupported field type: slider");
    });
  });
});