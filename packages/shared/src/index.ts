import { z } from 'zod';

const requiredText = z.string().trim().min(1);

export const workTypeSchema = z.object({
  id: z.number().int().positive(),
  name: requiredText,
});

export const createWorkTypeSchema = workTypeSchema.pick({ name: true });

export type WorkType = z.infer<typeof workTypeSchema>;
export type CreateWorkTypeDto = z.infer<typeof createWorkTypeSchema>;

export const workEntryInputSchema = z.object({
  date: z.iso.date(),
  workType: requiredText,
  volume: z.number().positive(),
  unit: requiredText,
  executorName: requiredText,
});

export const workEntrySchema = workEntryInputSchema.extend({
  id: z.number().int().positive(),
});

export const createWorkEntrySchema = workEntryInputSchema;
export const updateWorkEntrySchema = workEntryInputSchema;
export const workEntryIdSchema = z.coerce.number().int().positive();

export const deleteWorkEntriesSchema = z.object({
  ids: z.array(z.number().int().positive()).min(1),
});

export const workEntriesQuerySchema = z
  .object({
    begin: z.iso.date().optional(),
    end: z.iso.date().optional(),
    sort: z.enum(['asc', 'desc']).default('desc'),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
  })
  .refine(({ begin, end }) => !begin || !end || begin <= end, {
    message: 'Begin date must not be after end date',
    path: ['end'],
  });

export const workEntriesPageSchema = z.object({
  items: z.array(workEntrySchema),
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
});

export type WorkEntry = z.infer<typeof workEntrySchema>;
export type CreateWorkEntryDto = z.infer<typeof createWorkEntrySchema>;
export type UpdateWorkEntryDto = z.infer<typeof updateWorkEntrySchema>;
export type DeleteWorkEntriesDto = z.infer<
  typeof deleteWorkEntriesSchema
>;
export type WorkEntriesQuery = z.output<typeof workEntriesQuerySchema>;
export type WorkEntriesPage = z.infer<typeof workEntriesPageSchema>;
