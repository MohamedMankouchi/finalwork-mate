import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { supabase } from "../../database/supabase";
import { goalKeys } from "../goalKeys";

const addTask = async ({
  title,
  goal_id,
}: {
  goal_id: number;
  title: string;
}) => {
  const { error } = await supabase.from("todos").insert({
    assigned_to: "You",
    goal_id,
    name: title,
  });
  await supabase
    .from("goals")
    .update({ last_updated_at: new Date().toISOString() })
    .eq("id", goal_id);
  if (error) {
    throw error;
  }
};

export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addTask,
    onError: (error) => {
      return error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: goalKeys.private() });
    },
  });
};
