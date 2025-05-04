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
        } else {
          zodType = z.string().min(1, `${field.label} is required`);
        }
        break;

      case "textarea":
        if (field.name === "bio") {
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

      default:
        throw new Error(`Unsupported field type: ${field.type}`);
    }

    shape[field.name] = zodType;
  });

  return z.object(shape);
};
