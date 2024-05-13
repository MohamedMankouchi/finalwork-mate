import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { goalKeys } from "../goalKeys";

const deleteTask = async ({ id, goalId }: { goalId: number, id: number; }) => {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  await supabase
    .from("goals")
    .update({ last_updated_at: new Date().toISOString() })
    .eq("id", goalId);
  if (error) {
    throw error;
  }
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.private() });
    },
  });
};
