import { Language, Technology } from "@prisma/client";
import { z } from "zod";

export const readAllSnippetsSchema = z.object({
  name: z.string().optional(),
  userId: z.string(),
});

export const createSnippetSchema = z.object({
  name: z.string(),
  content: z.string(),
  title: z.string(),
  language: z.nativeEnum(Language),
  technology: z.nativeEnum(Technology),
});
