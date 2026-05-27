import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getWorkEntries, workEntriesQueryKeys } from '@/entities/work-entries';
import {
  hasInvalidDateRange,
  useWorkEntriesParams,
  WORK_ENTRIES_LIMIT,
} from './use-work-entries-params';

export function useWorkEntries() {
  const {
    begin,
    end,
    resetFilters,
    setDateRange,
    setPage,
    setSort,
    sort,
    page,
  } = useWorkEntriesParams();

  const params = {
    begin,
    end,
    sort,
    page,
    limit: WORK_ENTRIES_LIMIT,
  };

  const hasRangeError = hasInvalidDateRange(begin, end);

  const query = useQuery({
    enabled: !hasRangeError,
    queryKey: workEntriesQueryKeys.list(params),
    queryFn: () => getWorkEntries(params),
    placeholderData: keepPreviousData,
  });

  return {
    ...query,
    params,
    hasRangeError,
    resetFilters,
    setDateRange,
    setPage,
    setSort,
  };
}
