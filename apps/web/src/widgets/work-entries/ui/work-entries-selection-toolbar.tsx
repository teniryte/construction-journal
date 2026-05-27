'use client';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { styled } from '@mui/material/styles';
import Link from 'next/link';

type WorkEntriesSelectionToolbarProps = {
  createHref: string;
  isDeletePending: boolean;
  selectedCount: number;
  onDeleteSelected: () => void;
};

export function WorkEntriesSelectionToolbar({
  createHref,
  isDeletePending,
  selectedCount,
  onDeleteSelected,
}: WorkEntriesSelectionToolbarProps) {
  return (
    <SelectionCard>
      <SelectionCardContent>
        <ToolbarStack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <SelectionText color="text.secondary">
            Выбрано записей: {selectedCount}
          </SelectionText>
          <ActionsStack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button
              color="error"
              disabled={selectedCount === 0 || isDeletePending}
              startIcon={<DeleteOutlineIcon />}
              variant="outlined"
              onClick={onDeleteSelected}
            >
              Удалить выбранные
            </Button>
            <Button
              component={Link}
              href={createHref}
              startIcon={<AddIcon />}
              variant="contained"
            >
              Добавить запись
            </Button>
          </ActionsStack>
        </ToolbarStack>
      </SelectionCardContent>
    </SelectionCard>
  );
}

const ToolbarStack = styled(Stack)(({ theme }) => ({
  alignItems: 'stretch',
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
  },
}));

const SelectionCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.action.hover,
  boxShadow: 'none',
}));

const SelectionCardContent = styled(CardContent)(({ theme }) => ({
  paddingBottom: theme.spacing(2),
  paddingTop: theme.spacing(2),
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));

const SelectionText = styled(Typography)({
  fontWeight: 600,
});

const ActionsStack = styled(Stack)({
  alignItems: 'stretch',
});
