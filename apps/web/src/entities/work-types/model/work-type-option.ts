import type { WorkType } from '@construction-journal/shared';

export type WorkTypeOption = {
  label: string;
  value: string;
};

export function toWorkTypeOption(workType: WorkType): WorkTypeOption {
  return {
    label: workType.name,
    value: workType.name,
  };
}
