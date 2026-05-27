import { z } from 'zod';

const REQUIRED_WORK_TYPE_MESSAGE = 'Укажите вид работ';
const REQUIRED_UNIT_MESSAGE = 'Укажите единицу измерения';
const REQUIRED_EXECUTOR_NAME_MESSAGE = 'Укажите ФИО исполнителя';
const DATE_MESSAGE = 'Выберите дату';
const POSITIVE_VOLUME_MESSAGE = 'Объем должен быть положительным числом';
const POSITIVE_ID_MESSAGE =
  'Идентификатор должен быть положительным целым числом';
const DELETE_IDS_MESSAGE = 'Выберите хотя бы одну запись для удаления';
const SORT_MESSAGE = 'Укажите корректную сортировку';
const PAGE_MESSAGE = 'Номер страницы должен быть положительным целым числом';
const LIMIT_MESSAGE = 'Лимит должен быть положительным целым числом';

const requiredText = (message: string) => z.string().trim().min(1, message);
const positiveInt = (message: string) =>
  z.number(message).int(message).positive(message);
const coercedPositiveInt = (message: string) =>
  z.coerce.number(message).int(message).positive(message);

export const workTypeSchema = z.object({
  id: positiveInt(POSITIVE_ID_MESSAGE),
  name: requiredText(REQUIRED_WORK_TYPE_MESSAGE),
});

export const createWorkTypeSchema = workTypeSchema.pick({ name: true });

export type WorkType = z.infer<typeof workTypeSchema>;
export type CreateWorkTypeDto = z.infer<typeof createWorkTypeSchema>;

export const workEntryInputSchema = z.object({
  date: z.iso.date(DATE_MESSAGE),
  workType: requiredText(REQUIRED_WORK_TYPE_MESSAGE),
  volume: z.number(POSITIVE_VOLUME_MESSAGE).positive(POSITIVE_VOLUME_MESSAGE),
  unit: requiredText(REQUIRED_UNIT_MESSAGE),
  executorName: requiredText(REQUIRED_EXECUTOR_NAME_MESSAGE),
});

export const workEntrySchema = workEntryInputSchema.extend({
  id: positiveInt(POSITIVE_ID_MESSAGE),
});

export const createWorkEntrySchema = workEntryInputSchema;
export const updateWorkEntrySchema = workEntryInputSchema;
export const workEntryIdSchema = coercedPositiveInt(POSITIVE_ID_MESSAGE);

export const deleteWorkEntriesSchema = z.object({
  ids: z.array(positiveInt(POSITIVE_ID_MESSAGE)).min(1, DELETE_IDS_MESSAGE),
});

export const workEntriesQuerySchema = z
  .object({
    begin: z.iso.date(DATE_MESSAGE).optional(),
    end: z.iso.date(DATE_MESSAGE).optional(),
    sort: z.enum(['asc', 'desc'], SORT_MESSAGE).default('desc'),
    page: coercedPositiveInt(PAGE_MESSAGE).default(1),
    limit: coercedPositiveInt(LIMIT_MESSAGE)
      .max(100, 'Лимит не должен превышать 100')
      .default(10),
  })
  .refine(({ begin, end }) => !begin || !end || begin <= end, {
    message: 'Дата начала не может быть позже даты окончания',
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
export type DeleteWorkEntriesDto = z.infer<typeof deleteWorkEntriesSchema>;
export type WorkEntriesQuery = z.output<typeof workEntriesQuerySchema>;
export type WorkEntriesPage = z.infer<typeof workEntriesPageSchema>;
