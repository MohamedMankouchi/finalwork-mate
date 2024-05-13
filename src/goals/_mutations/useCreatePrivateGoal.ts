import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { goalKeys } from "../goalKeys";
type addFileProps = {
  from: string;
  title: string;
  to: string;
  user_id: string;
};
const createGoal = async ({ from, title, user_id, to }: addFileProps) => {
  const { error } = await supabase
    .from("goals")
    .insert({
      created_by: user_id,
      end: to,
      isGroup: false,
      start: from,
      title,
    });

  if (error) {
    throw error;
  }
};

export const useCreatePrivateGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGoal,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.private() });
    },
  });
};
