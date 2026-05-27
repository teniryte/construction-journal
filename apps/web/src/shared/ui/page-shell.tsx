'use client';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import type { ReactNode } from 'react';

type PageShellProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
};

export function PageShell({
  title,
  description,
  actions,
  children,
}: PageShellProps) {
  return (
    <Root maxWidth="lg">
      <Stack spacing={3}>
        <Header direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Stack spacing={0.5}>
            <Typography component="h1" variant="h1">
              {title}
            </Typography>
            {description ? (
              <Typography color="text.secondary">{description}</Typography>
            ) : null}
          </Stack>
          {actions}
        </Header>
        {children}
      </Stack>
    </Root>
  );
}

const Root = styled(Container)(({ theme }) => ({
  paddingBlock: theme.spacing(4),
}));

const Header = styled(Stack)(({ theme }) => ({
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  [theme.breakpoints.up('sm')]: {
    alignItems: 'center',
  },
}));
