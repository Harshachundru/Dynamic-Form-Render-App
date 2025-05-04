import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "../types/schema";
import { buildZodSchema } from "../utilities/zodBuilder"

export const useForm = (schema: FormSchema) => {
  const zodSchema = buildZodSchema(schema);

  return useReactHookForm({
    resolver: zodResolver(zodSchema),
    mode: "onBlur",
    defaultValues: schema.fields.reduce((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? false : "";
      return acc;
    }, {} as Record<string, any>)
  });
};
