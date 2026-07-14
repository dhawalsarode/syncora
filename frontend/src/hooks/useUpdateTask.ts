import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../api/tasks";
import { Task } from "../types/task";

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Task>;
    }) => updateTask(id, data),

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      const previousTasks =
        queryClient.getQueryData<Task[]>(["tasks"]);

      queryClient.setQueryData<Task[]>(["tasks"], (old) =>
        old?.map((t) =>
          t.id === id ? { ...t, ...data } : t
        ) ?? []
      );

      return { previousTasks };
    },

    onError: (_err, _vars, ctx) => {
      if (ctx?.previousTasks) {
        queryClient.setQueryData(
          ["tasks"],
          ctx.previousTasks
        );
      }
    },

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["tasks"],
      refetchType: "active",
    });
  },
  });
}