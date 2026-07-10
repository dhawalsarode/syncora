import { useEffect } from "react";

import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { fetchTasks } from "../api/tasks";
import { socket } from "../socket/socket";

export function useTasks() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  useEffect(() => {
    const refresh = () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    };

    socket.on("task:created", refresh);
    socket.on("task:updated", refresh);
    socket.on("task:deleted", refresh);

    return () => {
      socket.off("task:created", refresh);
      socket.off("task:updated", refresh);
      socket.off("task:deleted", refresh);
    };
  }, [queryClient]);

  return query;
}