import { z } from "zod";
import { FormSchema } from "../types/schema";

export const buildZodSchema = (schema: FormSchema) => {
  const shape: Record<string, any> = {};

  schema.fields.forEach((field) => {
    let zodType: any;

    switch (field.type) {
      case "text":
        if (field.name === "name") {
          zodType = z
            .string()
            .min(1, `${field.label} is required`)
            .regex(/^[A-Za-z\s]+$/, `${field.label} must contain only letters`);
        } else if (field.name === "username") {
          zodType = z
            .string()
            .min(1, `${field.label} is required`)
            .regex(/^[A-Za-z0-9_]+$/, `${field.label} must not contain special characters`);
        } else if (field.name === "email") {
          zodType = z
            .string()
            .min(1, `${field.label} is required`)
            .email(`${field.label} must be a valid email address`);
        } else if (field.name === "phone") {
          zodType = z
            .string()
            .min(1, `${field.label} is required`)
            .regex(/^[0-9]{10,15}$/, `${field.label} must be a valid number`);
        } else {
          zodType = z.string().min(1, `${field.label} is required`);
        }
        break;

      case "textarea":
        if (field.name === "aboutyou") {
          zodType = z
            .string()
            .min(1, `${field.label} is required`)
            .refine(
              (val) => val.trim().split(/\s+/).length >= 20,
              `${field.label} must be at least 20 words`
            );
        } else {
          zodType = z.string().min(1, `${field.label} is required`);
        }
        break;

      case "number":
        if (field.name === "age") {
          zodType = z
            .coerce
            .number()
            .min(0, "Age must be a positive number")
            .max(120, "Age must be less than or equal to 120");
        } else {
          zodType = z.coerce.number();
        }
        break;

      case "checkbox":
        zodType = z.boolean();
        break;

      case "select":
      case "date":
        zodType = z.string().min(1, `${field.label} is required`);
        break;

      case "password":
        zodType = z
          .string()
          .min(8, `${field.label} must be at least 8 characters long`);
        break;

      default:
        throw new Error(`Unsupported field type: ${field.type}`);
    }

    shape[field.name] = zodType;
  });

  // ✅ Confirm password must match password
  return z.object(shape).refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match",
    }
  );
};
