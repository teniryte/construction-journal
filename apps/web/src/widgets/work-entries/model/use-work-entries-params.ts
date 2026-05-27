'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type { WorkEntriesQuery } from '@construction-journal/shared';

export const WORK_ENTRIES_LIMIT = 10;

const DEFAULT_SORT: WorkEntriesQuery['sort'] = 'desc';

type SearchParamsLike = {
  get: (name: string) => string | null;
  toString: () => string;
};

type WorkEntriesUrlParams = {
  begin: string | null;
  end: string | null;
  sort: WorkEntriesQuery['sort'];
  page: number;
};

type WorkEntriesUrlParamsUpdate = Partial<WorkEntriesUrlParams>;

export function useWorkEntriesParams() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useMemo(
    () => readWorkEntriesParams(searchParams),
    [searchParams],
  );

  const replaceParams = useCallback(
    (update: WorkEntriesUrlParamsUpdate) => {
      const href = buildWorkEntriesHref(searchParams, update, pathname);
      router.replace(href, { scroll: false });
    },
    [pathname, router, searchParams],
  );
  const setDateRange = useCallback(
    (begin: string | null, end: string | null) =>
      replaceParams({ begin, end, page: 1 }),
    [replaceParams],
  );
  const setSort = useCallback(
    (sort: WorkEntriesQuery['sort']) => replaceParams({ sort, page: 1 }),
    [replaceParams],
  );
  const setPage = useCallback(
    (page: number) => replaceParams({ page }),
    [replaceParams],
  );
  const resetFilters = useCallback(
    () =>
      replaceParams({ begin: null, end: null, sort: DEFAULT_SORT, page: 1 }),
    [replaceParams],
  );

  return {
    ...params,
    resetFilters,
    setDateRange,
    setPage,
    setSort,
  };
}

export function buildWorkEntriesHref(
  searchParams: SearchParamsLike,
  update: WorkEntriesUrlParamsUpdate = {},
  pathname = '/entries',
) {
  const next = new URLSearchParams(searchParams.toString());

  setNullableParam(next, 'begin', update.begin);
  setNullableParam(next, 'end', update.end);

  if (update.sort !== undefined) {
    if (update.sort === DEFAULT_SORT) {
      next.delete('sort');
    } else {
      next.set('sort', update.sort);
    }
  }

  if (update.page !== undefined) {
    if (update.page <= 1) {
      next.delete('page');
    } else {
      next.set('page', String(update.page));
    }
  }

  const query = next.toString();
  return query ? `${pathname}?${query}` : pathname;
}

export function hasInvalidDateRange(begin: string | null, end: string | null) {
  return Boolean(begin && end && begin > end);
}

function readWorkEntriesParams(
  searchParams: SearchParamsLike,
): WorkEntriesUrlParams {
  return {
    begin: searchParams.get('begin') || null,
    end: searchParams.get('end') || null,
    sort: readSort(searchParams.get('sort')),
    page: readPage(searchParams.get('page')),
  };
}

function readSort(sort: string | null): WorkEntriesQuery['sort'] {
  return sort === 'asc' ? 'asc' : DEFAULT_SORT;
}

function readPage(page: string | null) {
  const value = Number(page);
  return Number.isInteger(value) && value > 0 ? value : 1;
}

function setNullableParam(
  params: URLSearchParams,
  key: string,
  value: string | null | undefined,
) {
  if (value === undefined) {
    return;
  }

  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
}
