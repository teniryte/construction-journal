import type { WorkEntry } from '@construction-journal/shared';
import { formatIsoDate } from '@/shared/lib';

export function formatWorkEntryDate(date: WorkEntry['date']): string {
  return formatIsoDate(date);
}

export function formatWorkEntryVolume(entry: WorkEntry): string {
  return `${entry.volume} ${entry.unit}`;
}
