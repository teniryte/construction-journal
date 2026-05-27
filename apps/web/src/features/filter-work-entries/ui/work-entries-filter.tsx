'use client';

import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import type { WorkEntriesQuery } from '@construction-journal/shared';
import { AppDateField } from '@/shared/ui';

type WorkEntriesFilterProps = {
  begin: string | null;
  end: string | null;
  sort: WorkEntriesQuery['sort'];
  hasRangeError: boolean;
  onDateRangeChange: (begin: string | null, end: string | null) => void;
  onReset: () => void;
  onSortChange: (sort: WorkEntriesQuery['sort']) => void;
};

export function WorkEntriesFilter({
  begin,
  end,
  sort,
  hasRangeError,
  onDateRangeChange,
  onReset,
  onSortChange,
}: WorkEntriesFilterProps) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <FilterRow direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <AppDateField
              fullWidth
              label="Дата с"
              size="small"
              value={begin}
              onChange={(value) => onDateRangeChange(value, end)}
            />
            <AppDateField
              fullWidth
              label="Дата по"
              size="small"
              value={end}
              onChange={(value) => onDateRangeChange(begin, value)}
            />
            <FormControl fullWidth size="small">
              <InputLabel id="work-entries-sort-label">Сортировка</InputLabel>
              <Select
                label="Сортировка"
                labelId="work-entries-sort-label"
                value={sort}
                onChange={(event) =>
                  onSortChange(event.target.value as WorkEntriesQuery['sort'])
                }
              >
                <MenuItem value="desc">Сначала новые</MenuItem>
                <MenuItem value="asc">Сначала старые</MenuItem>
              </Select>
            </FormControl>
            <Tooltip title="Сбросить фильтры">
              <ResetButton aria-label="Сбросить фильтры" onClick={onReset}>
                <CloseIcon />
              </ResetButton>
            </Tooltip>
          </FilterRow>
          {hasRangeError ? (
            <Alert severity="warning">Дата начала не может быть позже даты окончания.</Alert>
          ) : null}
        </Stack>
      </CardContent>
    </Card>
  );
}

const FilterRow = styled(Stack)(({ theme }) => ({
  alignItems: 'stretch',
  [theme.breakpoints.up('md')]: {
    alignItems: 'center',
  },
}));

const ResetButton = styled(IconButton)(({ theme }) => ({
  alignSelf: 'flex-start',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.text.secondary,
  height: 40,
  width: 40,
  [theme.breakpoints.down('md')]: {
    alignSelf: 'flex-end',
  },
}));
