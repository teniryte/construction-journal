'use client';

import type { TextFieldProps } from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { PickerChangeHandlerContext } from '@mui/x-date-pickers/models';
import dayjs, { type Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type FocusEvent,
  type MouseEvent,
  useMemo,
  useState,
} from 'react';

dayjs.extend(customParseFormat);

const DISPLAY_DATE_FORMAT = 'DD.MM.YYYY';
const ISO_DATE_FORMAT = 'YYYY-MM-DD';

type AppDateFieldProps = Omit<TextFieldProps, 'onChange' | 'type' | 'value'> & {
  value: string | null;
  onChange: (value: string | null) => void;
};

export function AppDateField({
  value,
  disabled,
  onBlur,
  onChange,
  onClick,
  onFocus,
  slotProps,
  variant,
  ...textFieldProps
}: AppDateFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pickerValue = useMemo(() => parseIsoDate(value), [value]);

  const htmlInputSlotProps =
    typeof slotProps?.htmlInput === 'function'
      ? undefined
      : (slotProps?.htmlInput as ComponentPropsWithoutRef<'input'> | undefined);

  const textFieldSlotProps = {
    ...textFieldProps,
    ...(variant === 'filled'
      ? { variant: 'filled' as const }
      : variant === 'standard'
        ? { variant: 'standard' as const }
        : { variant: 'outlined' as const }),
    onBlur: (event: FocusEvent<HTMLDivElement>) => {
      onBlur?.(event as Parameters<NonNullable<TextFieldProps['onBlur']>>[0]);
    },
    onClick: (event: MouseEvent<HTMLDivElement>) => {
      onClick?.(event);
      openPicker();
    },
    onFocus: (event: FocusEvent<HTMLDivElement>) => {
      onFocus?.(event as Parameters<NonNullable<TextFieldProps['onFocus']>>[0]);
    },
    slotProps: {
      htmlInput: {
        ...htmlInputSlotProps,
        inputMode: 'numeric',
        maxLength: 10,
        placeholder: 'ДД.ММ.ГГГГ',
        readOnly: true,
      },
    },
  } as unknown as NonNullable<
    ComponentProps<typeof DatePicker>['slotProps']
  >['textField'];

  function handleChange(
    nextValue: Dayjs | null,
    context: PickerChangeHandlerContext<unknown>,
  ) {
    if (!nextValue || !isDayjsComplete(nextValue) || context.validationError) {
      onChange(null);
      return;
    }

    onChange(nextValue.format(ISO_DATE_FORMAT));
  }

  function openPicker() {
    if (!disabled) {
      setIsOpen(true);
    }
  }

  return (
    <DatePicker
      closeOnSelect
      disabled={disabled}
      format={DISPLAY_DATE_FORMAT}
      keepOpenDuringFieldFocus
      open={isOpen}
      slotProps={{
        desktopTrapFocus: {
          disableEnforceFocus: true,
        },
        openPickerButton: {
          onClick: () => {
            openPicker();
          },
        },
        textField: textFieldSlotProps,
      }}
      value={pickerValue}
      onChange={handleChange}
      onClose={() => setIsOpen(false)}
    />
  );
}

function parseIsoDate(value: string | null): Dayjs | null {
  if (!value) {
    return null;
  }

  const date = dayjs(value, ISO_DATE_FORMAT, true);

  return date.isValid() ? date : null;
}

function isDayjsComplete(instance: Dayjs | null): boolean {
  if (!instance) {
    return false;
  }
  const formatted = instance.format(DISPLAY_DATE_FORMAT);
  return /\d{2}\.\d{2}\.[^0]\d{3}/gim.test(formatted);
}
