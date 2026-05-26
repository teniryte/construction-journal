import { z } from 'zod';

const envSchema = z.object({
  apiUrl: z
    .string()
    .trim()
    .pipe(z.url())
    .transform((value) => value.replace(/\/$/, '')),
});

export const envConfig = envSchema.parse({
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
});
