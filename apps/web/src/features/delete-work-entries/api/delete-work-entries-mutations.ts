import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteWorkEntries,
  deleteWorkEntry,
  workEntriesQueryKeys,
} from '@/entities/work-entries';

export function useDeleteWorkEntryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWorkEntry,
    onSuccess: async (_, id) => {
      queryClient.removeQueries({ queryKey: workEntriesQueryKeys.detail(id) });
      await queryClient.invalidateQueries({
        queryKey: workEntriesQueryKeys.all,
      });
    },
  });
}

export function useDeleteWorkEntriesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (ids: number[]) => deleteWorkEntries({ ids }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: workEntriesQueryKeys.all,
      });
    },
  });
}
