'use client';

import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined';
import { getErrorMessage } from '@/shared/lib';

type ConfirmDeleteDialogProps = {
  open: boolean;
  count: number;
  isPending: boolean;
  error: unknown;
  onClose: () => void;
  onConfirm: () => void;
};

export function ConfirmDeleteDialog({
  open,
  count,
  isPending,
  error,
  onClose,
  onConfirm,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <DialogTitle>Удалить записи?</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <DialogContentText>
            {count === 1
              ? 'Запись будет удалена без возможности восстановления.'
              : `Будут удалены выбранные записи: ${count}.`}
          </DialogContentText>
          {error ? <Alert severity="error">{getErrorMessage(error)}</Alert> : null}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={isPending}
          startIcon={<CloseIcon />}
          onClick={onClose}
        >
          Отмена
        </Button>
        <Button
          color="error"
          disabled={isPending}
          startIcon={
            isPending ? undefined : <DeleteOutlineIcon />
          }
          variant="contained"
          onClick={onConfirm}
        >
          {isPending ? <CircularProgress color="inherit" size={20} /> : 'Удалить'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
