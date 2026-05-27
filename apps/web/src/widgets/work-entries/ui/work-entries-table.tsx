'use client';

import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { styled } from '@mui/material/styles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { WorkEntry } from '@construction-journal/shared';
import { WorkEntryRow } from '@/entities/work-entries';

type DeleteTarget = {
  ids: number[];
};

type WorkEntriesTableProps = {
  allVisibleSelected: boolean;
  editSearch: string;
  items: WorkEntry[];
  selectedIds: Set<number>;
  selectedVisibleCount: number;
  onDelete: (target: DeleteTarget) => void;
  onToggleAllVisible: () => void;
  onToggleOne: (id: number) => void;
};

export function WorkEntriesTable({
  allVisibleSelected,
  editSearch,
  items,
  selectedIds,
  selectedVisibleCount,
  onDelete,
  onToggleAllVisible,
  onToggleOne,
}: WorkEntriesTableProps) {
  const router = useRouter();

  return (
    <JournalTableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                checked={allVisibleSelected}
                indeterminate={
                  selectedVisibleCount > 0 && !allVisibleSelected
                }
                onChange={onToggleAllVisible}
              />
            </TableCell>
            <TableCell>Дата</TableCell>
            <TableCell>Вид работ</TableCell>
            <TableCell>Объем</TableCell>
            <TableCell>Исполнитель</TableCell>
            <TableCell align="right">Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((entry) => {
            const editHref = buildEntryEditHref(entry, editSearch);

            return (
              <WorkEntryRow
                key={entry.id}
                entry={entry}
                actions={
                  <RowActions
                    editHref={editHref}
                    entry={entry}
                    onDelete={onDelete}
                  />
                }
                selection={
                  <Checkbox
                    checked={selectedIds.has(entry.id)}
                    onClick={(event) => event.stopPropagation()}
                    onChange={() => onToggleOne(entry.id)}
                  />
                }
                onClick={() => router.push(editHref)}
              />
            );
          })}
        </TableBody>
      </Table>
    </JournalTableContainer>
  );
}

function RowActions({
  editHref,
  entry,
  onDelete,
}: {
  editHref: string;
  entry: WorkEntry;
  onDelete: (target: DeleteTarget) => void;
}) {
  return (
    <RowActionsStack direction="row" spacing={1}>
      <IconButton
        aria-label="Изменить запись"
        component={Link}
        href={editHref}
        size="small"
        onClick={(event) => event.stopPropagation()}
      >
        <EditOutlinedIcon fontSize="small" />
      </IconButton>
      <IconButton
        aria-label="Удалить запись"
        color="error"
        size="small"
        onClick={(event) => {
          event.stopPropagation();
          onDelete({ ids: [entry.id] });
        }}
      >
        <DeleteOutlineIcon fontSize="small" />
      </IconButton>
    </RowActionsStack>
  );
}

const JournalTableContainer = styled(TableContainer)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  '& .MuiTableCell-head': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .work-entry-row--clickable': {
    cursor: 'pointer',
  },
}));

const RowActionsStack = styled(Stack)({
  justifyContent: 'flex-end',
});

function buildEntryEditHref(entry: WorkEntry, editSearch: string) {
  const query = editSearch ? `?${editSearch}` : '';

  return `/entries/${entry.id}${query}`;
}
