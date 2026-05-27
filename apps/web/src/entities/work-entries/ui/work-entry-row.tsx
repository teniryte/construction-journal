import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import type { KeyboardEvent, MouseEventHandler, ReactNode } from 'react';
import type { WorkEntry } from '@construction-journal/shared';
import {
  formatWorkEntryDate,
  formatWorkEntryVolume,
} from '../model/format-work-entry';

type WorkEntryRowProps = {
  entry: WorkEntry;
  selection?: ReactNode;
  actions?: ReactNode;
  onClick?: MouseEventHandler<HTMLTableRowElement>;
};

export function WorkEntryRow({
  entry,
  selection,
  actions,
  onClick,
}: WorkEntryRowProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLTableRowElement>) => {
    if (
      !onClick ||
      event.target !== event.currentTarget ||
      (event.key !== 'Enter' && event.key !== ' ')
    ) {
      return;
    }

    event.preventDefault();
    event.currentTarget.click();
  };

  return (
    <TableRow
      className={onClick ? 'work-entry-row--clickable' : undefined}
      hover
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      {selection ? <TableCell padding="checkbox">{selection}</TableCell> : null}
      <TableCell>{formatWorkEntryDate(entry.date)}</TableCell>
      <TableCell>{entry.workType}</TableCell>
      <TableCell>{formatWorkEntryVolume(entry)}</TableCell>
      <TableCell>{entry.executorName}</TableCell>
      {actions ? <TableCell align="right">{actions}</TableCell> : null}
    </TableRow>
  );
}
