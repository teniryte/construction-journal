'use client';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

type RouteDialogProps = {
  title: string;
  children: ReactNode;
  onClose?: () => void;
};

export function RouteDialog({ title, children, onClose }: RouteDialogProps) {
  const router = useRouter();
  const handleClose = onClose ?? (() => router.replace('/entries'));

  return (
    <Dialog
      disableRestoreFocus
      fullWidth
      maxWidth="sm"
      open
      onClose={handleClose}
    >
      <DialogTitle>
        {title}
        <CloseButton aria-label="Закрыть" onClick={handleClose}>
          <CloseIcon />
        </CloseButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  top: theme.spacing(1),
}));
