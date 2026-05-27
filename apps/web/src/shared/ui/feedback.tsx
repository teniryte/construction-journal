'use client';

import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export function LoadingState({ label = 'Загрузка...' }: { label?: string }) {
  return (
    <CenteredStack spacing={2}>
      <CircularProgress />
      <Typography color="text.secondary">{label}</Typography>
    </CenteredStack>
  );
}

export function ErrorState({ message }: { message: string }) {
  return <Alert severity="error">{message}</Alert>;
}

export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <CenteredStack spacing={1}>
      <Typography component="h2" variant="h2">
        {title}
      </Typography>
      {description ? (
        <Typography color="text.secondary">{description}</Typography>
      ) : null}
    </CenteredStack>
  );
}

const CenteredStack = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  paddingBlock: theme.spacing(6),
}));
