import z from "zod";

export const testimonialBody = z.object({
  title: z.string(),
  authorname: z.string(),
  email: z.string().email(),
  description: z.string(),
  socialLink: z.string().optional().default(""),
});

export type testimonialType = z.infer<typeof testimonialBody>;
