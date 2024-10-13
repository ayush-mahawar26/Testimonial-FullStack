import { z } from "zod";

export const ProjectBody = z.object({
  projectName: z.string().min(1),
  headerTitle: z.string().default("Header"),
  description: z.string().default("description will go here"),
});

export type ProjectBodyType = z.infer<typeof ProjectBody>;
