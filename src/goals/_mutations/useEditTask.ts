import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { goalKeys } from "../goalKeys";

const editTask = async ({
  title,
  id,
  goalId,
}: {
  goalId: number;
  id: number;
  title: string;
}) => {
  const { error } = await supabase
    .from("todos")
    .update({
      name: title,
    })
    .eq("id", id);
  await supabase
    .from("goals")
    .update({ last_updated_at: new Date().toISOString() })
    .eq("id", goalId);
  if (error) {
    throw error;
  }
};

export const useEditTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editTask,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.private() });
    },
  });
};
