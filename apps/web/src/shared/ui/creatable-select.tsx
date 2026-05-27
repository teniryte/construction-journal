'use client';

import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import type { KeyboardEvent } from 'react';
import { useState } from 'react';

export type CreatableSelectOption = {
  label: string;
  value: string;
};

type CreatableSelectOptionWithInput<Option extends CreatableSelectOption> =
  Option & {
    inputValue?: string;
  };

type AppCreatableSelectProps<Option extends CreatableSelectOption> = {
  disabled?: boolean;
  error?: boolean;
  helperText?: TextFieldProps['helperText'];
  label: string;
  loading?: boolean;
  loadingText?: string;
  noOptionsText?: string;
  options: Option[];
  value: Option | null;
  onBlur?: () => void;
  onChange: (option: Option | null) => void;
  onCreateOption: (value: string) => void;
};

export function AppCreatableSelect<Option extends CreatableSelectOption>({
  disabled,
  error,
  helperText,
  label,
  loading,
  loadingText = 'Загрузка...',
  noOptionsText = 'Нет вариантов',
  options,
  value,
  onBlur,
  onChange,
  onCreateOption,
}: AppCreatableSelectProps<Option>) {
  const [isOpen, setIsOpen] = useState(false);
  const filterOptions =
    createFilterOptions<CreatableSelectOptionWithInput<Option>>();
  const isExistingOption = (inputValue: string) =>
    options.some(
      (option) => option.label.toLowerCase() === inputValue.toLowerCase(),
    );

  function handleInputKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Enter' || event.nativeEvent.isComposing) {
      return;
    }

    event.preventDefault();

    const target = event.target;
    const inputValue =
      target instanceof HTMLInputElement ? target.value.trim() : '';

    if (!inputValue || isExistingOption(inputValue)) {
      return;
    }

    event.stopPropagation();
    onCreateOption(inputValue);
    setIsOpen(false);
  }

  return (
    <Autocomplete<CreatableSelectOptionWithInput<Option>, false, false, true>
      clearOnBlur
      selectOnFocus
      handleHomeEndKeys
      disabled={disabled}
      filterOptions={(availableOptions, params) => {
        const filtered = filterOptions(availableOptions, params);
        const inputValue = params.inputValue.trim();

        if (inputValue && !isExistingOption(inputValue)) {
          filtered.push({
            inputValue,
            label: `Добавить "${inputValue}"`,
            value: inputValue,
          } as CreatableSelectOptionWithInput<Option>);
        }

        return filtered;
      }}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }

        return option.inputValue ?? option.label;
      }}
      isOptionEqualToValue={(option, selectedOption) =>
        typeof selectedOption === 'string'
          ? option.value === selectedOption
          : option.value === selectedOption.value
      }
      loading={loading}
      loadingText={loadingText}
      noOptionsText={noOptionsText}
      open={isOpen}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          label={label}
          onKeyDown={handleInputKeyDown}
        />
      )}
      value={value}
      onBlur={onBlur}
      onChange={(_, option) => {
        if (typeof option === 'string') {
          onCreateOption(option);
          setIsOpen(false);
          return;
        }

        if (option?.inputValue) {
          onCreateOption(option.inputValue);
          setIsOpen(false);
          return;
        }

        onChange(option ?? null);
      }}
      onClose={() => setIsOpen(false)}
      onOpen={() => setIsOpen(true)}
    />
  );
}
