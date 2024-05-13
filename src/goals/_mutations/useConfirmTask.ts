import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { goalKeys } from "../goalKeys";

const confirmTask = async ({ id, goalId }: { goalId: number; id: number }) => {
  const { error } = await supabase
    .from("todos")
    .update({ isDone: true })
    .eq("id", id);

  await supabase
    .from("goals")
    .update({ last_updated_at: new Date().toISOString() })
    .eq("id", goalId);
  if (error) {
    throw error;
  }
};

export const useConfirmTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: confirmTask,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.private() });
    },
  });
};
