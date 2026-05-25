export type WorkLogEntry = {
  id: string;
  date: string;
  workTypeId: string;
  workTypeName: string;
  volume: number;
  unit: string;
  executorName: string;
};

export type CreateWorkLogEntryDto = {
  date: string;
  workTypeId: string;
  volume: number;
  unit: string;
  executorName: string;
};
