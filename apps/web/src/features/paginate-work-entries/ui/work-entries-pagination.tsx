'use client';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

type WorkEntriesPaginationProps = {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function WorkEntriesPagination({
  page,
  limit,
  total,
  onPageChange,
}: WorkEntriesPaginationProps) {
  const pageCount = Math.max(1, Math.ceil(total / limit));

  return (
    <PaginationStack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Pagination
        color="primary"
        count={pageCount}
        page={Math.min(page, pageCount)}
        onChange={(_, nextPage) => onPageChange(nextPage)}
      />
      <Typography color="text.secondary">
        Всего записей: {total}
      </Typography>
    </PaginationStack>
  );
}

const PaginationStack = styled(Stack)({
  alignItems: 'center',
});
