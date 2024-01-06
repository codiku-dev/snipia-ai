import { Language, Technology } from "@prisma/client";
import { z } from "zod";

export const updateSnippetSchema = z
  .object({
    content: z.string().min(1).optional(),
    title: z.string().min(1).optional(),
    language: z.nativeEnum(Language).optional(),
    technology: z.nativeEnum(Technology).optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one value must be provided",
  });
