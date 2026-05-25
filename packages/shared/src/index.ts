import { z } from 'zod';

export type WorkLogEntry = {
  id: string;
  date: string;
  workTypeId: string;
  workTypeName: string;
  volume: number;
  unit: string;
  executorName: string;
};

const requiredText = z.string().trim().min(1);

export const workTypeSchema = z.object({
  id: z.number().int().positive(),
  name: requiredText,
});

export const createWorkTypeSchema = workTypeSchema.pick({ name: true });

export type WorkType = z.infer<typeof workTypeSchema>;
export type CreateWorkTypeDto = z.infer<typeof createWorkTypeSchema>;

export type CreateWorkLogEntryDto = {
  date: string;
  workTypeId: string;
  volume: number;
  unit: string;
  executorName: string;
};
